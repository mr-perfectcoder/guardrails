# Specification Status — Next.js Industrial Architecture

Use this document to track the implementation of technical specifications, API contracts, and architectural decisions.

## 📋 Active Specifications

| Spec Name | ID | Status | Priority | Last Updated |
| :--- | :--- | :--- | :--- | :--- |
| [e.g., Auth Flow] | `AUTH-001` | 🟡 In Progress | 🔴 High | 2026-04-15 |
| [e.g., Domain API] | `API-DOM` | 🟢 Verified | 🟡 Mid | 2026-04-14 |

---

## 🎯 Implementation Milestones

### 🏗️ Phase 1: Core Definitions
- [ ] Define API schemas (Yup) in `lib/schemas/`
- [ ] Document shared types in `types/`
- [ ] Establish Server Action entry guards

### 🧪 Phase 2: Spec Verification
- [ ] Integration tests verify spec parity
- [ ] Edge cases (401, 429, 500) documented and handled
- [ ] CSRF and Rate Limit guards verified

### 🚀 Phase 3: Final Compliance
- [ ] Performance audit (Lighthouse/Web Vitals)
- [ ] Security audit (Action Guards check)
- [ ] Documentation updated in `skills/`

---

## 🤖 Agent Protocol: Spec-Driven Development
1. **Consistency**: Before starting a feature, check this file for existing specs.
2. **Parity**: Ensure code implementation matches the linked specs 100%.
3. **Updating**: When a milestone is completed, update this document immediately.
4. **Deviance**: If the USER asks for a logic that contradicts a spec, **flag it** and ask for a spec update first.
