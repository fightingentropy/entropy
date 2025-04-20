# entropy-blog

A minimal blog built with Next.js.

Website: [fightingentropy.org](https://fightingentropy.org)

## Getting Started

Run the development server:

```bash
npm install
npm run dev
```

Run the production build:

```bash
npm run build
npm start
```

## Writing Articles

Articles are written in Markdown and stored in the `src/app/posts` directory.

To create a new article:

1. Create a new `.md` file in the `src/app/posts` directory
2. Add front matter at the top of the file:

```markdown
---
title: "Your Article Title"
date: "2023-01-01"
author: "Erlin"
---

Your content goes here...
```

3. Write your content using Markdown syntax
4. Save the file - it will automatically appear in the blog
