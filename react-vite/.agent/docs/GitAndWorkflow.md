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
