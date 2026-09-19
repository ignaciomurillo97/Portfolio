# Deployment and RAG Roadmap

## Current Application

The portfolio is a static React application built with Create React App.

- Build command: `npm run build`
- Output directory: `build`
- Current data source: JSON files in `public/`
- Current backend requirement: None

## Phase 1: Deploy the Static Portfolio

Recommended provider: Cloudflare Workers static assets.

Configuration:

- Build command: `npm run build`
- Output directory: `build`
- Deployment source: GitHub repository through Actions
- Automatic deployment: enabled for pushes to the main branch

Alternative providers:

- Netlify
- Vercel
- GitHub Pages
- Render Static Sites

Cloudflare Workers is the current deployment target because the portfolio is configured as the existing `portfolio` Worker with static assets. It provides HTTPS, global delivery, automatic deployments through GitHub Actions, and a direct path toward serverless API functionality.

## Phase 2: Move Portfolio Data to a Database

Recommended database: Supabase PostgreSQL.

Potential tables:

- `companies`
- `roles`
- `projects`
- `skills`
- `role_skills`
- `project_skills`
- `education`
- `documents`
- `embeddings`

This relational structure supports queries such as:

- Which projects used C# and Azure?
- Which roles involved distributed systems?
- Which experience is relevant to frontend development?
- Which skills appear across multiple projects?

Supabase is a good fit because it includes PostgreSQL, authentication, storage, edge functions, and `pgvector` support.

Alternative database options:

- Neon PostgreSQL
- Railway PostgreSQL
- PlanetScale
- Cloudflare D1
- Turso

## Phase 3: Add Structured Search

Before implementing RAG, add traditional database search and filtering.

Potential filters:

- Skill
- Company
- Role
- Technology
- Project type
- Date range

Structured search will be faster, cheaper, and more predictable for exact queries.

## Phase 4: Add Semantic Search

Add embeddings for experience, education, skills, and project descriptions.

Recommended approach:

1. Combine the relevant fields from each record into searchable text.
2. Generate an embedding for each record.
3. Store the embedding in PostgreSQL using `pgvector`.
4. Embed the employer's query.
5. Retrieve the most relevant records using vector similarity.
6. Return the matched portfolio entries to the frontend.

For a small portfolio, PostgreSQL with `pgvector` should be sufficient. A dedicated vector database is probably unnecessary initially.

## Phase 5: Add RAG Responses

Use a secure serverless API endpoint.

The request flow should be:

1. Employer submits a question in the React frontend.
2. The frontend sends the question to the API.
3. The API creates an embedding for the question.
4. The API retrieves relevant experience, skills, and projects.
5. The API sends the retrieved context to an LLM.
6. The API returns an answer with links to the relevant portfolio sections.

API keys must remain on the server and must never be exposed in React client code.

## Recommended Low-Cost Architecture

```text
Cloudflare Workers
        |
        v
React portfolio frontend
        |
        v
Cloudflare Worker or Supabase Edge Function
        |
        +--> Supabase PostgreSQL
        |      - Portfolio data
        |      - Relationships
        |      - Full-text search
        |      - Vector embeddings
        |
        +--> LLM provider
               - Answer generation
               - Query embeddings