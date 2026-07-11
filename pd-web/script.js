/* ============================================
   Scroll-Driven Hero — Core JavaScript
   GSAP + ScrollTrigger Image Sequence Engine
   ============================================ */

(function () {
  'use strict';

  // ---- Configuration ----
  const CONFIG = {
    frameCount: 160,
    basePath: 'static/images/zipline_sequence/frame_',
    fileExtension: '.webp',
    autoPlayEndFrame: 15,       // Frames 0–15 auto-play (~6 seconds of footage at ~2.45fps)
    autoPlayDuration: 2.0,      // Seconds for the auto-play intro animation
    scrollEnd: '+=4000',        // How many pixels of scroll for the full sequence
    scrubSmoothing: 0.6,        // Scroll catch-up delay (lower = snappier)
    priorityFrames: 20,         // How many frames to load before showing the page
    batchSize: 8,               // How many frames to load per batch after priority
    milestones: [
      { frame: 36,  id: 'milestone-1' },
      { frame: 78,  id: 'milestone-2' },
      { frame: 120, id: 'milestone-3' },
    ],
  };

  // ---- DOM Elements ----
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  const loaderOverlay = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const scrollProgress = document.getElementById('scroll-progress');

  // ---- State ----
  const images = new Array(CONFIG.frameCount).fill(null);
  const zipline = { frame: 0 };
  let animationInitialized = false;
  let currentDpr = 1;
  let resizeTimer = null;

  // ---- Helpers ----

  /**
   * Build the file path for a given frame index (1-based).
   */
  function framePath(index) {
    return `${CONFIG.basePath}${String(index).padStart(4, '0')}${CONFIG.fileExtension}`;
  }

  /**
   * Resize canvas to fill the viewport while maintaining device pixel ratio
   * for crisp rendering on Retina displays.
   */
  function resizeCanvas() {
    currentDpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * currentDpr;
    canvas.height = window.innerHeight * currentDpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);
    render();
  }

  /**
   * Debounced resize — prevents render spam during drag-resize.
   */
  function debouncedResize() {
    // Immediate lightweight resize for canvas dimensions
    currentDpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * currentDpr;
    canvas.height = window.innerHeight * currentDpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);

    // Debounced render (the expensive part)
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      render();
      ScrollTrigger.refresh();
    }, 150);
  }

  /**
   * Draw the current frame onto the canvas using "cover" scaling
   * so the image fills the viewport without distortion.
   */
  function render() {
    const img = images[zipline.frame];
    if (!img || !img.complete) return;

    const cw = canvas.width / currentDpr;
    const ch = canvas.height / currentDpr;

    ctx.clearRect(0, 0, cw, ch);

    // "background-size: cover" math
    const hRatio = cw / img.naturalWidth;
    const vRatio = ch / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);
    const drawW = img.naturalWidth * ratio;
    const drawH = img.naturalHeight * ratio;
    
    // On narrow screens (portrait), align the subject (person flying on left) slightly more in center.
    // An alignment of 0.42 shifts the frame rightwards to center the person on screen.
    const alignX = cw < 768 ? 0.42 : 0.5;
    const offsetX = (cw - drawW) * alignX;
    const offsetY = (ch - drawH) * 0.5;

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  /**
   * Update the loading bar UI.
   */
  function updateLoader(loaded, total) {
    const pct = Math.round((loaded / total) * 100);
    loaderBar.style.width = pct + '%';
    loaderPercent.textContent = pct + '%';
  }

  // ---- Image Preloader (Progressive) ----

  /**
   * Load a single image and return a promise.
   */
  function loadImage(index) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = framePath(index + 1); // frames are 1-based on disk
      img.onload = img.onerror = () => {
        images[index] = img;
        resolve(img);
      };
    });
  }

  /**
   * PHASE A: Load priority frames (0 → priorityFrames) with a progress bar.
   * These are needed for the auto-play intro.
   */
  function loadPriorityFrames() {
    let loaded = 0;
    const total = CONFIG.priorityFrames;

    return new Promise((resolve) => {
      for (let i = 0; i < total; i++) {
        loadImage(i).then(() => {
          loaded++;
          // Map progress to 0–80% of the bar (remaining 20% for background batch)
          updateLoader(loaded, total);
          if (loaded >= total) {
            resolve();
          }
        });
      }
    });
  }

  /**
   * PHASE B: Load remaining frames in batches after the page is live.
   * Uses sequential batches to avoid saturating the connection.
   */
  function loadRemainingFrames() {
    const remaining = [];
    for (let i = CONFIG.priorityFrames; i < CONFIG.frameCount; i++) {
      remaining.push(i);
    }

    let batchIndex = 0;

    function loadNextBatch() {
      if (batchIndex >= remaining.length) return;

      const batch = remaining.slice(batchIndex, batchIndex + CONFIG.batchSize);
      batchIndex += CONFIG.batchSize;

      Promise.all(batch.map(loadImage)).then(loadNextBatch);
    }

    loadNextBatch();
  }

  // ---- GSAP Animation ----

  function initAnimation() {
    if (animationInitialized) return;
    animationInitialized = true;

    gsap.registerPlugin(ScrollTrigger);

    // Hide loader with a smooth fade
    loaderOverlay.classList.add('hidden');

    // Set initial states programmatically
    gsap.set('.hero-title-container', { y: 30, opacity: 0 });
    gsap.set('.scroll-prompt', { y: 30, opacity: 0 });
    render();

    const scrollAmount = parseInt(CONFIG.scrollEnd.replace('+=', ''));

    // Calculate what scroll progress the auto-play end frame corresponds to
    const autoPlayProgress = CONFIG.autoPlayEndFrame / (CONFIG.frameCount - 1);

    const tl = gsap.timeline();

    // PHASE 1 — Auto-play intro (exciting zipline launch)
    tl.to(zipline, {
      frame: CONFIG.autoPlayEndFrame,
      snap: 'frame',
      duration: CONFIG.autoPlayDuration,
      ease: 'power2.out',
      onUpdate: render,
    })
      // Fade in hero title
      .to('.hero-title-container', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      // Fade in scroll prompt
      .to('.scroll-prompt', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: function () {
          // Activate the scroll-prompt animation only when visible
          document.querySelector('.scroll-prompt')?.classList.add('active');
        },
      }, '-=0.3');

    // PHASE 2 — Scroll-driven scrub (user takes control)
    // The ScrollTrigger scrubs from autoPlayEndFrame → last frame,
    // so there's no visual jump when the user starts scrolling.
    const scrollTriggerInstance = gsap.to(zipline, {
      frame: CONFIG.frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: CONFIG.scrollEnd,
        scrub: CONFIG.scrubSmoothing,
        pin: true,
        onUpdate: function (self) {
          // Update top progress bar
          if (scrollProgress) {
            scrollProgress.style.width = (self.progress * 100) + '%';
          }
        },
        onEnter: function () {
          // Hide title and prompt when scrolling begins
          gsap.to('.hero-title-container', { opacity: 0, duration: 0.4 });
          gsap.to('.scroll-prompt', { opacity: 0, duration: 0.3 });
          // Pause the CSS keyframe animation to save GPU cycles
          document.querySelector('.scroll-prompt')?.classList.remove('active');
        },
        onLeaveBack: function () {
          // Re-show them if user scrolls back to the top
          gsap.to('.hero-title-container', { opacity: 1, duration: 0.5 });
          gsap.to('.scroll-prompt', { opacity: 1, duration: 0.4 });
          document.querySelector('.scroll-prompt')?.classList.add('active');
        },
      },
      onUpdate: render,
    });

    // Smooth handoff: After auto-play finishes, programmatically scroll
    // the page to where frame 15 sits in the ScrollTrigger progress,
    // so the user continues from exactly where the intro left off.
    tl.call(function () {
      const st = ScrollTrigger.getAll().find(
        (t) => t.trigger === document.querySelector('.scroll-container')
      );
      if (st) {
        // Scroll to the position that corresponds to autoPlayEndFrame
        const targetScroll = st.start + autoPlayProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'instant' });
      }
    });

    // PHASE 3 — Milestone text overlays
    CONFIG.milestones.forEach((ms) => {
      const el = document.getElementById(ms.id);
      if (!el) return;

      // Calculate the scroll progress % for this milestone frame
      const progress = ms.frame / (CONFIG.frameCount - 1);
      const triggerPos = progress * scrollAmount;

      ScrollTrigger.create({
        trigger: '.scroll-container',
        start: `top+=${triggerPos - 200} top`,
        end: `top+=${triggerPos + 300} top`,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
        onLeave: () => gsap.to(el, { opacity: 0, y: -20, duration: 0.4 }),
        onEnterBack: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, y: 20, duration: 0.4 }),
      });

      // Set initial state
      gsap.set(el, { opacity: 0, y: 30 });
    });

    // PHASE 4 — Content section reveal animations
    initContentReveals();
  }

  // ---- Content Section Reveal Animations ----

  function initContentReveals() {
    // Reveal section headings / text blocks
    gsap.utils.toArray('.content-section, .cta-section').forEach((section) => {
      const heading = section.querySelector('.section-heading, .cta-heading');
      const body = section.querySelector('.section-body, .cta-body');
      const tag = section.querySelector('.section-tag');
      const button = section.querySelector('.cta-button');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      });

      if (tag) {
        gsap.set(tag, { opacity: 0, y: 20 });
        tl.to(tag, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }
      if (heading) {
        gsap.set(heading, { opacity: 0, y: 30 });
        tl.to(heading, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      }
      if (body) {
        gsap.set(body, { opacity: 0, y: 20 });
        tl.to(body, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      }
      if (button) {
        gsap.set(button, { opacity: 0, y: 20 });
        tl.to(button, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
      }
    });

    // Staggered reveal for feature cards
    const cards = gsap.utils.toArray('.feature-card');
    if (cards.length) {
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: '.features-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
          });
        },
      });
    }
  }

  // ---- Navbar scroll effect ----
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---- Init ----

  function init() {
    resizeCanvas();
    window.addEventListener('resize', debouncedResize);
    initNavbar();

    // Progressive loading: load priority frames first, then start animation
    loadPriorityFrames().then(() => {
      // Small delay for the loader fade-out to feel polished
      setTimeout(() => {
        initAnimation();

        // Load the rest of the frames in the background
        loadRemainingFrames();
      }, 200);
    });
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
