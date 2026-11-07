"""Campus MCP server — exposes campus tools to any MCP-compatible AI app.

    pip install "mcp[cli]"
    claude mcp add campus -- python demo/campus_mcp.py      (Claude Code)
    mcp dev demo/campus_mcp.py                              (test in MCP Inspector)
"""
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("campus")

LIBRARY = {
    "clean code": {"available": False, "due_back": "2026-10-25"},
    "sicp": {"available": True, "shelf": "QA76.6"},
}
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
