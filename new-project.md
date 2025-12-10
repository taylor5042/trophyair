# New Project Scaffold

Use this checklist whenever you spin up a fresh repo so your Python tooling and Git identity stay consistent with Lomondview.

## 1. Create the repository structure

1. Make the project directory and enter it.
2. Add the core folders you typically expect (e.g., `src/`, `tests/`, `scripts/`).
3. Drop in a `.gitignore` that at least excludes `.venv/`, `__pycache__/`, and `*.pyc`.

```bash
cat <<'EOF' > .gitignore
.venv/
__pycache__/
*.pyc
EOF
```

## 2. Create and activate the virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

> Tip: capture dependencies as you go: `pip install <pkg>` followed by `pip freeze > requirements.txt`.

## 3. Ensure the venv auto-activates in VS Code

Create `.vscode/settings.json` (commit this) so VS Code always uses the project-local interpreter.

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python",
  "python.terminal.activateEnvironment": true
}
```

Because `python.terminal.activateEnvironment` is enabled in your global VS Code settings, every brand-new terminal inside the repo automatically runs the equivalent of:

```bash
source /Users/<you>/path-to-repo/.venv/bin/activate
```

That’s why you see the same `source .../.venv/bin/activate` line (like in `nationalbordercollienew`) without typing anything—VS Code fires it for you as soon as the prompt appears.

## 4. Quick shell activation helper (optional but handy)

If you open terminals *outside* VS Code, drop in `scripts/activate.sh` so you can manually source the venv with one command.

```bash
cat <<'EOF' > scripts/activate.sh
#!/usr/bin/env bash
source "$(dirname "$0")/../.venv/bin/activate"
EOF
chmod +x scripts/activate.sh
```

Usage:

```bash
source scripts/activate.sh
```

## 5. Git identity

Set the local repo user to your private GitHub email. Run these once per repo:

```bash
git config user.name "Matt Taylor"
git config user.email "2388818+taylor5042@users.noreply.github.com"
```

Use the same commands with `--global` if you want every repo on this machine to share the identity by default.

## 6. README starter blurb

Document the setup steps directly in each project README so collaborators follow the same process:

```markdown
## Local Setup
1. `python3 -m venv .venv`
2. `source .venv/bin/activate`
3. `pip install -r requirements.txt`
4. VS Code auto-activates because `.vscode/settings.json` pins the interpreter.
```

---

With this scaffold in place, every new project boots with the same Python environment flow, auto-activation behavior, and commit attribution
