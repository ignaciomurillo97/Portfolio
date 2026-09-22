# Test Account Security Compliance Automation

## Hardening test tenant systems after a security incident

**Microsoft**

After a security breach where an attacker gained access to a test tenant, I led an initiative to harden test account systems across the team. The prior process relied on manual, ad-hoc onboarding for rotating tenants — a multi-day on-call task with inconsistent security practices.

### Highlights

- Introduced periodic account expiry and strict authentication requirements for test accounts
- Automated onboarding for rotating tenants, replacing a previously multi-day manual on-call task
- Implemented the org's first Federated Identity Credential (FIC)-based authentication for test accounts, eliminating credential sharing over insecure channels
- Collaborated with the account provisioning team to build automation hooks
- Shared findings and assisted other teams adopting the same approach

### Impact

Cut test-tenant onboarding from days of manual on-call work to a fully automated flow, removed a credential-sharing security risk org-wide, and the pattern was adopted by other teams.

### Technologies

Federated Identity Credentials (FIC), authentication hardening, automation, Azure, zero-trust principles.
