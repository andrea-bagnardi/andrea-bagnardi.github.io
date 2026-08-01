import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { content } from '../data';
import { dotFieldSvg, loadFont, readPalette } from '../lib/brand';

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * The share image, rendered during the build from the same palette, fonts and
 * copy as the page itself. Satori only reads woff, so the display face comes
 * from the static @fontsource package rather than the variable one the site
 * loads; both are Bricolage Grotesque.
 */
export const GET: APIRoute = async () => {
  const palette = readPalette();

  const dots = dotFieldSvg({
    width: WIDTH,
    height: HEIGHT,
    spacing: 30,
    radius: 1.5,
    color: palette['text-muted'],
    opacity: 0.28,
  });

  const markup = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: palette.bg,
        backgroundImage: `url(data:image/svg+xml;base64,${Buffer.from(dots).toString('base64')})`,
        padding: '84px 96px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Bricolage Grotesque',
              fontWeight: 600,
              fontSize: 92,
              letterSpacing: '-0.02em',
              color: palette.text,
            },
            children: content.hero.name,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: 28,
              fontFamily: 'Inter Tight',
              fontSize: 40,
              lineHeight: 1.3,
              color: palette.text,
              maxWidth: 820,
            },
            children: content.hero.positioning,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: 40,
              width: 128,
              height: 3,
              backgroundColor: palette.accent,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: 40,
              fontFamily: 'JetBrains Mono',
              fontSize: 24,
              color: palette['text-muted'],
            },
            children: 'andrea-bagnardi.github.io',
          },
        },
      ],
    },
  };

  const svg = await satori(markup as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: 'Bricolage Grotesque',
        data: loadFont(
          '@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff',
        ),
        weight: 600,
        style: 'normal',
      },
      {
        name: 'Inter Tight',
        data: loadFont('@fontsource/inter-tight/files/inter-tight-latin-400-normal.woff'),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'JetBrains Mono',
        data: loadFont('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff'),
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
