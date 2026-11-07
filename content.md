# Slide Content — "Beyond the Chat Window: How AI Is Changing the Way We Build Software"

Review this file first. Once approved, it becomes `index.html`.

**Legend**
- 🖼 **IMAGE** — placeholder slot, you add the image later (suggested filename)
- 📊 **DIAGRAM** — built into the slide as SVG/HTML
- 🎛 **INTERACTIVE** — clickable element in the deck
- 🗣 **NOTES** — speaker notes (press `N` in deck)
- 🔗 links open in a new tab

Total: **77 slides** across 9 sections (sub-slides like 14a, 26a, 27a, 28a added in revisions 2–3).

**Revision 3 changes:** MCP introduced properly (problem, architecture, tools/resources/prompts, call flow, popular servers, safety — slides 27–27f) · new Context slides (what the model sees, context window filling up, context engineering — slides 28–28b); Memory moved to 28c.

**Revision 2 changes:** local LLMs (LM Studio, Jan, llama.cpp, Qwen 3.5 small models) · expanded Tools (common tools, custom tools, tool design, tools in coding agents, customising coding agents, own MCP server) · no-code agents (n8n examples, Google Opal / Cloud Workflows) · Build bonus step: run agent on local model.

---

## SECTION 0 — Title

### Slide 1 — Title
- **Beyond the Chat Window**
- *How AI Is Changing the Way We Build Software*
- Janarthan Jeyachandran, Senior Software Engineer, SenzMate Pvt Ltd · Frontiers in Tech 15.0 · IEEE Student Branch, Rajarata University of Sri Lanka
- 🖼 IMAGE: `images/title-bg.jpg` — abstract tech / code background (optional)
- 🖼 IMAGE: `images/ieee-logo.png` — branch / university logo
- 🗣 NOTES: Welcome. Quick intro of yourself. Promise: by the end, everyone understands how an agent works and has seen one built live.

### Slide 2 — Today's Journey (Agenda)
- 🎛 INTERACTIVE: clickable timeline — click any section to jump to it
- 0–10 Opening · 10–30 Trends · 30–45 The Shift · 45–65 Agents Explained · 65–70 Break · 70–90 Build · 90–102 Production · 102–112 Careers · 112–120 Closing + Q&A
- 🗣 NOTES: Show the map. Mention break at 65 min and that Q&A is at end, but questions welcome any time.

---

## SECTION 1 — Opening (0–10)
### "How Software Development Is Changing Right Now"

### Slide 3 — Section divider
- **01 · Opening** — How Software Development Is Changing Right Now

### Slide 4 — Quick Poll: How do you use AI today?
- 🎛 INTERACTIVE: poll with live bars (click to add vote; presenter clicks as hands go up)
  - A. Ask ChatGPT / Claude questions
  - B. Generate or debug code
  - C. AI inside my editor (Copilot, Cursor…)
  - D. I've built something *with* an AI API
  - E. I've used an AI agent that takes actions
- 🗣 NOTES: Raise hands. Most will be A/B. Few at D/E. "By the end of today you'll be at E."

### Slide 5 — Then vs Now
- 📊 DIAGRAM: two rows of the software lifecycle — Plan → Design → Code → Test → Review → Deploy → Operate
  - **Then (2020):** human does every step, AI ≈ autocomplete
  - **Now (2026):** AI assists or acts at every step (spec drafts, UI generation, code agents, test generation, AI code review, deploy scripts, incident triage)
- Key line: *"The developer's job is moving from writing every line → directing, reviewing, and verifying."*

### Slide 6 — Three Shifts Happening Right Now
- 📊 DIAGRAM: three cards with arrows
  1. **Typing → Directing** — you describe intent, AI drafts; your value is judgement and review
  2. **Answering → Doing** — AI moves from giving text to taking actions (running code, opening PRs, calling APIs)
  3. **Tool → Teammate** — background agents work on tasks in parallel while you do something else
- 🎞 ANIMATION: developer asks for a login page, AI robot writes the code and runs the tests, developer reviews and decides to ship

### Slide 7 — What Hasn't Changed
- Fundamentals matter *more*, not less:
  - Problem solving and system design
  - Reading code critically
  - Testing, security, version control
  - Communication with people
- Key line: *"AI multiplies skill. 10 × 0 is still 0."*
- 🗣 NOTES: Reassure students: don't skip fundamentals. AI makes weak engineers produce more bugs faster.

---

## SECTION 2 — Trends (10–30)
### "Today's AI Toolkit: What Developers Are Actually Using"

### Slide 8 — Section divider
- **02 · Trends** — Today's AI Toolkit: What Developers Are Actually Using

### Slide 9 — The AI Dev Toolkit Map
- 📊 DIAGRAM: landscape grid of 6 categories (each tile clickable → links)
  1. **Chat assistants** — ChatGPT, Claude, Gemini
  2. **AI in the editor (IDE)** — GitHub Copilot, Cursor, Windsurf
  3. **Agentic coding (terminal / background)** — Claude Code, OpenAI Codex, Gemini CLI
  4. **Prompt-to-app builders** — v0, Bolt, Lovable, Replit
  5. **Review, testing & docs** — CodeRabbit, Qodo, Mintlify
  6. **Research & learning** — Perplexity, NotebookLM

### Slide 10 — Chat Assistants (the starting point)
| Tool | Good for | Link |
|---|---|---|
| ChatGPT | general help, code snippets, explanations | 🔗 https://chatgpt.com |
| Claude | long documents, coding, reasoning | 🔗 https://claude.ai |
| Gemini | Google ecosystem, multimodal | 🔗 https://gemini.google.com |
| Google AI Studio | free playground for Gemini API | 🔗 https://aistudio.google.com |
- Limitation: *you* copy-paste between chat and code. AI can't see your project or run anything.
- 🖼 IMAGE: `images/chat-ui.png` — screenshot of a chat assistant

### Slide 11 — AI Inside the Editor
| Tool | What it does | Link |
|---|---|---|
| GitHub Copilot | autocomplete, chat, agent mode, code review in GitHub | 🔗 https://github.com/features/copilot |
| Cursor | AI-first VS Code fork, multi-file edits, agent | 🔗 https://cursor.com |
| Windsurf | AI IDE with agent ("Cascade") | 🔗 https://windsurf.com |
| Cline | open-source agent extension for VS Code | 🔗 https://cline.bot |
- Student tip: GitHub Copilot is free for verified students via GitHub Education 🔗 https://education.github.com
- 🖼 IMAGE: `images/ide-copilot.png` — screenshot of AI in editor

