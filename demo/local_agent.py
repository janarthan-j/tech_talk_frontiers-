"""Same Campus Helpdesk Agent, running on your laptop with no key and no internet.

1. Install LM Studio (https://lmstudio.ai) or Jan (https://www.jan.ai)
2. Download a small model with tool-calling support, e.g. Qwen 3.5 4B (Q4)
3. Start the local server:  LM Studio -> http://localhost:1234/v1   |   Jan -> http://localhost:1337/v1
4. pip install openai
5. python demo/local_agent.py
"""
from openai import OpenAI

import helpdesk_agent as agent

# Only these two lines differ from the OpenRouter version.
agent.client = OpenAI(base_url="http://localhost:1234/v1", api_key="local")  # Jan: :1337  Ollama: :11434
agent.MODEL = "qwen3.5-4b"  # use the exact model id shown in LM Studio / Jan

if __name__ == "__main__":
    agent.chat()
