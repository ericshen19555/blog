(function() {
  const params = new URLSearchParams(window.location.search);
  const debugEnabled = document.body.dataset.imageDebugEnabled === 'true';
  const debug = debugEnabled && params.get('imageDebug') === '1';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const images = document.querySelectorAll('.cimg');

  function loadFullImage(container) {
    const image = container.querySelector('.cimg-full');
    if (!image || image.dataset.loading === 'true' || image.dataset.loaded === 'true') return;

    image.dataset.loading = 'true';
    image.classList.add('cimg-reveal');

    let previewHideTimer;
    const hidePreviewAfterBuffer = () => {
      if (previewHideTimer) return;
      previewHideTimer = window.setTimeout(() => {
        container.classList.add('has-full-image');
      }, 120);
    };

    image.addEventListener('load', () => {
      image.dataset.loaded = 'true';
      image.dataset.loading = 'false';
      if (container.dataset.imageAnimation === '0' || prefersReducedMotion.matches) {
        image.classList.add('is-loaded');
        container.classList.add('has-full-image');
        return;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        image.classList.add('is-loaded');
        image.addEventListener('transitionend', event => {
          if (event.target === image && event.propertyName === 'opacity') {
            hidePreviewAfterBuffer();
          }
        });
        window.setTimeout(hidePreviewAfterBuffer, 650);
      }));
    }, { once: true });
    image.addEventListener('error', () => {
      image.dataset.loading = 'false';
    }, { once: true });
    image.src = image.dataset.src;
  }

  images.forEach(container => {
    if (debug) {
      container.tabIndex = 0;
      container.setAttribute('role', 'button');
      container.setAttribute('aria-label', `Load full-resolution image: ${container.dataset.imageAlt || 'image'}`);
      container.addEventListener('click', () => loadFullImage(container));
      container.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          loadFullImage(container);
        }
      });
    }
  });

  if (debug) return;
  if (!('IntersectionObserver' in window)) {
    images.forEach(container => loadFullImage(container));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      loadFullImage(entry.target);
    });
  }, { rootMargin: '1000px 0px', threshold: 0 });

  images.forEach(container => observer.observe(container));
})();
