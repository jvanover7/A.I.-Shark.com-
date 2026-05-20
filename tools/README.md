# Vendored Claude Code skills, plugins, and tools

Local snapshots of third-party Claude Code plugins/skills so they travel with
this repo and can be installed into future projects without re-fetching.
Each subdirectory includes its own upstream LICENSE.

| Folder | Upstream | What it does |
| --- | --- | --- |
| `get-shit-done/` | [`gsd-build/get-shit-done`](https://github.com/gsd-build/get-shit-done) | Meta-prompting / spec-driven dev system. Six-command core loop (`/gsd-new-project`, `/gsd-plan-phase`, `/gsd-execute-phase`, `/gsd-verify-work`, `/gsd-ship`, `/gsd-discuss-phase`). MIT. |
| `claude-plugins-official/plugins/skill-creator/` | [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official) | Anthropic-official skill for authoring new Claude Code skills. |
| `claude-plugins-official/plugins/frontend-design/` | same repo | Anthropic-official skill for production-grade frontend UI generation. |
| `context-mode/` | [`mksglu/context-mode`](https://github.com/mksglu/context-mode) | MCP server that sandboxes tool output to cut context consumption up to ~98%. |
| `claude-mem/` | [`thedotmack/claude-mem`](https://github.com/thedotmack/claude-mem) | Persistent memory compression — captures session work and re-injects relevant context next session. |

## Installation

### GSD
```bash
node tools/get-shit-done/bin/install.js
# or, online:
npx get-shit-done-cc@latest
```

### skill-creator / frontend-design (Anthropic official marketplace)
```bash
# In Claude Code:
/plugin marketplace add anthropics/claude-plugins-official
/plugin install skill-creator@claude-plugins-official
/plugin install frontend-design@claude-plugins-official
```
The vendored copies under `tools/claude-plugins-official/plugins/<name>/` can also be symlinked or copied into `~/.claude/plugins/` for offline use.

### context-mode
```bash
# In Claude Code:
/plugin marketplace add mksglu/context-mode
/plugin install context-mode@context-mode
# or run locally:
cd tools/context-mode && bun install && bun start
```

### claude-mem
```bash
# In Claude Code:
/plugin install claude-mem
# or run installer from the vendored copy:
cd tools/claude-mem/install && ./install.sh   # check install/ for exact entry
```

## Re-syncing

Snapshots taken on 2026-05-20. To refresh any of them:

```bash
rm -rf tools/<name>
git clone --depth 1 <upstream-url> tools/<name>
rm -rf tools/<name>/.git tools/<name>/tests tools/<name>/.github
# trim CHANGELOGs / docs / non-English READMEs as needed
```

## Licenses

Each vendored tool retains its upstream license. See each subdirectory's
`LICENSE` file. None of these are products of this repo — they are included
under the terms of their respective open-source licenses for convenience.
