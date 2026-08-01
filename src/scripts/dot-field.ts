/**
 * The dot field: a full page canvas sitting behind the content.
 *
 * The grid is drawn in viewport coordinates, while its opacity follows the
 * position on the page: full strength across the hero, very low through the
 * reading sections, fading to nothing at the bottom.
 *
 * The loop only runs while something is actually moving. Once the pointer
 * settles and every pulse has decayed it stops, and no frame is requested
 * while the tab is in the background.
 */

const SPACING = 24;
const BASE_RADIUS = 1;
const MAX_RADIUS = 2.4;
const POINTER_RADIUS = 110;
const MAX_PUSH = 10;
const BASE_ALPHA = 0.5;
const QUIET_ALPHA = 0.3;
const PULSE_DURATION = 420;
const POINTER_TIMEOUT = 1500;
const BOOST_SPEED = 0.12;
const INTENSITY_SPEED = 0.06;

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Pulse {
  top: number;
  bottom: number;
  left: number;
  right: number;
  start: number;
}

interface Boost {
  element: Element;
  strength: number;
  target: number;
}

export interface DotFieldController {
  /** Global multiplier, used to bring the field up at the end of the intro. */
  setIntensity(value: number): void;
  setInteractive(enabled: boolean): void;
  /** Briefly lights up the dots behind a rect, for the trace lines. */
  pulse(rect: DOMRect): void;
  destroy(): void;
}

