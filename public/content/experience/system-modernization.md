# System Modernization

## Microsoft: Policy Administration modernization

**2023 - 2026**

Our team owned the largest and most active NuGet in the Microsoft Teams policy-management ecosystem. It was consumed by the Teams Administration Gateway and other services, which created a major deployment bottleneck: a change in one package could cascade through multiple environments and regions, causing slow rollouts and frequent rollbacks.

### The challenge

The monolithic dependency model made deployments painful and fragile. Coordinating changes across teams in different time zones created operational risk, and the platform had grown in a way that made it difficult to isolate regressions or roll out safely. The solution was to move our policy-management logic out of the shared library and into a standalone service.

### The migration

We evaluated two options: a large refactor of the existing codebase to run as a .NET Core console-hosted app, or extracting it into a standalone service by forking the existing Administration Gateway and hosting the policy layer independently. We chose the second approach because it was faster, safer, and reusable by other teams looking to modernize their own dependencies.

I helped lead the refactor and rollout. We split the service from the shared NuGet, updated the Administration Gateway to call the new service as a proxy, and used feature flags to enable gradual production rollout. I then owned the deployment work in Pre-Prod and Production across multiple public regions, including Azure DevOps pipeline setup, EV2 stages, and monitoring/logging integration.

### Operational impact

This project was especially valuable because it solved a long-standing deployment pain point while deepening my knowledge of Azure infrastructure, Kubernetes, pipeline automation, observability, and operational ownership. I worked closely with the Gateway team to migrate telemetry and dashboards, and I fixed stale ARM templates and deployment artifacts that had drifted over time.

### Lessons learned

This effort also taught me a valuable engineering lesson: large modernization projects need frequent milestone checks, early escalation, and a realistic way to measure risk. The original plan was more optimistic than the execution timeline, and we had to cut scope and extend the ETA. I used that experience to improve how I manage future projects by setting clearer checkpoints, surfacing blockers earlier, and proposing mitigation plans before they become delivery risks.

### Focus areas

- Service extraction and modernization
- Azure DevOps and EV2 deployment
- Kubernetes and regulated cloud operations
- Logging, monitoring, and rollout safety
