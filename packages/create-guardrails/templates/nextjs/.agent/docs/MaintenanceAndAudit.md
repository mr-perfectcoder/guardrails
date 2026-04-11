# Package Maintenance & Security Audit

To ensure the long-term stability and security of the application, we perform regular audits of all third-party dependencies.

---

## 🛠️ Weekly Audit Workflow

Every week, developers must run a security audit to identify vulnerable packages.

### 1. Run the Audit
Execute the following command to check for vulnerabilities:
```bash
npm audit
```

### 2. Logging the Results
All audit results must be recorded in a dedicated log file at the project root: `.audit-packages.log`.
- **Requirement:** Include a timestamp for every entry.
- **Example Log Entry:**
```text
[2026-04-11 00:01:38] - AUDIT START
Vulnerability found in 'lodash' (low).
Vulnerability found in 'axios' (high).
Action: Waiting for user confirmation to run 'npm audit fix'.
```

### 3. User Confirmation & Fixing
**CRITICAL:** Never run destructive fix commands (like `npm audit fix --force`) or major version updates without explicit confirmation.
- **Step 1:** Present the audit findings to the user.
- **Step 2:** Ask for permission to fix specific vulnerabilities.
- **Step 3:** Only execute the fix if the user confirms.

---

## 📊 Dependency Review

- **Updates:** Check for outdated packages once a month using `npm outdated`.
- **Criteria for update:**
    - High or Critical security risk (Must fix).
    - Necessary feature in a newer version.
    - Improved performance or smaller bundle size.
- **Risk Assessment:** Before updating, review the package's changelog for breaking changes and ensure the [TDD Suite](TestingStrategy.md) passes after the update.
