import type { APIRoute } from 'astro';
import { Resvg } from '@resvg/resvg-js';

import { dotFieldSvg, readPalette } from '../lib/brand';

const SIZE = 180;

/** The favicon motif at touch icon size, on an opaque background. */
export const GET: APIRoute = async () => {
  const palette = readPalette();

  // Same three by three arrangement as favicon.svg, with the lit dot in the
  // same place: the two have to read as one mark.
  const field = dotFieldSvg({
    width: SIZE,
    height: SIZE,
    spacing: 50,
    radius: 9,
    color: palette['text-muted'],
    opacity: 0.55,
    highlight: { column: 1, row: 2, color: palette.accent, radius: 19 },
  });

  const svg = field.replace(
    '>',
    `><rect width="${SIZE}" height="${SIZE}" fill="${palette.surface}"/>`,
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: SIZE } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
