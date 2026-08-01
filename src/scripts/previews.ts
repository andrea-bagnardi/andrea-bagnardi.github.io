/**
 * Project preview clips. The markup ships with preload="none" and no source at
 * all, so nothing is fetched until the section is close to the viewport.
 *
 * With reduced motion the clip is never loaded and the poster frame stands in.
 */

const ROOT_MARGIN = '200px';

export function initPreviews(): void {
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-src]'));
  if (videos.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (!('IntersectionObserver' in window)) {
    for (const video of videos) load(video);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        load(entry.target as HTMLVideoElement);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: ROOT_MARGIN },
  );

  for (const video of videos) observer.observe(video);
}

function load(video: HTMLVideoElement): void {
  const source = video.dataset.src;
  if (!source || video.src) return;

  video.src = source;
  video.load();
  // Autoplay can still be refused; the poster frame remains either way.
  void video.play().catch(() => {});
}
