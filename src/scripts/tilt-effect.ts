export function initTiltEffect(selector: string) {
  let isScrolling = false;
  let scrollTimeout: number | null = null;
  const cards: HTMLElement[] = [];

  function resetCard(card: HTMLElement) {
    card.style.removeProperty('--tx');
    card.style.removeProperty('--ty');
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
    card.style.removeProperty('--scale');
  }

  window.addEventListener('scroll', () => {
    isScrolling = true;
    cards.forEach(resetCard);
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  }, { passive: true });

  document.querySelectorAll(selector).forEach((el) => {
    const card = el as HTMLElement;
    cards.push(card);
    let rafId: number | null = null;

    card.addEventListener('mousemove', (e) => {
      if (rafId || isScrolling) return;

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const centerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const centerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        card.style.setProperty('--tx', `${centerX * 1}px`);
        card.style.setProperty('--ty', `${centerY * 1 - 3}px`);
        card.style.setProperty('--rx', `${centerY * 4}deg`);
        card.style.setProperty('--ry', `${-centerX * 4}deg`);
        card.style.setProperty('--scale', '1.06');
        rafId = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      resetCard(card);
    });
  });
}