### Slide 12 — Agentic Coding Tools
| Tool | What it does | Link |
|---|---|---|
| Claude Code | agent in terminal / IDE / desktop; reads repo, edits, runs tests | 🔗 https://claude.com/claude-code |
| OpenAI Codex | coding agent (CLI + cloud tasks) | 🔗 https://openai.com/codex |
| Gemini CLI | open-source terminal agent | 🔗 https://github.com/google-gemini/gemini-cli |
| Aider | open-source pair-programmer in terminal | 🔗 https://aider.chat |
- Key idea: you give a **task**, not a prompt. The tool plans, edits many files, runs commands, checks results.
- 🖼 IMAGE: `images/terminal-agent.png` — screenshot of a terminal coding agent

### Slide 13 — Prompt-to-App Builders
| Tool | Best for | Link |
|---|---|---|
| v0 (Vercel) | React/Next.js UI from a prompt | 🔗 https://v0.app |
| Bolt | full-stack apps in browser | 🔗 https://bolt.new |
| Lovable | full apps + backend (Supabase) | 🔗 https://lovable.dev |
| Replit | build, run, deploy in browser with agent | 🔗 https://replit.com |
- Great for: prototypes, hackathons, MVPs. Watch out: code quality, security, scaling — still need engineering.
- 🖼 IMAGE: `images/app-builder.png` — generated app screenshot

### Slide 14 — Beyond Writing Code
| Area | Tools | Link |
|---|---|---|
| AI code review | CodeRabbit, Copilot code review | 🔗 https://coderabbit.ai |
| Test generation | Qodo | 🔗 https://qodo.ai |
| Docs | Mintlify | 🔗 https://mintlify.com |
| Research | Perplexity, NotebookLM | 🔗 https://perplexity.ai · https://notebooklm.google.com |
| Local / open models | LM Studio, Jan, Ollama, Hugging Face | covered after the Build mini challenge |

### Slide 15 — The Autonomy Spectrum
- 🎛 INTERACTIVE: slider with 5 levels; moving it updates description, example tool, and "who's in control"
  1. **Autocomplete** — suggests next line (Copilot inline)
  2. **Chat** — answers questions (ChatGPT)
  3. **Edit** — changes code you select (Cursor edit)
  4. **Agent** — plans + edits many files + runs tests, you approve (Claude Code, Copilot agent mode)
  5. **Background agent** — takes a ticket, works alone, opens a PR (Codex cloud, Copilot coding agent)
- Key line: *More autonomy = more speed **and** more need for review.*

### Slide 16 — Live Demo: Same Task, Three Tools
- 🎞 ANIMATION: each tool card loops a 2D animation of who does the work (chat: you carry code back and forth, 5 steps; IDE: you select, ask, accept, 3 steps; agent: finds, edits, runs, fixes its own failed test, verifies, 2 steps)
- Task: *"Add a dark-mode toggle to this web page."*
  1. Chat assistant (copy-paste)
  2. IDE assistant (inline edit)
  3. Agentic tool (plans, edits, runs)
- Compare: time, number of steps *you* did, quality
- 🗣 NOTES: Keep to ~6 min. Point out who did the work in each case.

---

## SECTION 3 — The Shift (30–45)
### "When AI Starts Doing, Not Just Answering"

### Slide 17 — Section divider
- **03 · The Shift** — When AI Starts Doing, Not Just Answering

### Slide 18 — Chatbot vs Agent
- 🎛 INTERACTIVE: toggle "Chatbot | Agent" — same request animates differently
- Request: *"My flight to Colombo got cancelled. Sort it out."*
  - **Chatbot:** gives a list of steps for you to do → you do the work
  - **Agent:** checks booking → searches flights → asks you to confirm → rebooks → emails confirmation
- Table:
| | Chatbot | Agent |
|---|---|---|
| Output | text | actions + results |
| Steps | one | many, decided by itself |
| Sees world | no | via tools |
| Who finishes the task | you | the agent (with your approval) |

### Slide 19 — Definition
- **An agent = an LLM that uses tools in a loop to reach a goal.**
- It decides *what to do next* based on what it observed.
- 📊 DIAGRAM: Goal → [LLM decides] → Tool → Observation → back to LLM … → Done

### Slide 20 — Workflows vs Agents
- Based on Anthropic's "Building Effective Agents" 🔗 https://www.anthropic.com/engineering/building-effective-agents
- 📊 DIAGRAM: 5 small pattern diagrams + 1 agent
  - **Prompt chaining** — A → B → C fixed steps
  - **Routing** — classify, send to right handler
  - **Parallelization** — split work, run at once, merge
  - **Orchestrator–workers** — one LLM splits task to workers
  - **Evaluator–optimizer** — generate → critique → improve
  - **Agent** — LLM chooses its own path
- Key line: *Start with the simplest thing that works. Use an agent only when steps can't be predicted.*

### Slide 21 — Quiz: Agent or Not?
- 🎛 INTERACTIVE: 6 flip cards — students shout answer, click to reveal
  1. Spell-checker in Word → **Not** (no goal, no tools loop)
  2. ChatGPT writing an essay → **Not** (single response)
  3. Tool that reads a GitHub issue, edits code, runs tests, opens PR → **Agent**
  4. Fixed pipeline: summarize email → translate → send → **Workflow**
  5. Support bot that looks up your order and issues refund if eligible → **Agent**
  6. Recommendation system on YouTube → **Not** (ML model, not LLM loop)

### Slide 22 — Real-Life Agent Solutions
- 📊 Four cards, each with 🖼 slot
  1. **Customer support** — reads ticket, checks order DB, refunds or escalates · 🎞 animated sample run
  2. **Coding** — issue → code fix → tests → pull request · 🎞 animated sample run
  3. **Data analysis** — question in English → writes SQL → runs → chart · 🎞 animated sample run
  4. **DevOps / incident** — alert → read logs → find cause → suggest fix · 🎞 animated sample run
- Ask: *"What's one task in your university life an agent could do?"*

