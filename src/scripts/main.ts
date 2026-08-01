import { createDotField, type DotFieldController } from './dot-field';
import { playHeroIntro } from './hero-intro';

const canvas = document.querySelector<HTMLCanvasElement>('[data-dot-field]');

let field: DotFieldController | null = null;
if (canvas) {
  canvas.hidden = false;
  field = createDotField(canvas);
}

void playHeroIntro(field);
