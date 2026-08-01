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
  drawDiagram(gsap);

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
  const format = new Intl.NumberFormat('it-IT');

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

function drawDiagram(gsap: typeof import('gsap').gsap): void {
  const diagram = document.querySelector<HTMLElement>('[data-diagram]');
  if (!diagram) return;

  const phases = Array.from(diagram.querySelectorAll<HTMLElement>('[data-phase]'));
  if (phases.length === 0) return;

  const timeline = gsap.timeline({
    scrollTrigger: { trigger: diagram, start: START, once: true },
  });

  for (const phase of phases) {
    const connector = phase.querySelector<HTMLElement>('[data-connector]');
    const outline = phase.querySelector<SVGRectElement>('[data-phase-outline] rect');
    const label = phase.querySelector<HTMLElement>('[data-phase-label]');
    const text = phase.querySelector<HTMLElement>('[data-phase-text]');

    // Every starting state below is deferred with immediateRender: false, so
    // it lands when the trigger fires rather than at load. A diagram that is
    // never reached stays readable instead of turning into four empty boxes.
    if (connector) {
      // Horizontal on desktop, vertical once the diagram stacks.
      const rect = connector.getBoundingClientRect();
      const horizontal = rect.width > rect.height;
      gsap.set(connector, { transformOrigin: horizontal ? 'left center' : 'center top' });
      timeline.fromTo(connector, horizontal ? { scaleX: 0 } : { scaleY: 0 }, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.15,
        ease: 'none',
        immediateRender: false,
      });
    }

    if (outline) {
      // The dash pattern alone changes nothing while the offset is zero.
      const length = outline.getTotalLength();
      gsap.set(outline, { strokeDasharray: length });
      timeline.fromTo(
        outline,
        { strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut', immediateRender: false },
      );
      // Back to a plain stroke, so a resize cannot leave a stale dash pattern.
      timeline.set(outline, { strokeDasharray: 'none' });
    }

    if (label) {
      timeline.fromTo(
        label,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, immediateRender: false },
        '<-0.15',
      );
    }

    if (text) {
      timeline.fromTo(
        text,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, immediateRender: false },
        '<',
      );
    }
  }
}
