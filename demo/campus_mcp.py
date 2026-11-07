"""Campus MCP server — exposes campus tools to any MCP-compatible AI app.

    pip install "mcp[cli]>=2"
    claude mcp add campus -- python demo/campus_mcp.py      (Claude Code)
    mcp dev demo/campus_mcp.py                              (test in MCP Inspector)
"""
import json
import pathlib

from mcp.server.mcpserver import MCPServer

mcp = MCPServer("campus")

# "Import" the catalogue from a JSON file, the way an app would load a database table.
_books = json.loads((pathlib.Path(__file__).parent / "library.json").read_text(encoding="utf-8"))["books"]
LIBRARY = {book["title"].lower(): book for book in _books}
ROOMS = {"A101": ["09:00", "10:00"], "B204": ["14:00"], "C310": []}


@mcp.tool()
def check_book(title: str) -> dict:
    """Check if a library book is available."""
    return LIBRARY.get(title.lower(), {"available": False, "note": "not in catalogue"})


@mcp.tool()
def find_free_room(time: str) -> list[str]:
    """List lecture rooms free at a given time, e.g. '14:00'."""
    return [room for room, busy in ROOMS.items() if time not in busy]


if __name__ == "__main__":
    mcp.run()
