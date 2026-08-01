/**
 * The hero sequence, under two and a half seconds and once per session.
 *
 * The page is authored in its final state: the CSS only hides the pieces while
 * <html> carries data-intro="pending", which an inline script in the head sets
 * before the first paint. So with JavaScript off, with reduced motion on, or on
 * a second visit within the session, the hero is simply there.
 */

import type { DotFieldController } from './dot-field';

const SESSION_KEY = 'hero-intro';
const LINE_STEP = 0.14;
const GSAP_TIMEOUT = 1200;

export async function playHeroIntro(field: DotFieldController | null): Promise<void> {
  const root = document.documentElement;

  if (root.dataset.intro !== 'pending') {
    field?.setIntensity(1);
    return;
  }

  const trace = document.querySelector<HTMLElement>('[data-trace]');
  const lines = Array.from(document.querySelectorAll<HTMLElement>('[data-trace-line]'));
  const mask = document.querySelector<HTMLElement>('[data-intro-mask]');
  const fades = Array.from(document.querySelectorAll<HTMLElement>('[data-intro-fade]'));

  const finish = () => {
    root.dataset.intro = 'done';
    try {
      sessionStorage.setItem(SESSION_KEY, 'done');
    } catch {
      // Private browsing can refuse the write; the sequence still ran.
    }
    field?.setIntensity(1);
    field?.setInteractive(true);
  };

  if (!trace || !mask || lines.length === 0) {
    finish();
    return;
  }

  field?.setIntensity(0.15);
  field?.setInteractive(false);

  let gsap;
  try {
    // Loaded here rather than up front: nothing above the fold waits on it.
    // If it takes too long the hero simply appears in its final state.
    const loaded = await Promise.race([
      import('gsap').then((module) => module.gsap),
      new Promise<null>((resolve) => window.setTimeout(() => resolve(null), GSAP_TIMEOUT)),
    ]);
    gsap = loaded;
  } catch {
    gsap = null;
  }

  if (!gsap) {
    finish();
    return;
  }

  // Scrolling away ends the sequence immediately, at its final state.
  const skip = () => {
    if (window.scrollY > 0) timeline.progress(1);
  };

  const timeline = gsap.timeline({
    onComplete: () => {
      window.removeEventListener('scroll', skip);
      // The marker goes first: clearing the inline styles while the document
      // still reads as pending would hand the elements back to the CSS that
      // hides them.
      finish();
      gsap.set([mask, ...fades], { clearProps: 'all' });
    },
  });

  window.addEventListener('scroll', skip, { once: true, passive: true });

  // 1. The log lines arrive one at a time, each lighting the dots behind it.
  lines.forEach((line, index) => {
    const at = index * LINE_STEP;
    timeline.call(() => field?.pulse(line.getBoundingClientRect()), undefined, at);
    timeline.fromTo(
      line,
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.18, ease: 'power2.out' },
      at,
    );
  });

  const traceEnd = lines.length * LINE_STEP;
  const middle = (lines.length - 1) / 2;

  // 2. They collapse towards the centre of the block and go.
  timeline.to(
    lines,
    {
      opacity: 0,
      y: (index: number) => (middle - index) * 10,
      duration: 0.3,
      ease: 'power2.in',
    },
    traceEnd,
  );

  timeline.set(trace, { display: 'none' });

  // 3. The name is revealed from below, then the line and the rule.
  timeline.to(mask, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, traceEnd + 0.25);

  timeline.to(
    fades,
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
    traceEnd + 0.6,
  );

  // 4. The field comes up to its normal strength as the sequence lands.
  timeline.call(() => field?.setIntensity(1), undefined, traceEnd + 0.7);
}
