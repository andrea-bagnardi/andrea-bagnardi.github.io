/**
 * Scroll behaviour: staggered reveals per section, the one animated number on
 * the page, and the method diagram drawing itself.
 *
 * Nothing here hides anything up front. Every starting state is applied as its
 * section approaches the viewport and never at load, so a script that fails to
 * arrive leaves the page exactly as authored rather than blank.
 */

const REVEAL_DISTANCE = 24;
const REVEAL_DURATION = 0.5;
const REVEAL_STAGGER = 0.08;
const START = 'top 82%';

/** Pen speed for the method diagram, in px per second, and its shortest beat. */
const TRACE_SPEED = 1600;
const MIN_SEGMENT = 0.1;
/** Corner radius of the boxes, and where the connector meets them. */
const OUTLINE_RADIUS = 8;
const OUTLINE_ENTRY = 24;

export async function initScrollEffects(): Promise<void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  await setUpSmoothScroll(gsap, ScrollTrigger);

  revealSections(gsap);
  animateCounters(gsap);
  drawDiagram(gsap, ScrollTrigger);

  // Trigger positions are measured from the laid out page. Web fonts landing
  // late would shift everything underneath them.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/** Lenis on pointer devices only: on touch it fights the native scroll. */
async function setUpSmoothScroll(
  gsap: typeof import('gsap').gsap,
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger,
): Promise<void> {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const { default: Lenis } = await import('lenis');
  const lenis = new Lenis({ duration: 1.1 });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // In page anchors have to go through Lenis, or they jump while it animates.
  for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement);
    });
  }
}

function revealSections(gsap: typeof import('gsap').gsap): void {
  for (const section of document.querySelectorAll<HTMLElement>('main > section')) {
    const targets = section.querySelectorAll<HTMLElement>('[data-reveal]');
    if (targets.length === 0) continue;

    gsap.from(targets, {
      opacity: 0,
      y: REVEAL_DISTANCE,
      duration: REVEAL_DURATION,
      stagger: REVEAL_STAGGER,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: START, once: true },
    });
  }
}

function animateCounters(gsap: typeof import('gsap').gsap): void {
  // The thousands separator follows the page, not the machine: the same number
  // is 100.000 in Italian and 100,000 in English, and the static markup has
  // already committed to one of them.
  const format = new Intl.NumberFormat(document.documentElement.lang || 'it');

  for (const element of document.querySelectorAll<HTMLElement>('[data-counter]')) {
    const target = Number(element.dataset.counter);
    if (!Number.isFinite(target)) continue;

    const state = { value: 0 };

    gsap.to(state, {
      value: target,
      duration: 1.6,
      ease: 'power2.out',
      snap: { value: 1 },
      onUpdate: () => {
        element.textContent = format.format(state.value);
      },
      scrollTrigger: { trigger: element, start: 'top 90%', once: true },
    });
  }
}

type OutlineEdge = 'left' | 'top';

/** A segment of the trace lasts as long as its own length, never less. */
function segment(length: number): number {
  return Math.max(MIN_SEGMENT, length / TRACE_SPEED);
}

/**
 * The perimeter of a box, as a path that starts where the connector lands
 * rather than at a corner, so the pen carries on from the line it has just
 * drawn. `pathLength` normalises the dash maths, which keeps the timeline
 * independent of the measured size: the shape can be rebuilt on a resize
 * without rebuilding the animation.
 */
function outlinePath(width: number, height: number, edge: OutlineEdge): string {
  const r = Math.min(OUTLINE_RADIUS, width / 2, height / 2);
  const span = edge === 'left' ? height : width;
  const entry = Math.min(Math.max(OUTLINE_ENTRY, r), span - r);

  const topLeft = `A ${r} ${r} 0 0 1 ${r} 0`;
  const topRight = `A ${r} ${r} 0 0 1 ${width} ${r}`;
  const bottomRight = `A ${r} ${r} 0 0 1 ${width - r} ${height}`;
  const bottomLeft = `A ${r} ${r} 0 0 1 0 ${height - r}`;

  if (edge === 'left') {
    return `M 0 ${entry} L 0 ${r} ${topLeft} L ${width - r} 0 ${topRight} L ${width} ${height - r} ${bottomRight} L ${r} ${height} ${bottomLeft} L 0 ${entry}`;
  }

  return `M ${entry} 0 L ${width - r} 0 ${topRight} L ${width} ${height - r} ${bottomRight} L ${r} ${height} ${bottomLeft} L 0 ${r} ${topLeft} L ${entry} 0`;
}