### Slide 22a — Build Agent Solutions Without Code: n8n
- **n8n** — open-source visual workflow automation with built-in **AI Agent** node; self-host free or cloud 🔗 https://n8n.io
- Run locally: `npx n8n` or Docker → open `http://localhost:5678`
- 📊 DIAGRAM: n8n AI Agent node anatomy
  - **Trigger** (chat message / email / webhook / schedule) → **AI Agent** node
  - Agent sub-nodes: **Chat Model** (OpenAI, Claude, Gemini, or local **Ollama / LM Studio**) · **Memory** (window buffer, Postgres, Redis) · **Tools** (Google Sheets, Gmail, HTTP Request, Code, Calculator, another workflow, MCP Client)
  - → **Output** (reply, Slack message, sheet row)
- Same 4 parts we'll learn: model, tools, memory, loop — just drag-and-drop
- 🎞 ANIMATION: sample node canvas (Chat trigger → AI Agent → Reply, with Chat Model, Memory, check_book and Gmail tools plugged in). Packets show the agent loop; the execution log fills in step by step; Gmail stays unused
- 🔗 Templates: https://n8n.io/workflows · AI docs: https://docs.n8n.io/advanced-ai/

### Slide 22b — n8n Example 1: Student Support Email Agent
- 📊 DIAGRAM (flow):
  `Gmail Trigger (new email)` → `AI Agent` [Model: Gemini/Claude · Memory: per-sender · Tools: Google Sheets "FAQ", Google Sheets "Student records", HTTP "Library API"] → `IF: confident?`
  - **yes** → `Gmail: send reply`
  - **no** → `Slack: ask staff to approve draft` → `Wait for approval` → `Gmail: send`
  → `Google Sheets: log conversation`
- Shows: real tools, memory, **human-in-the-loop**, logging
- 🖼 IMAGE: `images/n8n-email-agent.png` — screenshot of this workflow

### Slide 22c — n8n Example 2: GitHub Issue Triage Agent
- 📊 DIAGRAM (flow):
  `GitHub Trigger (issue opened)` → `AI Agent` [Tools: GitHub "search similar issues", HTTP "read docs", Code node] → `Structured Output Parser {label, priority, duplicate_of, reply}` → `GitHub: add labels` + `GitHub: comment` → `Discord/Slack: notify maintainers if priority=high`
- Or build one of these instead:
  - Telegram bot answering lecture-notes questions (RAG with vector store node)
  - Daily digest: RSS + web → AI summary → email
  - Event registration assistant: Google Form → AI checks → confirmation email
- 🏠 TAKE-HOME: students build this agent after the session:
  1. Start n8n: n8n Cloud trial, or `npx n8n`. GitHub must reach it, so a local install needs a tunnel such as ngrok
  2. Make a test repo and add a GitHub token as an n8n credential
  3. Get a Gemini API key at https://aistudio.google.com and connect it to the AI Agent
  4. Wire the nodes: GitHub Trigger → AI Agent + Structured Output Parser → GitHub (labels, comment)
  5. Test: open a bug, a question and a duplicate issue; check each label and comment
  - Stuck: https://n8n.io/workflows · https://docs.n8n.io/advanced-ai/

### Slide 22e — Code vs No-Code: When to Use Which
| | No-code (n8n, Zapier) | Code (SDKs, frameworks) |
|---|---|---|
| Speed to first version | minutes–hours | hours–days |
| Integrations | hundreds ready-made | write your own |
| Custom logic | limited (Code node helps) | unlimited |
| Testing / version control | harder | normal dev practices |
| Best for | automations, internal tools, prototypes | products, complex agents, scale |
- Key line: *Prototype in n8n → rebuild the core in code when it matters.*

---

## SECTION 4 — Agents Explained (45–65)
### "What Makes an Agent: Models, Tools, Memory, and the Loop"

### Slide 23 — Section divider
- **04 · Agents Explained** — Models, Tools, Memory, and the Loop

### Slide 24 — Anatomy of an Agent
- 📊 DIAGRAM: central **Model (brain)**, connected to **Tools (hands)**, **Memory (notebook)**, wrapped by **Loop (heartbeat)**; plus **Instructions** (system prompt) on top and **Guardrails** around everything
- **Context** = the desk in front of the model: everything it can see right now (instructions, tool list, history, results). MCP brings tools and data onto the desk.
- Analogy: a new intern — smart (model), has access to apps (tools), keeps notes (memory), works until the job is done (loop), follows a job description (instructions) and company rules (guardrails)

### Slide 25 — 1. The Model (the brain)
- Decides what to do next; reads tool results; writes final answer
- Choosing a model:
| Need | Choose | Examples |
|---|---|---|
| Hard reasoning, coding | Frontier model | Claude, GPT, Gemini (top tiers) |
| Fast + cheap, simple steps | Small model | Claude Haiku, GPT mini, Gemini Flash |
| Private / offline | Open-weight local | Llama, Qwen, Gemma via Ollama |
- Key terms: **context window** (how much it can read at once), **tokens** (billing unit), **latency**
- 🔗 Model docs: https://docs.claude.com · https://platform.openai.com/docs · https://ai.google.dev

### Slide 26 — 2. Tools (the hands)
- A tool = a function the model can ask to call. You describe it with **name + description + input schema**.
- 📊 DIAGRAM: tool call flow — Model: "call `check_book('Clean Code')`" → Your program runs function → result JSON → back to Model
- 📊 Code snippet:
```json
{
  "name": "check_book",
  "description": "Check if a library book is available",
  "input_schema": {
    "type": "object",
    "properties": { "title": { "type": "string" } },
    "required": ["title"]
  }
}
```
- The model never runs code itself — **your program** runs the tool and returns the result.
- Tool types: read data (search, DB query), act (send email, create ticket), compute (run code)

### Slide 26a — Common Tools Agents Use
- 🎛 INTERACTIVE: tool cards grouped by type — click a card to see example call + result
| Category | Tool | Example call | Example result |
|---|---|---|---|
| 🔎 Knowledge | Web search | `web_search("IEEE CS events Sri Lanka 2026")` | top 5 links + snippets |
| 🔎 Knowledge | Web fetch | `fetch_url("https://...")` | page text |
| 🔎 Knowledge | Doc / vector search (RAG) | `search_docs("refund policy")` | 3 matching paragraphs |
| 📁 Files | Read / write / edit file | `read_file("app.py")` | file contents |
| 💻 Compute | Code execution / Bash | `run("pytest -q")` | `12 passed, 1 failed` |
| 🗄 Data | SQL query | `query("SELECT count(*) FROM orders")` | `[{count: 1532}]` |
| ✉ Comms | Email / Slack / calendar | `send_email(to, subject, body)` | `sent ✓` (needs approval) |
| 🌐 Interface | Browser / computer use | `click("Submit")` | screenshot |
- **Built-in (server) tools** — provider runs them for you: e.g. web search, web fetch, code execution in Claude API; web search, file search, code interpreter in OpenAI API
- 🔗 https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview · https://platform.openai.com/docs/guides/tools

