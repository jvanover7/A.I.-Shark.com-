# GSD (Get Shit Done) — Vendored Copy

This is a vendored snapshot of [`gsd-build/get-shit-done`](https://github.com/gsd-build/get-shit-done) (MIT licensed),
a meta-prompting, context engineering, and spec-driven development skill system
for Claude Code, Codex, Cursor, Copilot, Gemini CLI, OpenCode, Windsurf, etc.

Snapshot kept in-tree so future projects can install GSD without re-fetching
from npm/GitHub. Heavy non-essentials stripped: `.git/`, `tests/`,
`CHANGELOG.md`, non-English READMEs, GitHub config dirs.

## Install into the current repo

From this repo's root:

```bash
node tools/get-shit-done/bin/install.js
```

Or install the latest published version directly (recommended when online):

```bash
npx get-shit-done-cc@latest
```

The installer copies skills, slash commands, agents, and hooks into the
appropriate runtime directory (e.g. `~/.claude/skills/gsd-*/` for Claude Code).

## Core slash-command loop

After install, the six-command core loop:

| Command | Purpose |
| --- | --- |
| `/gsd-new-project` | Questions → research → requirements → roadmap |
| `/gsd-discuss-phase [N]` | Capture implementation decisions for a phase |
| `/gsd-plan-phase [N]` | Research and plan a phase in detail |
| `/gsd-execute-phase <N>` | Execute the plan (parallelized) |
| `/gsd-verify-work [N]` | Acceptance testing of completed work |
| `/gsd-ship [N]` | Open a PR from completed work |

Plus codebase analysis, milestone management, debugging, UAT, and audit
commands — see `commands/gsd/` and `agents/` in this folder.

## What gets created in a target repo

GSD writes a `.planning/` directory containing `PROJECT.md`, `REQUIREMENTS.md`,
`ROADMAP.md`, `STATE.md`, `config.json`, and phase-specific files.

## Re-syncing this vendored copy

```bash
rm -rf tools/get-shit-done
git clone --depth 1 https://github.com/gsd-build/get-shit-done.git tools/get-shit-done
rm -rf tools/get-shit-done/{.git,tests,.changeset,.github,.githooks,.out-of-scope,.plans}
rm -f tools/get-shit-done/{CHANGELOG.md,README.ja-JP.md,README.ko-KR.md,README.pt-BR.md,README.zh-CN.md}
```

## License

GSD is MIT-licensed by TÂCHES / Lex Christopherson (glittercowboy). See
`tools/get-shit-done/LICENSE`.
