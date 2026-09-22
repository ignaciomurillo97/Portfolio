# System Modernization

## Migrating a shared policy-management dependency into a standalone service

**Microsoft**

This platform modernization effort moved the team’s core Microsoft Teams policy-management logic out of a shared NuGet dependency and into a standalone service. The original model was tightly coupled to the Administration Gateway and created major deployment risks: a change in one dependency could force broad rollouts across regions and environments, with costly rollback cycles.

### Highlights

- Extracted policy-management functionality from a shared NuGet into a standalone service
- Evaluated two migration strategies and selected the faster, more reusable modernization path
- Updated the Administration Gateway to call the new service through a proxy layer
- Used feature flags to enable safe, incremental rollout to production
- Owned deployment work across Pre-Prod and Production regions, including Azure DevOps pipelines and EV2 stages
- Migrated logging and monitoring assets to match the existing Gateway service model

### Impact

The project addressed a long-running deployment bottleneck and improved the team’s ability to release changes safely. It also expanded my operating knowledge across Azure infrastructure, Kubernetes, deployment automation, and production observability in a highly regulated environment.

### Technologies

C#, .NET, Azure, Kubernetes, Azure DevOps, EV2, monitoring, and service modernization.