### Slide 26b — Building Custom Tools
- Any function can become a tool: your DB, university API, IoT device, internal service
- Example — `create_ticket` custom tool:
```python
def create_ticket(title: str, category: str, priority: str = "normal") -> dict:
    """Create a helpdesk ticket. category: library | it | exams"""
    if category not in {"library", "it", "exams"}:
        return {"error": f"unknown category '{category}'"}
    ticket_id = db.insert("tickets", title=title, category=category, priority=priority)
    return {"ticket_id": ticket_id, "status": "open"}
```
```json
{
  "name": "create_ticket",
  "description": "Create a helpdesk ticket for a student problem. Use only after confirming details with the user.",
  "input_schema": {
    "type": "object",
    "properties": {
      "title":    { "type": "string", "description": "One-line summary" },
      "category": { "type": "string", "enum": ["library", "it", "exams"] },
      "priority": { "type": "string", "enum": ["low", "normal", "high"] }
    },
    "required": ["title", "category"]
  }
}
```

### Slide 26c — Good Tool Design
- 📊 Bad vs Good comparison (two columns)
| ❌ Bad | ✅ Good |
|---|---|
| `do_stuff(data)` | `check_book(title)` — clear name, one job |
| no description | description says **what + when to use** |
| free-text args | `enum`s, types, required fields |
| returns 5,000-line dump | returns small, relevant JSON |
| crashes on bad input | returns helpful error: "unknown category 'lib', use: library, it, exams" |
| `delete_all_records()` | narrow, reversible actions; risky ones need approval |
- Key line: *Write tool descriptions like docs for a new teammate — the model reads them every time.*

### Slide 26d — Tools Inside Coding Agents
- Coding agents are agents whose tools are **your dev environment**
- 📊 DIAGRAM: Coding agent (Claude Code / Codex / Copilot agent / Cursor) → built-in tools: Read · Edit · Write · Grep/Glob · Bash (run tests, git) · Web fetch · Todo list → + your custom tools via MCP
- Example task trace — *"Fix the failing login test"*:
  1. `Bash: pytest` → 1 failed: `test_login_expired_token`
  2. `Grep: "expired"` → `auth.py:42`
  3. `Read: auth.py`
  4. `Edit: auth.py` → `<` changed to `<=`
  5. `Bash: pytest` → all passed ✓
- 🎞 ANIMATION: follows the Step button. The agent walks to Bash, Grep, Read, Edit, Bash while the terminal and auth.py change (test fails, line 42 found, `<` becomes `<=`, all tests pass)

