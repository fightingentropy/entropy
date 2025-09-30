# entropy-blog

A minimal blog built with Next.js.


## Getting Started

Run the development server (Bun):

```bash
bun install
bun run dev
```

Run the production build (Bun):

```bash
bun run build
bun run start
```

## Writing Articles

Articles are written in Markdown and stored in the `src/app/posts` directory.

To create a new article:

1. Create a new `.md` file in the `src/app/posts` directory
2. Add front matter at the top of the file:

```markdown
---
title: "Your Article Title"
excerpt: "A brief description of your article"
date: "2023-01-01"
author: "Erlin"
---

Your content goes here...
```

3. Write your content using Markdown syntax
4. Save the file - it will automatically appear in the blog

## Making Posts Private

To make a post private (not visible on the homepage but still accessible via direct URL):

1. Add `private: true` to the front matter of the post:

```markdown
---
title: "Your Private Article Title"
excerpt: "A brief description of your article"
date: "2023-01-01"
author: "Erlin"
private: true
---
```

Private posts:
- Won't appear on the homepage
- Can still be accessed by direct URL (/posts/your-post-slug)
- Will display a "Private" label next to their title
