# Project rules

Static personal portfolio site. Astro + Tailwind, static output, deployed to
GitHub Pages via GitHub Actions.

## Source of truth

The full brief lives in `docs/spec.md`. Read it before any work and follow it.
If something in a request contradicts the spec, stop and ask instead of guessing.

## Working method

- Work one phase at a time, following the phase list in the spec. Never start
  the next phase without being asked.
- Before writing code for a phase, list the choices you are about to make and
  any ambiguities you found in the spec. Wait for confirmation.
- Keep each phase in its own commit. The site must build and deploy at the end
  of every phase.

## Conventions

- All code in English: folders, files, variables, functions, classes, CSS
  classes. Italian only inside user-facing content strings.
- Content lives in `src/data/`, separated from components.
- Commit messages in English, written plainly, no AI attribution or co-author
  trailers.
- No React or other UI frameworks. Astro components and vanilla JS only.
- No external CDNs at runtime: self-host fonts and libraries.
- Colors, type scale and spacing come from the design tokens in the spec.
  Do not introduce values that are not defined there.