### Slide 26e — Customising Your Coding Agent
| Feature | What it does | Example |
|---|---|---|
| **Project instructions** | rules the agent always reads | `CLAUDE.md`, `AGENTS.md` (🔗 https://agents.md), `.github/copilot-instructions.md`, Cursor rules |
| **MCP servers** | add custom tools (DB, GitHub, Jira, Figma, browser) | `claude mcp add github ...` · `.mcp.json` · `.cursor/mcp.json` · `.vscode/mcp.json` |
| **Custom commands / skills** | reusable prompts & workflows | `/review`, `/write-tests`, `.claude/skills/<name>/SKILL.md` |
| **Hooks** | run scripts automatically on events | run formatter after every edit; block edits to `.env` |
| **Permissions** | what the agent may do without asking | allow `npm test`, ask before `git push` |
- Example `CLAUDE.md`:
```markdown
# Project rules
- Python 3.12, FastAPI, pytest
- Run `pytest -q` after every change
- Never edit files in /migrations
- Use type hints; keep functions under 40 lines
```
- Example `.mcp.json` (shared with your team in the repo):
```json
{
  "mcpServers": {
    "campus": { "command": "python", "args": ["campus_mcp.py"] }
  }
}
```
- 🔗 Claude Code docs: https://docs.claude.com/en/docs/claude-code/overview · Copilot: https://docs.github.com/copilot · Cursor: https://docs.cursor.com

### Slide 27 — The Integration Problem (Why MCP?)
- Every AI app needs tools: GitHub, Drive, Slack, databases, your university API…
- 📊 DIAGRAM (before / after toggle 🎛):
  - **Before:** 5 AI apps × 6 services = **30 custom integrations** (spaghetti lines)
  - **After MCP:** 5 apps + 6 servers = **11 pieces**, all speaking one protocol (hub)
- Same story as USB: before USB every device had its own cable
- Key line: *Build a tool once → every MCP-compatible AI app can use it.*

### Slide 27a — What Is MCP? (Model Context Protocol)
- **Open standard** (introduced by Anthropic, Nov 2024) for connecting AI apps to tools and data; now supported by Claude, ChatGPT, Gemini, VS Code/Copilot, Cursor, n8n and many more
- 🔗 https://modelcontextprotocol.io
- 📊 DIAGRAM: architecture
  - **Host** — the AI app the user talks to (Claude Desktop, Claude Code, Cursor, VS Code)
  - **MCP client** — inside the host, one per server connection
  - **MCP server** — small program exposing capabilities (GitHub, Postgres, Figma, your own)
  - **Transport** — `stdio` (local process on your laptop) or **Streamable HTTP** (remote server)
  - Messages: **JSON-RPC 2.0**
- 🖼 IMAGE: `images/mcp-architecture.png` — optional official diagram / screenshot

### Slide 27b — What an MCP Server Can Offer
| Primitive | Who controls it | What it is | Example |
|---|---|---|---|
| 🔧 **Tools** | the model decides to call | functions that do things | `create_issue`, `run_query`, `check_book` |
| 📄 **Resources** | the app / user attaches | read-only data put into context | file contents, DB schema, `docs://syllabus` |
| 💬 **Prompts** | the user picks (often as `/command`) | reusable prompt templates | `/review-pr`, `/summarise-lecture` |
- Clients can also offer features back to servers (e.g. asking the user for input, letting the server request a model completion)
- Key line: *Tools = actions, Resources = context, Prompts = recipes.*

### Slide 27c — How an MCP Call Flows
- 🎛 INTERACTIVE: animated sequence diagram — click **Next** to step through
  1. Host starts → client connects to server → `initialize` (agree on version + capabilities)
  2. Client asks `tools/list` → server returns tool names, descriptions, input schemas
  3. Host puts tool definitions **into the model's context**
  4. User: *"Is Clean Code in the library?"*
  5. Model decides → `check_book(title="Clean Code")`
  6. Client sends `tools/call` → server runs function → returns result
  7. Result goes **back into context** → model writes the answer
- Example JSON-RPC message:
```json
{ "jsonrpc": "2.0", "id": 7, "method": "tools/call",
  "params": { "name": "check_book", "arguments": { "title": "Clean Code" } } }
```

### Slide 27d — Popular MCP Servers & How to Add Them
| Server | Gives the agent | Link |
|---|---|---|
| GitHub | issues, PRs, code search | 🔗 https://github.com/github/github-mcp-server |
| Playwright | control a real browser (test web apps) | 🔗 https://github.com/microsoft/playwright-mcp |
| Context7 | up-to-date library docs (stops outdated code) | 🔗 https://github.com/upstash/context7 |
| Filesystem / Git / Fetch | reference servers | 🔗 https://github.com/modelcontextprotocol/servers |
| Notion, Figma, Slack, Postgres… | your team's tools | 🔗 registry: https://registry.modelcontextprotocol.io |
- Add to coding agents:
```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```
```json
// .vscode/mcp.json  or  .cursor/mcp.json  or  claude_desktop_config.json
{ "servers": { "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" } } }
```
- 🗣 NOTES: Live demo option — add Playwright MCP, ask agent to "open our club website and check all links work".

### Slide 27e — Build Your Own MCP Server (15 lines)
```python
# campus_mcp.py   —   pip install "mcp[cli]>=2"
from mcp.server.mcpserver import MCPServer

mcp = MCPServer("campus")
# LIBRARY is loaded from demo/library.json, ROOMS is sample data

@mcp.tool()
def check_book(title: str) -> dict:
    """Check if a library book is available."""
    return LIBRARY.get(title.lower(), {"available": False})

@mcp.tool()
def find_free_room(time: str) -> list[str]:
    """List lecture rooms free at a given time, e.g. '14:00'."""
    return [r for r, busy in ROOMS.items() if time not in busy]

if __name__ == "__main__":
    mcp.run()
```
- Plug in: `claude mcp add campus -- python demo/campus_mcp.py` → now Claude Code, Cursor, VS Code Copilot, n8n can all use `check_book`
- 🔗 Python SDK: https://github.com/modelcontextprotocol/python-sdk · Inspector (test tool): https://github.com/modelcontextprotocol/inspector

### Slide 27f — MCP Safety
- An MCP server is **code running with your permissions** + text the model will trust
- Risks:
  - **Untrusted servers** — malicious code, data theft
  - **Tool poisoning** — hidden instructions inside tool descriptions or results
  - **Over-broad tokens** — server has write access to everything
- Rules: install only from trusted sources · read what tools it exposes · least-privilege tokens · approval for write actions · keep servers updated
- 🔗 https://modelcontextprotocol.io/specification (security best practices section)

### Slide 28 — 3. Context: What the Model Actually Sees
- **Context** = everything sent to the model in one request. The model knows *nothing else* about your task.
- 📊 DIAGRAM: stacked bar = one context window, layers:
  1. System prompt / instructions (+ CLAUDE.md / AGENTS.md)
  2. Tool definitions (incl. every connected MCP server's tools)
  3. Retrieved knowledge (RAG docs, MCP resources, files read)
  4. Conversation history
  5. Tool calls + tool results
  6. The current user message
- **Context window** = max tokens per request (today ~128K–1M+ tokens depending on model; 1 token ≈ ¾ English word)
- Key line: *The model is only as good as the context you give it.*

### Slide 28a — Context Fills Up Fast
- 🎛 INTERACTIVE: context budget visualiser — click buttons to add items, watch the bar fill and the cost/latency estimate rise
  - "+ system prompt (2K)" · "+ 5 MCP servers' tools (15K)" · "+ read 10 files (40K)" · "+ 20 chat turns (30K)" · "+ big log file (80K)"
  - At high fill: warnings appear — 🐢 slower · 💸 costlier · 😵 "lost in the middle" / distracted · ⛔ overflow
- Every loop step re-sends the whole context → agents fill it quickly
- Problems when context is bad:
  - **Overflow** — too long, oldest parts dropped or request fails
  - **Distraction / context rot** — important facts buried, quality drops
  - **Poisoning** — a wrong fact or hallucination gets repeated forever
  - **Conflict** — old and new instructions disagree

### Slide 28b — Context Engineering
- **Prompt engineering** = writing a good instruction. **Context engineering** = deciding *what goes into the window, at each step*.
- 📊 DIAGRAM: funnel — all available info → select → compress → order → model
- Techniques:
| Technique | Idea | Example |
|---|---|---|
| Retrieve just-in-time | fetch only what's needed, when needed | agent greps for one function instead of reading whole repo |
| RAG | search knowledge base, insert top matches | 3 relevant policy paragraphs, not the whole handbook |
| Compaction | summarise old turns when window gets full | "Summary so far: …" replaces 40 messages |
| Structured notes | agent writes progress to a file, re-reads later | `NOTES.md`, todo list |
| Sub-agents | send a sub-task to a fresh context, get back a short result | researcher agent returns 1-page summary |
| Trim tool results | return small JSON, not raw dumps | 5 rows, not 5,000 |
| Fewer, better tools | don't connect 20 MCP servers "just in case" | enable only what the task needs |
- 🔗 Effective context engineering for AI agents: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### Slide 28c — Memory (the notebook)
- 📊 DIAGRAM: three layers
  - **Short-term** — conversation in the context window (lost when session ends)
  - **Working** — scratchpad / files / todo list during a task
  - **Long-term** — database / vector store; retrieved when relevant (RAG)
- Key line: *The model is stateless. Memory is something **you** build around it.*
- Memory feeds context: long-term memory is useless until the right piece is **retrieved into the window** (see context engineering)

### Slide 29 — 4. The Loop (the heartbeat)
- 🎛 INTERACTIVE: animated stepper — click **Step** to move through: Think → Act (call tool) → Observe (result) → repeat → Answer. Side panel shows a live trace:
  - 🧠 Think: "User wants book 'Clean Code'. I should check availability."
  - 🔧 Act: `check_book(title="Clean Code")`
  - 👀 Observe: `{available: false, due_back: "Dec 15"}`
  - 🧠 Think: "Not available. Check for an alternative copy/ebook."
  - 🔧 Act: `search_catalog(query="Clean Code ebook")`
  - 👀 Observe: `{ebook: true, link: "..."}`
  - ✅ Answer: "Print copy is out until Dec 15, but the ebook is available here…"
- Stop conditions: task done · max steps reached · needs human approval · error

### Slide 30 — Multi-Agent Systems
- 📊 DIAGRAM: Orchestrator agent → Researcher sub-agent, Coder sub-agent, Reviewer sub-agent → results back
- Why: separate focus, parallel work, smaller contexts
- Cost: more tokens, harder to debug — use only when one agent isn't enough

### Slide 31 — Agent Frameworks
| Framework | Language | Link |
|---|---|---|
| Claude Agent SDK | Python / TS | 🔗 https://docs.claude.com/en/docs/agent-sdk/overview |
| OpenAI Agents SDK | Python / TS | 🔗 https://openai.github.io/openai-agents-python/ |
| Google ADK | Python / Java | 🔗 https://google.github.io/adk-docs/ |
| LangGraph | Python / JS | 🔗 https://www.langchain.com/langgraph |
| CrewAI | Python | 🔗 https://www.crewai.com |
| Vercel AI SDK | TypeScript | 🔗 https://ai-sdk.dev |
| n8n (no-code) | visual | 🔗 https://n8n.io |
- Advice: build one from scratch first (next section!) → then frameworks make sense

---

## BREAK (65–70)

### Slide 32 — Break
- **5-minute break**
- 🎛 INTERACTIVE: countdown timer 05:00 (click to start)
- Prompt on screen: *"Think of one boring task you'd hand to an agent."*

---

## SECTION 5 — Build (70–90)
### "Let's Build an Agent: Step by Step"

### Slide 33 — Section divider
- **05 · Build** — Let's Build an Agent: Step by Step

### Slide 34 — What We're Building: Campus Helpdesk Agent
- Goal: answer student questions, check library books, and create support tickets
- 📊 DIAGRAM: Student → Agent (free OpenRouter model + loop) → tools: `check_book`, `search_faq`, `create_ticket` (needs approval) → Memory file
- Stack: Python + OpenAI SDK + OpenRouter free model `nvidia/nemotron-3.5-lightning:free`, so students can run it themselves (same code works with local models)

### Slide 35 — Step-by-Step Builder
- 🎛 INTERACTIVE: 8 tabs; each shows code (new lines highlighted) + explanation
  1. **Setup & first call** — free key from https://openrouter.ai/keys, `pip install openai`, set `OPENROUTER_API_KEY`, `base_url="https://openrouter.ai/api/v1"`, `MODEL = "nvidia/nemotron-3.5-lightning:free"`, send one message. Free limits: 20 requests a minute, 50 a day. Free model list changes: https://openrouter.ai/models?max_price=0
  2. **Give it a job** — system prompt: role, rules, tone
  3. **Add tools** — define `check_book`, `search_faq`, `create_ticket` + Python functions
  4. **Add the loop** — call model → if `msg.tool_calls`, run tool, send a `role: "tool"` message back → repeat until done
  5. **Add memory** — save conversation to a JSON file, reload next run
  6. **Add guardrails** — max steps, human approval before `create_ticket`, errors returned, logging
  7. **Bonus: no internet** — change two lines to use LM Studio / Jan with Qwen 3.5 4B; compare speed + tool-call accuracy
  8. **Cline + MCP** — `pip install "mcp[cli]>=2"`; install Cline in VS Code; Settings → API Provider: OpenRouter, paste key, pick a free Nemotron model; MCP Servers icon → Configure → Configure MCP Servers, add `campus` with `command: python` and the full path to `demo/campus_mcp.py`, `autoApprove: []`; ask "Is Python Crash Course available in the library?" and approve the tool call

Core loop (step 4):
```python
while True:
    resp = client.chat.completions.create(
        model=MODEL, messages=messages, tools=TOOLS)
    msg = resp.choices[0].message
    messages.append(msg)
    if not msg.tool_calls:
        break
    for call in msg.tool_calls:
        args = json.loads(call.function.arguments)
        output = run_tool(call.function.name, args)
        messages.append({"role": "tool",
                         "tool_call_id": call.id,
                         "content": json.dumps(output)})
```

### Slide 36 — Run It: Watching the Agent Think
- 🎛 INTERACTIVE: click **Play** — terminal trace appears line by line
  - User: "Is 'Clean Code' available? If not, open a ticket to request another copy."
  - → tool `check_book` → not available
  - → tool `create_ticket` → ⚠ approval required → presenter clicks "Approve"
  - → ticket #1042 created → final answer
- 🗣 NOTES: Run live from `demo/helpdesk_agent.py` if network allows; otherwise use this simulated trace.

### Slide 38 — Your Turn (Mini Challenge)
- Extend the agent with one new tool:
  - `get_exam_timetable(course_code)`
  - `find_free_room(time)`
  - `weather_today(city)` (call a free API)
- Or: expose it as an MCP server and use it from Claude Code / Cursor / n8n
- Or: rebuild the same agent in n8n with a local Qwen model — compare
- Starter code + instructions: `demo/` folder · 🔗 https://github.com/janarthan-j/tech_talk_frontiers-
- 🖼 IMAGE: `images/repo-qr.png` — QR code to the code repo

### Slide 38a — Run an LLM on Your Own Laptop
- Why local: **free**, **private** (data never leaves laptop), **works offline**, great for experiments and learning
- 📊 DIAGRAM: stack — Desktop app (LM Studio / Jan) → inference engine (**llama.cpp**) → model file (**GGUF**, quantized) → your CPU / GPU
| Tool | What it is | Link |
|---|---|---|
| LM Studio | desktop app: discover, download, chat, local API server (llama.cpp; MLX on Mac) | 🔗 https://lmstudio.ai |
| Jan | open-source ChatGPT-style desktop app, runs offline on llama.cpp | 🔗 https://www.jan.ai |
| llama.cpp | the C/C++ engine underneath both | 🔗 https://github.com/ggml-org/llama.cpp |
| Ollama | CLI-first alternative, also llama.cpp-based | 🔗 https://ollama.com |

### Slide 38b — Which Model Fits My Laptop?
- Small models are now good enough for experiments, tool calling basics, summarising, classification
| Model (examples) | Size | Approx RAM (Q4) | Good for |
|---|---|---|---|
| Qwen 3.5 2B | 2B | ~2 GB | very fast; classify, extract, simple chat |
| Qwen 3.5 4B | 4B | ~3–4 GB | best starter; basic tool calling, coding help |
| Qwen 3.5 9B / Gemma / Llama 8B class | 8–9B | ~6–8 GB | stronger reasoning, needs 16 GB laptop |
- Key terms:
  - **Quantization** (Q4, Q5, Q8) — compress weights; Q4 ≈ ¼ size, small quality loss
  - **GGUF** — model file format used by llama.cpp
  - Rule of thumb: **~0.6 GB RAM per billion params at Q4** + room for context
- 🔗 Find models: https://huggingface.co/Qwen · https://lmstudio.ai/models
- 🗣 NOTES: Check exact model names/sizes on Hugging Face on the day; small-model lineup changes often. Live: download Qwen 4B in LM Studio and chat offline (turn Wi-Fi off for effect).

### Slide 38c — Your Laptop Is Now an AI API
- LM Studio and Jan expose an **OpenAI-compatible server** → any code written for OpenAI works locally by changing one line
| App | Default local endpoint |
|---|---|
| LM Studio | `http://localhost:1234/v1` |
| Jan | `http://localhost:1337/v1` |
| Ollama | `http://localhost:11434/v1` |
```python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:1234/v1", api_key="local")
resp = client.chat.completions.create(
    model="qwen3.5-4b",   # name as shown in LM Studio
    messages=[{"role": "user", "content": "Explain recursion in 2 lines"}])
print(resp.choices[0].message.content)
```
- Same server can plug into n8n, VS Code extensions (Cline, Continue), and our Build-section agent
- Limits: slower than cloud, weaker reasoning, small models make more tool-call mistakes → great for learning, test carefully before production

---

## SECTION 6 — Production (90–102)
### "Taking Agents to Production: Testing, Safety, and Cost"

### Slide 39 — Section divider
- **06 · Production** — Testing, Safety, and Cost

### Slide 40 — Demo vs Production
- 📊 DIAGRAM: pipeline — Build → Evaluate → Guard → Deploy → Observe → Improve (loop back)
- Key line: *A demo works once. Production works 10,000 times, with strange users, at a cost you can afford.*

### Slide 41 — Testing Agents (Evals)
- LLM output is non-deterministic → test differently
| Level | What | How |
|---|---|---|
| Unit | tools work correctly | normal pytest |
| Golden set | 20–100 real example tasks with expected outcomes | run on every change, track pass rate |
| LLM-as-judge | grade open-ended answers with a rubric | second model scores output |
| Trajectory | did it call the right tools in a sensible order? | inspect traces |
| Human review | sample real conversations | weekly review |
- Tools: 🔗 Promptfoo https://promptfoo.dev · LangSmith https://smith.langchain.com · Langfuse https://langfuse.com · Braintrust https://braintrust.dev

### Slide 42 — Safety & Security
- 📊 DIAGRAM: threat map around the agent
  - **Prompt injection** — malicious text in a web page / email / file tells the agent to do something bad
  - **Excessive agency** — agent has more permissions than needed
  - **Data leakage** — secrets / personal data in prompts or outputs
  - **Hallucinated actions** — wrong tool, wrong arguments
- Defences:
  - Least privilege (read-only by default)
  - Human-in-the-loop for irreversible actions (pay, delete, send)
  - Treat tool output as **data, not instructions**
  - Validate inputs/outputs, rate limits, audit logs
- 🔗 OWASP Top 10 for LLM Apps: https://genai.owasp.org

### Slide 43 — Cost: Know Your Numbers
- 🎛 INTERACTIVE: cost calculator
  - Inputs: users/day, requests per user, input tokens/request, output tokens/request, steps per task (loop iterations), price per 1M input tokens, price per 1M output tokens
  - Output: cost per task, per day, per month
  - Default prices are examples only → link to 🔗 https://www.anthropic.com/pricing · https://openai.com/api/pricing
- Key insight: **agents multiply cost** — every loop step re-sends the whole context

### Slide 44 — Making It Cheaper & Faster
- **Prompt caching** — reuse the unchanged part of the prompt (big savings)
- **Model routing** — small model for easy steps, big model for hard ones
- **Trim context** — summarise old messages, send only relevant docs
- **Batch** non-urgent work (batch APIs are cheaper)
- **Limit steps** — max iterations per task
- **Observe** — track tokens, latency, errors per request

### Slide 45 — Production Readiness Checklist
- 🎛 INTERACTIVE: clickable checklist with progress bar
  - [ ] Golden test set with pass-rate target
  - [ ] Max steps + timeouts
  - [ ] Human approval for risky actions
  - [ ] Least-privilege tool permissions
  - [ ] Prompt-injection defences
  - [ ] Secrets never in prompts / logs
  - [ ] Tracing + monitoring dashboard
  - [ ] Cost budget + alerts
  - [ ] Fallback when the model/API fails
  - [ ] Clear feedback path for users

---

## SECTION 7 — Careers (102–112)
### "New Roles in the AI-Driven Industry"

### Slide 46 — Section divider
- **07 · Careers** — New Roles in the AI-Driven Industry

### Slide 47 — New & Growing Roles
- 🎛 INTERACTIVE: role cards — click to expand "What they do" + "Skills to learn"
  1. **AI Engineer** — builds products on top of LLMs (APIs, RAG, agents). Skills: Python/TS, APIs, prompt/context engineering, evals
  2. **Agent / Applied AI Engineer** — designs tool-using agents and workflows. Skills: tool design, orchestration, MCP, reliability
  3. **LLMOps / ML Platform Engineer** — deploys, monitors, scales models and agents. Skills: cloud, Docker/K8s, observability, cost control
  4. **AI Evaluation Engineer** — builds test sets, graders, quality metrics. Skills: testing mindset, statistics, data analysis
  5. **AI Safety / Red Team Engineer** — attacks systems to find weaknesses. Skills: security, prompt injection, threat modelling
  6. **Forward Deployed / AI Solutions Engineer** — builds AI solutions with customers. Skills: coding + communication + domain knowledge
  7. **AI Product Manager** — decides what AI should (and shouldn't) do. Skills: user research, metrics, AI limitations
  8. **Data Engineer for AI** — pipelines, vector DBs, data quality. Skills: SQL, ETL, embeddings

### Slide 48 — Existing Roles Are Evolving
| Role | Before | Now |
|---|---|---|
| Software Engineer | writes all code | designs, directs AI, reviews, owns quality |
| QA Engineer | writes test scripts | designs evals, tests AI behaviour |
| DevOps | pipelines & infra | + model deployment, AI cost & monitoring |
| Designer | screens | + AI interaction & conversational UX |
| Data Analyst | writes queries | + AI-assisted analysis, validates AI output |

### Slide 49 — The AI-Ready Engineer (Skills Stack)
- 📊 DIAGRAM: layered stack (bottom → top)
  1. **Foundations** — DSA, OOP, databases, networking, Git
  2. **Engineering** — APIs, cloud, testing, security
  3. **AI layer** — LLM APIs, prompting/context engineering, RAG, agents, MCP, evals
  4. **Human layer** — communication, product thinking, ethics, judgement
- Key line: *Employers want engineers who can **ship** AI features safely — not just use ChatGPT.*

---

## SECTION 8 — Closing (112–120)
### "Where to Go from Here" + Q&A

### Slide 50 — Section divider
- **08 · Closing** — Where to Go from Here

### Slide 51 — Your 30 / 60 / 90 Day Plan
- 🎛 INTERACTIVE: three tabs
  - **30 days** — use an agentic coding tool daily on a real project; take one short course; get GitHub Student Pack; install LM Studio or Jan and run Qwen 4B locally
  - **60 days** — build your own agent with 3+ tools; add a golden test set; write a blog post about it
  - **90 days** — ship a small AI product (deployed, monitored); contribute to an open-source AI tool / MCP server; join a hackathon

### Slide 52 — Free Learning Resources
| Resource | Link |
|---|---|
| Anthropic Academy (courses) | 🔗 https://anthropic.skilljar.com |
| Building Effective Agents (article) | 🔗 https://www.anthropic.com/engineering/building-effective-agents |
| DeepLearning.AI Short Courses | 🔗 https://www.deeplearning.ai/short-courses/ |
| Hugging Face Agents Course | 🔗 https://huggingface.co/learn/agents-course |
| OpenAI Cookbook | 🔗 https://cookbook.openai.com |
| Model Context Protocol docs | 🔗 https://modelcontextprotocol.io |
| GitHub Student Developer Pack | 🔗 https://education.github.com/pack |
| n8n AI docs + templates | 🔗 https://docs.n8n.io/advanced-ai/ · https://n8n.io/workflows |
| LM Studio docs (local API) | 🔗 https://lmstudio.ai/docs |
| Jan docs | 🔗 https://www.jan.ai/docs |
| OWASP GenAI Security | 🔗 https://genai.owasp.org |

### Slide 53 — Project Ideas for Students
- 📊 6 idea cards
  1. Study buddy agent — reads your lecture PDFs, quizzes you
  2. Lab report reviewer — checks format + references
  3. Club event assistant — answers FAQs, registers attendees
  4. GitHub issue triager — labels and drafts replies
  5. Campus navigator — finds free rooms / timetables
  6. Your own MCP server — expose a university API to AI tools

### Slide 54 — Key Takeaways
1. AI is moving from **answering** to **doing**.
2. An agent = **model + tools + memory + loop**.
3. You can build one in **~60 lines** — do it this week.
4. Production = **evals, safety, cost** — that's where engineers add value.
5. Fundamentals + AI skills = the most in-demand engineer.

### Slide 55 — Q&A + Thank You
- **Questions?**
- Janarthan Jeyachandran · Email: jeyjanarthan@gmail.com · LinkedIn: linkedin.com/in/janarthan-jeyachandran-42249b148 · GitHub: github.com/janarthan-j
- 🖼 IMAGE: `images/speaker.jpg` — speaker photo (optional)

---

## Timing check

| Section | Slides | Minutes |
|---|---|---|
| Title + Agenda | 1–2 | (part of Opening) |
| Opening | 3–7 | 10 |
| Trends | 8–16 | 20 — keep tool demo to 4 min |
| The Shift (incl. n8n 22a–22e) | 17–22e | 15 — one 4-min live n8n demo |
| Agents Explained (incl. tools 26a–26e, MCP 27–27f, context 28–28b) | 23–31 | 20 — tools ~6 min, MCP ~5 min, context ~4 min, rest ~5 min. Tightest section: consider taking 5 min from Trends |
| Break | 32 | 5 |
| Build (incl. local LLMs 38a–38c) | 33–38c | 20 — local LLM demo 4 min |
| Production | 39–45 | 12 |
| Careers | 46–49 | 10 |
| Closing + Q&A | 50–55 | 8 |

Total 75 slides (8 dividers). Content is dense — slides marked ⏩ below can be skipped live and left for students to read later:
⏩ 14 (Beyond writing code), 26c (Good tool design), 27e (Own MCP server — also in Build challenge), 27f (MCP safety — repeated in Production), 30 (Multi-agent), 48 (Evolving roles).

## Image list (all optional placeholders)

`title-bg.jpg`, `ieee-logo.png`, `chat-ui.png`, `ide-copilot.png`, `terminal-agent.png`, `app-builder.png`, `n8n-email-agent.png`, `mcp-architecture.png`, `repo-qr.png`, `speaker.jpg`, `senzmate-logo.png`

## Open questions for you

1. Speaker name, branch name, date for title slide?
2. Demo agent language: **Python** (planned) or JavaScript/TypeScript?
3. Demo model provider: **OpenRouter free models** (decided)
4. Theme preference: dark (default) or light, any IEEE brand colours?
5. Do you want the `demo/` agent code written as real runnable files too?
