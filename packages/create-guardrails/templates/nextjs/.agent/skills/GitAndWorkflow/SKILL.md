---
name: gitandworkflow
description: Guidelines and best practices for Git Workflow & Commit Standards in nextjs.
---

# Git Workflow & Commit Standards

To maintain a clean repository history and automate versioning, we follow strict Git and commit standards.

---

## 📝 Commit Message Standards (Conventional Commits)

We use **Conventional Commits** via `Commitlint`. Every commit message must follow this structure:
`<type>[optional scope]: <description>`

### Types:
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools.

### Example:
- `feat(auth): add login form validation`
- `fix(ui): resolve button alignment issue`
- `refactor: extract user logic to custom hook`

---

## 🚦 Git Hooks (Husky)

We use **Husky** to automate quality checks before code enters the repository.
1.  **`pre-commit`**: Runs `lint-staged` (ESLint + Prettier) and `npm run test`.
2.  **`commit-msg`**: Runs `commitlint` to ensure the message follows the standards above.
3.  **`pre-push`**: Runs `npm run build` to ensure the project compiles successfully.

---

## 🌿 Branching Strategy

1.  **Main Branch (`main`)**: Production-ready code. Never commit directly to `main`.
2.  **Feature Branches (`feat/[description]`)**: Developing new features.
3.  **Bugfix Branches (`fix/[description]`)**: Fixing issues.
4.  **Pull Requests**: All branch merges require a Pull Request, a successful build in CI, and at least one code review.

---

## 🎫 Jira Smart Commits (Conditional)

Jira Smart Commits allow you to log time, transition issues, and add comments directly from your Git commit message.

### 🤖 Agent Detection Protocol
**Before every `git push`, the agent MUST ask:**

> *"Do you use Jira Smart Commits for this project? If yes, I'll format your commit message to include your Jira issue key."*

If the USER confirms they use Jira Smart Commits, the agent MUST:
1.  **Always ask for the Jira issue key** (e.g., `PROJ-123`) before composing any commit message.
2.  **Format every commit** using the Smart Commit syntax.
3.  **Never push** without confirming the issue key is included.

---

### 📐 Smart Commit Format

```
<JIRA-KEY> <type>(scope): <description> #<transition> #time <time> #comment <comment>
```

| Part | Required | Example |
|---|---|---|
| `JIRA-KEY` | ✅ Always | `PROJ-123` |
| `type(scope)` | ✅ Always | `feat(auth)` |
| `description` | ✅ Always | `add login form validation` |
| `#<transition>` | 🟡 Optional | `#in-progress`, `#done`, `#review` |
| `#time` | 🟡 Optional | `#time 2h 30m` |
| `#comment` | 🟡 Optional | `#comment Completed login flow` |

### ✅ Smart Commit Examples

Standard (minimum required):
```
PROJ-123 feat(auth): add login form validation
```

With transition:
```
PROJ-456 fix(ui): resolve button alignment issue #done
```

With time logging and comment:
```
PROJ-789 refactor: extract user logic to hook #in-progress #time 1h #comment Refactored to custom hook
```

### ❌ DON'T: Commit without the Jira key (when Smart Commits enabled)
```
// Bad: No Jira key, won't link to the issue
feat(auth): add login form validation
```

---

## 🤖 Agent Interaction Protocol

1.  **Discovery**: At the start of a git push session, ask: *"Are you using Jira Smart Commits?"*
2.  **If YES**: Store the user's confirmation and **always request the issue key** (`e.g., PROJ-123`) before building any commit message.
3.  **If NO**: Use standard Conventional Commits format only.
4.  **Pre-push gate**: Never suggest a `git push` command without first presenting the formatted commit message for user review.
