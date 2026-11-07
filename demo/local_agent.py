"""Same Campus Helpdesk Agent, running FREE on your laptop.

1. Install LM Studio (https://lmstudio.ai) or Jan (https://www.jan.ai)
2. Download a small model with tool-calling support, e.g. Qwen 3.5 4B (Q4)
3. Start the local server:  LM Studio -> http://localhost:1234/v1   |   Jan -> http://localhost:1337/v1
4. pip install openai
5. python demo/local_agent.py
"""
import json

from openai import OpenAI

from helpdesk_agent import SYSTEM, TOOLS, run_tool

BASE_URL = "http://localhost:1234/v1"  # Jan: http://localhost:1337/v1   Ollama: http://localhost:11434/v1
MODEL = "qwen3.5-4b"                    # use the exact model id shown in LM Studio / Jan
MAX_STEPS = 8

client = OpenAI(base_url=BASE_URL, api_key="local")

# Convert Anthropic-style tool definitions to OpenAI-style
OAI_TOOLS = [
    {"type": "function",
     "function": {"name": t["name"], "description": t["description"], "parameters": t["input_schema"]}}
    for t in TOOLS
]


def ask(question):
    messages = [{"role": "system", "content": SYSTEM}, {"role": "user", "content": question}]
    for step in range(MAX_STEPS):
        resp = client.chat.completions.create(model=MODEL, messages=messages, tools=OAI_TOOLS)
        msg = resp.choices[0].message
        messages.append(msg)
        if not msg.tool_calls:
            return msg.content
        for call in msg.tool_calls:
            args = json.loads(call.function.arguments or "{}")
            output = run_tool(call.function.name, args)
            print(f"[step {step}] tool={call.function.name} args={args} -> {output}")
            messages.append({"role": "tool", "tool_call_id": call.id, "content": json.dumps(output)})
    return "Step limit reached."


if __name__ == "__main__":
    print(f"Local CampusHelp on {MODEL} — type 'quit' to exit")
    while True:
        q = input("\nYou: ").strip()
        if q.lower() in {"quit", "exit"}:
            break
        if q:
            print("\nCampusHelp:", ask(q))
