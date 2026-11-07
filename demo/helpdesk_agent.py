"""Campus Helpdesk Agent — the agent built step by step in the Build section.

Run:
    pip install anthropic
    set ANTHROPIC_API_KEY=...        (Windows)   /   export ANTHROPIC_API_KEY=...  (macOS/Linux)
    python demo/helpdesk_agent.py
"""
import json
import pathlib

import anthropic

MODEL = "claude-sonnet-5-5"
MAX_STEPS = 8
MEM = pathlib.Path("memory.json")

SYSTEM = """You are CampusHelp, the helpdesk agent for our university.
- Answer briefly and politely.
- Use tools to check facts. Never guess book availability.
- Always ask before creating a ticket."""

# ---------- tools (fake data so the demo always works) ----------
LIBRARY = {
    "clean code": {"available": False, "due_back": "2026-10-25"},
    "sicp": {"available": True, "shelf": "QA76.6"},
    "designing data-intensive applications": {"available": True, "shelf": "QA76.9"},
}
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

TOOLS = [
    {
        "name": "check_book",
        "description": "Check if a library book is available. Returns availability, shelf or due-back date.",
        "input_schema": {
            "type": "object",
            "properties": {"title": {"type": "string", "description": "Book title"}},
            "required": ["title"],
        },
    },
    {
        "name": "search_faq",
        "description": "Search the helpdesk FAQ for general questions (Wi-Fi, exams, library hours).",
        "input_schema": {
            "type": "object",
            "properties": {"query": {"type": "string"}},
            "required": ["query"],
        },
    },
    {
        "name": "create_ticket",
        "description": "Create a helpdesk ticket for a student problem. Use only after confirming details with the user.",
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {"type": "string", "description": "One-line summary"},
                "category": {"type": "string", "enum": ["library", "it", "exams"]},
            },
            "required": ["title", "category"],
        },
    },
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
    client = anthropic.Anthropic()  # created here so local_agent.py can import tools without a key
    messages = load_memory() + [{"role": "user", "content": question}]
    for step in range(MAX_STEPS):
        resp = client.messages.create(
            model=MODEL, max_tokens=1024, system=SYSTEM, tools=TOOLS, messages=messages
        )
        print(f"[step {step}] stop_reason={resp.stop_reason}")
        messages.append({"role": "assistant", "content": resp.content})

        if resp.stop_reason != "tool_use":
            answer = "".join(b.text for b in resp.content if b.type == "text")
            remember(question, answer)
            return answer

        results = []
        for block in resp.content:
            if block.type == "tool_use":
                output = run_tool(block.name, block.input)
                print(f"[log] tool={block.name} args={block.input} -> {output}")
                results.append(
                    {"type": "tool_result", "tool_use_id": block.id, "content": json.dumps(output)}
                )
        messages.append({"role": "user", "content": results})
    return "Sorry, I couldn't finish that within the step limit."


if __name__ == "__main__":
    print("CampusHelp — type 'quit' to exit")
    while True:
        q = input("\nYou: ").strip()
        if q.lower() in {"quit", "exit"}:
            break
        if q:
            print("\nCampusHelp:", ask(q))
