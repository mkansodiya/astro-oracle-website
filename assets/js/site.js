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

  // The tour: a plain link to YouTube until it is tapped, then YouTube's player in its place
  // (privacy-enhanced domain), so nothing loads from YouTube unless someone plays it.
  document.querySelectorAll('a.yt[data-yt]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(link.dataset.yt) +
        '?autoplay=1&rel=0&playsinline=1';
      frame.title = link.getAttribute('aria-label') || 'Video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      link.replaceWith(frame);
      frame.focus();
    });
  });

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