function drawDiagram(
  gsap: typeof import('gsap').gsap,
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger,
): void {
  const diagram = document.querySelector<HTMLElement>('[data-diagram]');
  if (!diagram) return;

  const phases = Array.from(diagram.querySelectorAll<HTMLElement>('[data-phase]'));
  if (phases.length === 0) return;

  // The connectors run horizontally while the diagram sits on one row and
  // vertically once it stacks, which decides which edge the pen enters by.
  // Read from the breakpoint rather than from the measured elements: at the
  // moment this runs the boxes are laid out, but their own size is not yet
  // the answer to the question being asked.
  const oneRow = window.matchMedia('(min-width: 48rem)');
  const horizontal = () => oneRow.matches;
  const edge = (): OutlineEdge => (horizontal() ? 'left' : 'top');

  const traced: { svg: SVGElement; rect: SVGRectElement; path: SVGPathElement }[] = [];

  /** One phase, measured while it is still at its full size. */
  interface Step {
    connector: { element: HTMLElement; duration: number } | null;
    outline: { path: SVGPathElement; duration: number } | null;
    badges: HTMLElement[];
    text: HTMLElement | null;
  }

  const steps: Step[] = [];
  const connectors: HTMLElement[] = [];
  const paths: SVGPathElement[] = [];
  const badges: HTMLElement[] = [];
  const texts: HTMLElement[] = [];

  // First pass: read the geometry. Durations have to be taken now, before
  // anything is scaled to nothing, or a collapsed connector would measure zero.
  for (const phase of phases) {
    const connector = phase.querySelector<HTMLElement>('[data-connector]');
    const svg = phase.querySelector<SVGElement>('[data-phase-outline]');
    const rect = svg?.querySelector('rect') ?? null;
    const text = phase.querySelector<HTMLElement>('[data-phase-text]');
    // The name of the phase and, on the gate, its mark: both belong to the box
    // that has just closed, so neither is left hanging in an empty row.
    const phaseBadges = [
      phase.querySelector<HTMLElement>('[data-phase-label]'),
      phase.querySelector<HTMLElement>('[data-phase-mark]'),
    ].filter((badge): badge is HTMLElement => badge !== null);

    const step: Step = { connector: null, outline: null, badges: phaseBadges, text };

    if (connector) {
      const box = connector.getBoundingClientRect();
      step.connector = { element: connector, duration: segment(Math.max(box.width, box.height)) };
      connectors.push(connector);
    }

    if (svg && rect) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('pathLength', '100');
      const box = svg.getBoundingClientRect();
      path.setAttribute('d', outlinePath(box.width, box.height, edge()));
      svg.append(path);
      // Undrawn the two are the same outline, so the swap is invisible.
      rect.style.display = 'none';
      traced.push({ svg, rect, path });
      paths.push(path);
      step.outline = { path, duration: segment(path.getTotalLength()) };
    }

    badges.push(...phaseBadges);
    if (text) texts.push(text);
    steps.push(step);
  }

  const shape = () => {
    for (const { svg, path } of traced) {
      const box = svg.getBoundingClientRect();
      path.setAttribute('d', outlinePath(box.width, box.height, edge()));
    }
  };

  const hide = () => {
    gsap.set(connectors, {
      scaleX: horizontal() ? 0 : 1,
      scaleY: horizontal() ? 1 : 0,
      transformOrigin: horizontal() ? 'left center' : 'center top',
    });
    gsap.set(paths, { strokeDasharray: 100, strokeDashoffset: 100 });
    gsap.set(badges, { opacity: 0 });
    gsap.set(texts, { opacity: 0, y: 8 });
  };

  // Cleared now, while the diagram is still far below the fold, and not when
  // its trigger fires: by then the section is already on screen, and wiping it
  // in front of the reader to draw it again is the one thing this animation
  // must not do. With reduced motion or without JavaScript none of this runs
  // and the diagram is simply the finished one.
  hide();

  let started = false;

  const timeline = gsap.timeline({
    scrollTrigger: { trigger: diagram, start: START, once: true },
    onStart: () => {
      started = true;
    },
    onComplete: () => {
      // Give the outline back to the rect, which is the one that survives a
      // resize: the traced path is measured in pixels and would not.
      for (const { rect, path } of traced) {
        path.remove();
        rect.style.removeProperty('display');
      }
    },
  });

  // One playhead for the trace. The text is placed on the timeline at an
  // absolute time instead of being appended, so the pen never waits for it.
  let at = 0;

  for (const step of steps) {
    if (step.connector) {
      const { element, duration } = step.connector;
      timeline.to(element, { scaleX: 1, scaleY: 1, duration, ease: 'none' }, at);
      at += duration;
    }

    if (step.outline) {
      const { path, duration } = step.outline;
      timeline.to(path, { strokeDashoffset: 0, duration, ease: 'none' }, at);
      // Back to a plain stroke, so no dash seam is left on the closing corner.
      timeline.set(path, { strokeDasharray: 'none' }, at + duration);
      at += duration;
    }

    for (const badge of step.badges) {
      timeline.to(badge, { opacity: 1, duration: 0.25 }, at);
    }

    if (step.text) {
      timeline.to(step.text, { opacity: 1, y: 0, duration: 0.3 }, at);
    }
  }

  // A resize before the diagram is reached would leave the paths cut to the old
  // width, and a diagram that has just stacked would be hiding the wrong axis
  // of its connectors. Once it has started, hands off: re-hiding halfway
  // through would undo what has been drawn.
  ScrollTrigger.addEventListener('refresh', () => {
    if (started) return;
    shape();
    hide();
  });
}
