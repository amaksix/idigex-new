(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollTrigger.normalizeScroll(true)

  // create the smooth scroller FIRST!
   var mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse),(max-width: 480px)');
  if (!mediaQuery.matches) {
  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });
}
})()