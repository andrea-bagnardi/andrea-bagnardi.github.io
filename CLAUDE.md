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

## Design tokens

Defined in `src/styles/tokens.css`. Tailwind's own colour, font, type, radius
and container scales are wiped there, so only the values below exist: writing
`bg-blue-500` or `text-2xl` produces nothing.

### Palette

| Token         | Utility            | Light     | Dark      |
| ------------- | ------------------ | --------- | --------- |
| `bg`          | `bg-bg`            | `#F5F6F7` | `#0F1216` |
| `surface`     | `bg-surface`       | `#FFFFFF` | `#171B21` |
| `text`        | `text-text`        | `#14181D` | `#EDEFF2` |
| `text-muted`  | `text-text-muted`  | `#5A6470` | `#98A2AE` |
| `accent`      | `text-accent`      | `#4C4FE0` | `#7B7EF0` |
| `signal`      | `text-signal`      | `#B4740C` | `#E0A03A` |
| `border`      | `border-border`    | derived from `text-muted` at 22% |     |

Two accents only. Indigo for interactive elements and the active dot field,
amber strictly for key numbers and trace states. The theme follows
`prefers-color-scheme`; `[data-theme="light"|"dark"]` hooks on `<html>` are in
place should a manual switch ever be added.

Amber on the light background reaches 3.6:1, so it clears AA for large text
only. In the light theme use it at 24px or above, or bold at 19px or above.

### Typography

Self-hosted woff2, latin subset, `font-display: swap`.

| Family    | Utility        | Weights   | Use                              |
| --------- | -------------- | --------- | -------------------------------- |
| Bricolage Grotesque (variable, weight axis) | `font-display` | 500, 600 | hero name, section titles |
| Inter Tight | `font-sans`  | 400, 500  | body text                        |
| JetBrains Mono | `font-mono` | 400     | log lines, tech tags, numbers    |

| Step      | Utility        | Size                          |
| --------- | -------------- | ----------------------------- |
| display   | `text-display` | `clamp(2.5rem, 9vw, 6rem)` — 40px to 96px |
| h2        | `text-h2`      | `clamp(1.75rem, 4vw, 2.5rem)` — 28px to 40px |
| h3        | `text-h3`      | 20px                          |
| lead      | `text-lead`    | 18px                          |
| body      | `text-body`    | 16px                          |
| small     | `text-small`   | 14px                          |
| mono      | `text-mono`    | 14px                          |

### Layout

- `max-w-content` — 1100px centre column
- `py-section` — `clamp(5rem, 12vw, 9rem)` vertical rhythm between sections
- `rounded-sm` 4px, `rounded-md` 8px, and nothing larger
- Hairline borders, never shadows
- Spacing otherwise uses Tailwind's default 4px-based scale