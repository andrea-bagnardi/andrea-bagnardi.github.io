/**
 * Build time helpers for the generated artwork: the share image and the
 * touch icon.
 *
 * The palette is read out of tokens.css rather than repeated here, so the
 * artwork cannot drift away from the site. Runs in Node during the build and
 * ships nothing to the browser.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Resolved from the project root rather than from import.meta.url: these
// modules are bundled into dist before they run, and a relative path would
// point at the bundle instead of the sources.
const root = process.cwd();
const TOKENS = join(root, 'src/styles/tokens.css');

export type PaletteName = 'bg' | 'surface' | 'text' | 'text-muted' | 'accent' | 'signal';

/** Reads the light theme values, which are the ones declared on :root. */
export function readPalette(): Record<PaletteName, string> {
  const css = readFileSync(TOKENS, 'utf8');
  const root = css.slice(css.indexOf(':root'), css.indexOf('@media'));

  const read = (name: PaletteName): string => {
    const match = root.match(new RegExp(`--token-${name}:\\s*(#[0-9a-f]{3,8})`, 'i'));
    if (!match) throw new Error(`Token --token-${name} not found in tokens.css`);
    return match[1];
  };

  return {
    bg: read('bg'),
    surface: read('surface'),
    text: read('text'),
    'text-muted': read('text-muted'),
    accent: read('accent'),
    signal: read('signal'),
  };
}

export function loadFont(specifier: string): Buffer {
  return readFileSync(join(root, 'node_modules', specifier));
}

interface DotFieldOptions {
  width: number;
  height: number;
  spacing: number;
  radius: number;
  color: string;
  opacity: number;
  /** Grid position of the single dot picked out in the accent colour. */
  highlight?: { column: number; row: number; color: string; radius: number };
}

/** The signature motif, as a standalone svg. */
export function dotFieldSvg(options: DotFieldOptions): string {
  const { width, height, spacing, radius, color, opacity, highlight } = options;
  const dots: string[] = [];

  const columns = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);
  const offsetX = (width - (columns - 1) * spacing) / 2;
  const offsetY = (height - (rows - 1) * spacing) / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const isHighlight = highlight && highlight.column === column && highlight.row === row;
      const x = offsetX + column * spacing;
      const y = offsetY + row * spacing;
      dots.push(
        isHighlight
          ? `<circle cx="${x}" cy="${y}" r="${highlight.radius}" fill="${highlight.color}"/>`
          : `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="${opacity}"/>`,
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${dots.join('')}</svg>`;
}
