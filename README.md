# snippit

snippit is a developer-focused documentation assistant that helps you understand programming languages, frameworks, and libraries through clear summaries and direct links to trusted sources. Powered by the [Exa API](https://exa.ai), it delivers multiple relevant answers in a clean, focused interface, saving you time by cutting through long, overwhelming documentation pages.

![Screenshot 2025-04-12 203300](https://github.com/user-attachments/assets/2c376cbe-a155-4c1f-ace5-39614f48f0cb)

*returns beginner-friendly explanations and official documentation links.*

## Features

- Natural-language search for docs (e.g. *"how do I use a custom colour in Tailwind?"*)
- Summaries help to find the right piece of documentation
- Toggleable markdown previews from official docs (+ their link)
- Light/dark/auto theme support
- Built with Next.js, TypeScript, and Tailwind CSS

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS + Tailwind Typography
- **Markdown Rendering**: react-markdown + remark-gfm
- **Docs Search**: [Exa API](https://exa.ai)
- **Language**: TypeScript

## Project Structure (WIP)

```bash
src/
  ├── app/
  │   ├── page.tsx        # Main UI (search + results)
  │   └── api/
  │       └── search/     # API route calling Exa search
  ├── components/
  └── styles/
      └── globals.css
