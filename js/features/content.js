// Frame content feature module.
// Change TOC_COLLAPSE_DELAY to tune delayed auto-collapse (milliseconds).
document.addEventListener('DOMContentLoaded', function () {
  var TOC_COLLAPSE_DELAY = 250;
  var toc = document.getElementById('floating-toc');
  if (!toc) return;

  document.body.classList.add('has-post-toc');
  var panel = toc.querySelector('.post-toc-panel');
  var pin = toc.querySelector('.toc-pin');
  var entries = Array.prototype.slice.call(toc.querySelectorAll('.toc-entries a'));
  var collapseTimer;
  var headings = entries.map(function (link) {
    return document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
  }).filter(Boolean);

  function setActive(index) {
    entries.forEach(function (item, i) { item.classList.toggle('toc-active', i === index); });
  }
  function openToc(open) {
    toc.classList.toggle('is-open', open);
    document.body.classList.toggle('toc-is-open', open);
    if (!open) document.body.classList.remove('toc-is-pinned');
    panel.setAttribute('aria-hidden', String(!open));
  }
  function cancelCollapse() { window.clearTimeout(collapseTimer); }

  pin.setAttribute('aria-pressed', 'false');
  pin.addEventListener('click', function () {
    var pinned = !toc.classList.contains('is-pinned');
    toc.classList.toggle('is-pinned', pinned);
    document.body.classList.toggle('toc-is-pinned', pinned);
    pin.setAttribute('aria-pressed', String(pinned));
  });
  entries.forEach(function (link, index) {
    link.addEventListener('click', function () { setActive(index); });
  });
  if (window.IntersectionObserver) {
    var observer = new IntersectionObserver(function (records) {
      records.forEach(function (record) {
        if (record.isIntersecting) setActive(headings.indexOf(record.target));
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    headings.forEach(function (heading) { observer.observe(heading); });
  }
  toc.addEventListener('mouseenter', function () {
    cancelCollapse();
    if (!toc.classList.contains('is-open')) openToc(true);
  });
  toc.addEventListener('mouseleave', function () {
    if (toc.classList.contains('is-open') && !toc.classList.contains('is-pinned')) {
      cancelCollapse();
      collapseTimer = window.setTimeout(function () { openToc(false); }, TOC_COLLAPSE_DELAY);
    }
  });
  setActive(0);
});
