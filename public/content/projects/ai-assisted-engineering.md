# AI-Assisted Engineering Tooling

## Agent-based tooling to cut build times, automate on-call reporting, and diff large logs

**Microsoft**

A set of independently designed and implemented agent-based tools that improved developer productivity and on-call efficiency across the team, later adopted as standard process.

### Highlights

- **Build parallelization**: Replaced a sequential build script across 12+ projects with an agent that traverses the dependency graph and produces a parallelized build sequence
- **On-call report automation**: Built an agent that fetches data via MCP servers, fills a markdown report template with generated charts/tables, and publishes it to ADO Wiki, including scanning Teams channels and meetings for deployment context
- **Log diffing**: Implemented a Longest Common Substring algorithm to asynchronously diff large policy-change logs (some reaching thousands of entries) and surface exactly what changed

### Impact

Cut build time from roughly 20 to 6 minutes per build, freed hours of on-call engineer time per rotation, and gave engineers a precise, low-latency view of large policy changes. Took a leading and mentoring role in AI adoption across the team and organization.

### Technologies

AI agents, Model Context Protocol (MCP), dependency graph analysis, dynamic programming, asynchronous processing, developer productivity tooling.
