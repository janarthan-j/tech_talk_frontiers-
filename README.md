# Beyond the Chat Window: How AI Is Changing the Way We Build Software

A 2-hour interactive session for university students on new trends in software development, AI tools for production-ready applications, AI agents, and new AI-driven roles in industry.

## Audience

- University students (CS / SE / IT and related)
- Already know chat tools (ChatGPT, Claude, Gemini, etc.)
- Need: how agents work, how to build and use them, how to ship them safely, and what careers are opening up

## Learning outcomes

By the end, students can:

1. Name the main categories of AI dev tools and pick the right one for a task.
2. Explain the difference between a chatbot, a workflow, and an agent.
3. Describe the four parts of an agent: **model, tools, memory, loop**.
4. Read and extend a minimal working agent (Python, ~60 lines).
5. List the key production concerns: testing/evals, safety, cost.
6. Identify new AI roles and the skills each needs.
7. Use and build tools: common tools, custom tools, MCP servers, and customising coding agents.
7a. Explain MCP (host, client, server; tools, resources, prompts) and context engineering (what goes into the context window and why).
8. Build a no-code agent workflow in n8n (and know Google's options).
9. Run small LLMs (e.g. Qwen 3.5 2B/4B) on their own laptop with LM Studio or Jan.

## Session plan (120 min)

| Time | Section | Title |
|---|---|---|
| 0–10 | Opening | How Software Development Is Changing Right Now |
| 10–30 | Trends | Today's AI Toolkit: What Developers Are Actually Using |
| 30–45 | The shift | When AI Starts Doing, Not Just Answering |
| 45–65 | Agents explained | What Makes an Agent: Models, Tools, Memory, and the Loop |
| 65–70 | Break | — |
| 70–90 | Build | Let's Build an Agent: Step by Step |
| 90–102 | Production | Taking Agents to Production: Testing, Safety, and Cost |
| 102–112 | Careers | New Roles in the AI-Driven Industry |
| 112–120 | Closing | Where to Go from Here + Q&A |

## Files

| File | Purpose |
|---|---|
| `README.md` | This file: overview, plan, how to run |
| `content.md` | Slide-by-slide content for review (text, diagrams, image slots, links, speaker notes) |
| `index.html` | The interactive slide deck (open in Chrome / Edge) |
| `assets/deck.css`, `assets/deck.js` | Deck styles and engine (navigation, interactives, highlighting) |
| `images/` | Put your images here — placeholders pick them up automatically by filename |
| `demo/helpdesk_agent.py` | Campus Helpdesk Agent (Claude API) from the Build section |
| `demo/local_agent.py` | Same agent on a local model via LM Studio / Jan |
| `demo/campus_mcp.py` | Small MCP server exposing `check_book` and `find_free_room` |

## Planned deck features (`index.html`)

- Single self-contained HTML file, opens in any browser, works offline (fonts fall back if no internet)
- 16:9 slides that scale to any screen / projector
- Keyboard: `→` / `Space` next, `←` back, `O` overview grid, `N` speaker notes, `T` light/dark theme, `F` fullscreen, `Home`/`End`
- Footer shows current section and planned time slot (keeps the talk on schedule)
- Interactive pieces: live poll, autonomy slider, chat-vs-agent toggle, "Agent or not?" flip-card quiz, animated agent loop stepper, step-by-step code builder, break countdown, cost calculator, production checklist, expandable role cards
- Image placeholders: dashed boxes labelled with a suggested filename. Replace with `<img src="images/<name>">`

## Adding images later

Each placeholder in `content.md` is marked `🖼 IMAGE: images/<filename> — <what to show>`. Drop the file into `images/` with that name; the deck will be wired to load it (placeholder shows until the file exists).

## Running the demo agent (Build section)

```bash
pip install anthropic
```

```bash
python demo/helpdesk_agent.py
```

Needs an API key in the `ANTHROPIC_API_KEY` environment variable. Same pattern works with OpenAI / Gemini SDKs; only the client calls change.

### Free / local option

Run the demo with no API key using a local model:

1. Install LM Studio (https://lmstudio.ai) or Jan (https://www.jan.ai)
2. Download a small model (e.g. Qwen 3.5 4B, Q4 quantization)
3. Start the local server (LM Studio `http://localhost:1234/v1`, Jan `http://localhost:1337/v1`)
4. Point the OpenAI-compatible client at that `base_url`

### n8n demo

```bash
npx n8n
```

Opens at `http://localhost:5678`. Import the example workflows from `demo/n8n/` (to be added).

## Presenter checklist

- [ ] Test projector resolution and theme (light theme for bright rooms)
- [ ] Pre-open demo tools in browser tabs (links in `content.md`)
- [ ] Have API key set and demo agent run once before the session
- [ ] LM Studio / Jan installed with Qwen small model pre-downloaded (don't download on venue Wi-Fi)
- [ ] n8n running locally with example workflows imported and credentials set
- [ ] Offline fallback: screenshots of each live demo in `images/`
- [ ] Poll / Q&A link or QR code ready