function parseHex(value: string): Rgb {
  const hex = value.trim().replace('#', '');
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((char) => char + char)
          .join('')
      : hex;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function createDotField(canvas: HTMLCanvasElement): DotFieldController {
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) {
    return {
      setIntensity: () => {},
      setInteractive: () => {},
      pulse: () => {},
      destroy: () => {},
    };
  }

  const ctx = context;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const darkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  let width = 0;
  let height = 0;
  let heroBottom = 0;
  let documentHeight = 0;

  let quiet: Rgb = { r: 90, g: 100, b: 112 };
  let accent: Rgb = { r: 76, g: 79, b: 224 };

  let pointerX = -9999;
  let pointerY = -9999;
  let pointerAt = 0;
  let interactive = true;

  let intensity = 1;
  let targetIntensity = 1;

  const pulses: Pulse[] = [];
  const boosts: Boost[] = [];

  let frameId = 0;
  let resizeTimer = 0;

  function readColors() {
    const styles = getComputedStyle(document.documentElement);
    quiet = parseHex(styles.getPropertyValue('--token-text-muted'));
    accent = parseHex(styles.getPropertyValue('--token-accent'));
  }

  function measure() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const hero = document.getElementById('top');
    heroBottom = hero ? hero.offsetTop + hero.offsetHeight : height;
    documentHeight = document.documentElement.scrollHeight;
  }

  /** Opacity as a function of the position on the page, not on the screen. */
  function profile(pageY: number): number {
    let value = QUIET_ALPHA;

    if (pageY <= heroBottom) {
      value = 1;
    } else if (pageY < heroBottom + 400) {
      value = 1 - (1 - QUIET_ALPHA) * ((pageY - heroBottom) / 400);
    }

    const tail = documentHeight - 700;
    if (pageY > tail) {
      value *= Math.max(0, 1 - (pageY - tail) / 700);
    }

    return value;
  }

  function pulseStrength(x: number, y: number, now: number): number {
    let strongest = 0;
    for (const pulse of pulses) {
      const age = (now - pulse.start) / PULSE_DURATION;
      if (age >= 1) continue;
      if (y < pulse.top || y > pulse.bottom || x < pulse.left || x > pulse.right) continue;
      strongest = Math.max(strongest, 1 - age);
    }
    return strongest;
  }

  function draw(now: number) {
    ctx.clearRect(0, 0, width, height);

    const scrollY = window.scrollY;
    const pointerLive = interactive && now - pointerAt < POINTER_TIMEOUT;

    // The plain dots all share a colour, so they go down in a single pass.
    // Only the dots the pointer is touching need their own fill.
    const highlights: { x: number; y: number; radius: number; alpha: number; mix: number }[] = [];

    ctx.fillStyle = `rgb(${quiet.r} ${quiet.g} ${quiet.b})`;

    for (let y = 0; y < height + SPACING; y += SPACING) {
      const alpha = BASE_ALPHA * profile(scrollY + y) * intensity;
      if (alpha <= 0.002) continue;

      for (let x = 0; x < width + SPACING; x += SPACING) {
        let drawX = x;
        let drawY = y;
        let radius = BASE_RADIUS;
        let mix = 0;
        let dotAlpha = alpha;

        if (pointerLive) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance < POINTER_RADIUS && distance > 0.001) {
            const strength = 1 - distance / POINTER_RADIUS;
            const push = strength * MAX_PUSH;
            drawX += (dx / distance) * push;
            drawY += (dy / distance) * push;
            radius = BASE_RADIUS + strength * (MAX_RADIUS - BASE_RADIUS);
            mix = strength;
            dotAlpha = Math.min(1, alpha + strength * 0.5);
          }
        }

        const pulsed = pulseStrength(x, y, now);
        if (pulsed > 0) {
          mix = Math.max(mix, pulsed);
          radius = Math.max(radius, BASE_RADIUS + pulsed * (MAX_RADIUS - BASE_RADIUS));
          dotAlpha = Math.min(1, dotAlpha + pulsed * 0.6);
        }

        if (mix > 0.01) {
          highlights.push({ x: drawX, y: drawY, radius, alpha: dotAlpha, mix });
          continue;
        }

        ctx.globalAlpha = dotAlpha;
        ctx.fillRect(drawX - radius, drawY - radius, radius * 2, radius * 2);
      }
    }

    // Extra dots on the half grid under whatever the pointer is hovering,
    // so the field reads as denser there.
    for (const boost of boosts) {
      if (boost.strength <= 0.01) continue;
      const rect = boost.element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > height) continue;

      const alpha = BASE_ALPHA * profile(scrollY + rect.top) * intensity * boost.strength;
      ctx.globalAlpha = alpha;

      const startX = Math.ceil((rect.left - SPACING / 2) / SPACING) * SPACING + SPACING / 2;
      const startY = Math.ceil((rect.top - SPACING / 2) / SPACING) * SPACING + SPACING / 2;

      for (let y = startY; y < rect.bottom; y += SPACING) {
        for (let x = startX; x < rect.right; x += SPACING) {
          ctx.fillRect(x - BASE_RADIUS, y - BASE_RADIUS, BASE_RADIUS * 2, BASE_RADIUS * 2);
        }
      }
    }

    for (const dot of highlights) {
      const r = Math.round(quiet.r + (accent.r - quiet.r) * dot.mix);
      const g = Math.round(quiet.g + (accent.g - quiet.g) * dot.mix);
      const b = Math.round(quiet.b + (accent.b - quiet.b) * dot.mix);
      ctx.globalAlpha = dot.alpha;
      ctx.fillStyle = `rgb(${r} ${g} ${b})`;
      ctx.fillRect(dot.x - dot.radius, dot.y - dot.radius, dot.radius * 2, dot.radius * 2);
    }

    ctx.globalAlpha = 1;
  }

  function settle(now: number): boolean {
    let moving = false;

    if (Math.abs(intensity - targetIntensity) > 0.005) {
      intensity += (targetIntensity - intensity) * INTENSITY_SPEED;
      moving = true;
    } else {
      intensity = targetIntensity;
    }

    for (const boost of boosts) {
      if (Math.abs(boost.strength - boost.target) > 0.005) {
        boost.strength += (boost.target - boost.strength) * BOOST_SPEED;
        moving = true;
      } else {
        boost.strength = boost.target;
      }
    }

    for (let index = pulses.length - 1; index >= 0; index -= 1) {
      if (now - pulses[index].start > PULSE_DURATION) pulses.splice(index, 1);
      else moving = true;
    }

    if (interactive && now - pointerAt < POINTER_TIMEOUT) moving = true;

    return moving;
  }

  function frame(now: number) {
    frameId = 0;
    const moving = settle(now);
    draw(now);
    if (moving) schedule();
  }

  function schedule() {
    if (frameId || document.hidden) return;
    frameId = requestAnimationFrame(frame);
  }

  function redraw() {
    if (reducedMotion.matches) {
      draw(performance.now());
      return;
    }
    schedule();
  }

  function onPointerMove(event: PointerEvent) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    pointerAt = performance.now();
    schedule();
  }

  function onPointerLeave() {
    pointerAt = 0;
    schedule();
  }

  function onScroll() {
    redraw();
  }

  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      measure();
      redraw();
    }, 150);
  }

  function onVisibility() {
    if (document.hidden) {
      // Drop the queued frame rather than leaving it pending: a frame id that
      // never clears would block every later schedule() call.
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      return;
    }
    schedule();
  }

  function onScheme() {
    readColors();
    redraw();
  }

  function onBoostEnter(event: Event) {
    const boost = boosts.find((item) => item.element === event.currentTarget);
    if (boost) {
      boost.target = 1;
      schedule();
    }
  }

  function onBoostLeave(event: Event) {
    const boost = boosts.find((item) => item.element === event.currentTarget);
    if (boost) {
      boost.target = 0;
      schedule();
    }
  }

  readColors();
  measure();

  const boostElements = Array.from(document.querySelectorAll('[data-field-boost]'));

  if (reducedMotion.matches) {
    // Drawn once and left alone: no pointer, no pulses, no loop.
    intensity = 1;
    targetIntensity = 1;
    draw(performance.now());
  } else {
    for (const element of boostElements) {
      boosts.push({ element, strength: 0, target: 0 });
      element.addEventListener('pointerenter', onBoostEnter);
      element.addEventListener('pointerleave', onBoostLeave);
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    schedule();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  darkScheme.addEventListener('change', onScheme);

  return {
    setIntensity(value: number) {
      targetIntensity = value;
      if (reducedMotion.matches) {
        intensity = value;
        draw(performance.now());
        return;
      }
      schedule();
    },

    setInteractive(enabled: boolean) {
      interactive = enabled;
      schedule();
    },

    pulse(rect: DOMRect) {
      if (reducedMotion.matches) return;
      pulses.push({
        top: rect.top - SPACING,
        bottom: rect.bottom + SPACING,
        left: rect.left - SPACING,
        right: rect.right + SPACING,
        start: performance.now(),
      });
      schedule();
    },

    destroy() {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      darkScheme.removeEventListener('change', onScheme);
      for (const element of boostElements) {
        element.removeEventListener('pointerenter', onBoostEnter);
        element.removeEventListener('pointerleave', onBoostLeave);
      }
    },
  };
}
