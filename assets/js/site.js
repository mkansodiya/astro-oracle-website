// AstroOracle site: the nav over the dark bands, scroll reveals, and the hero loop.
(function () {
  var nav = document.getElementById('nav');
  var dark = document.querySelector('.tour') || document.querySelector('.hero');

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('stuck', window.scrollY > 8);
    if (dark) {
      // Dark bar while the hero and the tour are under it, the light one after.
      var end = dark.offsetTop + dark.offsetHeight - nav.offsetHeight;
      nav.classList.toggle('nav--night', window.scrollY < end);
    }
  }
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduced) {
    reveals.forEach(function (node) { node.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (node) { io.observe(node); });
  }

  // The hero loop plays only while it is on screen, and never for reduced motion:
  // the poster already shows the finished answer.
  var video = document.getElementById('hero-video');
  if (video && !reduced && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var playing = video.play();
          if (playing && playing.catch) playing.catch(function () {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 }).observe(video);
  }
})();
