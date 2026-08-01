import { createDotField, type DotFieldController } from './dot-field';
import { playHeroIntro } from './hero-intro';
import { initPreviews } from './previews';

const canvas = document.querySelector<HTMLCanvasElement>('[data-dot-field]');

let field: DotFieldController | null = null;
if (canvas) {
  canvas.hidden = false;
  field = createDotField(canvas);
}

initPreviews();

void (async () => {
  // Resolves once the sequence has been built, not once it has finished, so
  // the scroll effects are wired up while the hero is still playing.
  await playHeroIntro(field);

  const { initScrollEffects } = await import('./scroll-effects');
  await initScrollEffects();
})();
