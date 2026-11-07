"""Campus Helpdesk Agent: the agent built step by step in the Build section.

Runs on a free model through OpenRouter, so students can try it without paying.

1. Sign in at https://openrouter.ai and create a key at https://openrouter.ai/keys
2. pip install openai
3. set OPENROUTER_API_KEY=...        (Windows)   /   export OPENROUTER_API_KEY=...  (macOS/Linux)
4. python demo/helpdesk_agent.py

Free models change often. Current list: https://openrouter.ai/models?max_price=0
Pick one that supports tools, and don't send private data to free models.
"""
import json
import os
import pathlib

from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY", "missing"),
)
MODEL = "nvidia/nemotron-3.5-lightning:free"
MAX_STEPS = 8
MEM = pathlib.Path("memory.json")

SYSTEM = """You are CampusHelp, the helpdesk agent for our university.
- Answer briefly and politely.
- Use tools to check facts. Never guess book availability.
- Always ask before creating a ticket."""

# ---------- tools (fake data so the demo always works) ----------
# "Import" the catalogue from a JSON file, the way an app would load a database table.
_books = json.loads((pathlib.Path(__file__).parent / "library.json").read_text(encoding="utf-8"))["books"]
LIBRARY = {book["title"].lower(): book for book in _books}
FAQ = {
    "wifi": "Wi-Fi password resets are done at the IT desk, Block B, 9am-4pm.",
    "exam": "Exam timetables are published on the student portal two weeks before exams.",
    "library": "The library is open 8am-8pm on weekdays and 9am-1pm on Saturdays.",
}
_next_ticket = 1042


def check_book(title):
    return LIBRARY.get(title.lower(), {"error": f"'{title}' is not in the catalogue"})


def search_faq(query):
    q = query.lower()
    hits = [answer for key, answer in FAQ.items() if key in q]
    return {"answers": hits or ["No FAQ entry found. Offer to create a ticket."]}


def create_ticket(title, category):
    global _next_ticket
    if category not in {"library", "it", "exams"}:
        return {"error": f"unknown category '{category}', use: library, it, exams"}
    _next_ticket += 1
    return {"ticket_id": _next_ticket - 1, "status": "open"}


FUNCS = {"check_book": check_book, "search_faq": search_faq, "create_ticket": create_ticket}
RISKY = {"create_ticket"}


def tool(name, description, properties, required):
    return {
        "type": "function",
        "function": {
            "name": name,
            "description": description,
            "parameters": {"type": "object", "properties": properties, "required": required},
        },
    }


TOOLS = [
    tool(
        "check_book",
        "Check if a library book is available. Returns availability, shelf or due-back date.",
        {"title": {"type": "string", "description": "Book title"}},
        ["title"],
    ),
    tool(
        "search_faq",
        "Search the helpdesk FAQ for general questions (Wi-Fi, exams, library hours).",
        {"query": {"type": "string"}},
        ["query"],
    ),
    tool(
        "create_ticket",
        "Create a helpdesk ticket for a student problem. Use only after confirming details with the user.",
        {
            "title": {"type": "string", "description": "One-line summary"},
            "category": {"type": "string", "enum": ["library", "it", "exams"]},
        },
        ["title", "category"],
    ),
]


# ---------- guardrails ----------
def run_tool(name, args):
    if name not in FUNCS:
        return {"error": f"unknown tool {name}"}
    if name in RISKY:
        print(f"\n⚠ Agent wants to run {name}({args})")
        if input("Approve? [y/N] ").strip().lower() != "y":
            return {"error": "user declined"}
    try:
        return FUNCS[name](**args)
    except Exception as e:  # return errors so the model can recover
        return {"error": str(e)}


# ---------- memory ----------
def load_memory():
    return json.loads(MEM.read_text()) if MEM.exists() else []


def remember(question, answer):
    history = load_memory() + [
        {"role": "user", "content": question},
        {"role": "assistant", "content": answer},
    ]
    MEM.write_text(json.dumps(history[-20:]))  # keep last 10 exchanges


# ---------- the loop ----------
def ask(question):
    messages = (
        [{"role": "system", "content": SYSTEM}]
        + load_memory()
        + [{"role": "user", "content": question}]
    )
    for step in range(MAX_STEPS):
        resp = client.chat.completions.create(model=MODEL, messages=messages, tools=TOOLS)
        msg = resp.choices[0].message
        messages.append(msg)

        if not msg.tool_calls:
            print(f"[step {step}] model → final answer")
            remember(question, msg.content)
            return msg.content

        for call in msg.tool_calls:
            print(f"[step {step}] model → tool_calls: {call.function.name}")
            args = json.loads(call.function.arguments or "{}")
            output = run_tool(call.function.name, args)
            print(f"[log] tool={call.function.name} args={args} -> {output}")
            messages.append(
                {"role": "tool", "tool_call_id": call.id, "content": json.dumps(output)}
            )
    return "Sorry, I couldn't finish that within the step limit."


def chat():
    print(f"CampusHelp on {MODEL} (type 'quit' to exit)")
    while True:
        q = input("\nYou: ").strip()
        if q.lower() in {"quit", "exit"}:
            break
        if q:
            print("\nCampusHelp:", ask(q))


if __name__ == "__main__":
    if "OPENROUTER_API_KEY" not in os.environ:
        raise SystemExit("Set OPENROUTER_API_KEY first. Create a key at https://openrouter.ai/keys")
    chat()
