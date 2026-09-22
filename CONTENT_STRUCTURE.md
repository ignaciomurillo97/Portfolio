# Content Structure

This portfolio separates content into two layers:

- JSON files provide the compact data used by timeline cards and navigation.
- Markdown files provide the longer, blog-style detail pages.

The shared key between both layers is `slug`.

## Directory Layout

```text
public/
├── contact.json
├── education.json
├── experience.json
├── projects.json
└── content/
    ├── education/
    │   └── <slug>.md
    ├── experience/
    │   └── <slug>.md
    └── projects/
        └── <slug>.md
```

All files under `public/` are served as static assets. They are fetched at runtime using paths such as:

```text
/experience.json
/content/experience/microsoft-policy-administration.md
```

## JSON Index Files

The index files contain the information shown in the timeline sections.

### Timeline record

`experience.json`, `education.json`, and `projects.json` use the generic timeline shape:

```json
{
  "date": "2023-2026",
  "organization": "Microsoft",
  "title": "Software Engineer",
  "description": "Short summary displayed in the timeline.",
  "icon": "PC",
  "tags": [".NET", "C#", "Azure"],
  "slug": "microsoft-policy-administration"
}
```

Fields:

- `date`: Date range or display label shown on the left side of the timeline.
- `organization`: Company, school, client, or other organization.
- `title`: Role, degree, project title, or other primary label.
- `description`: Short summary shown on the main portfolio page.
- `icon`: Short text displayed inside the timeline marker.
- `tags`: Technologies, skills, subjects, or categories shown as tags.
- `slug`: URL-safe identifier linking the record to its Markdown page.

The `slug` should be unique within its content type, use lowercase letters, and separate words with hyphens.

## Markdown Detail Files

Each timeline record with a `slug` can have a matching Markdown file:

```text
public/content/<type>/<slug>.md
```

Examples:

```text
public/content/experience/microsoft-policy-administration.md
public/content/education/computer-science-degree.md
public/content/projects/cloud-helper.md
```

The application loads these files through the generic route:

```text
/details/<type>/<slug>
```

For example:

```text
/details/experience/microsoft-policy-administration
```

Markdown supports headings, paragraphs, bold text, lists, links, blockquotes, inline code, and code blocks. A typical detail page can use:

```md
# Project or Role Name

## Context

A longer explanation of the work.

### Highlights

- Important contribution
- Technical decision
- Measurable outcome

### Technologies

React, TypeScript, PostgreSQL, and Cloudflare Workers.
```

The first heading is rendered as the page title. The remaining headings organize the longer narrative.

## Contact Data

`contact.json` is separate because it is shared by the footer and contact modal:

```json
{
  "label": "GitHub",
  "href": "https://github.com/example",
  "icon": "github",
  "detail": "@example"
}
```

Fields:

- `label`: Link name displayed to users.
- `href`: Destination URL, email URL, or local resume path.
- `icon`: Icon key understood by the footer and contact modal.
- `detail`: Optional right-aligned account or address text in the contact modal.

## Adding New Content

1. Add a record to the appropriate JSON index file.
2. Give it a unique slug.
3. Create `public/content/<type>/<slug>.md`.
4. Use the same `type` and `slug` in the route path.
5. Confirm the timeline's `detailType` matches the JSON file's type.

For a new content type, add another `TimeLine` instance in `App.tsx` and provide a corresponding JSON file and Markdown directory.

## Important Rules

- Keep timeline descriptions concise; put the full story in Markdown.
- Do not rename a slug after publishing a link unless you also update its references.
- Keep JSON valid: use double quotes and no comments.
- Keep Markdown filenames lowercase and hyphenated.
- Do not put secrets or private personal data in public JSON or Markdown files.
