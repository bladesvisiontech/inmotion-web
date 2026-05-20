(() => {
  'use strict';

  // ─────────────────────────────────────────
  // NOISE GRAIN
  // ─────────────────────────────────────────
  function initNoise() {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      position:'fixed', top:'0', left:'0', width:'100%', height:'100%',
      pointerEvents:'none', zIndex:'9997', opacity:'0.028', mixBlendMode:'overlay',
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let W, H;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    let f = 0;
    function draw() {
      if (++f % 3 !== 0) { requestAnimationFrame(draw); return; }
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ─────────────────────────────────────────
  // PARTICLE NETWORK — hero + works only
  // ─────────────────────────────────────────
  function makeParticleSystem(canvas, container, n) {
    Object.assign(canvas.style, {
      position:'absolute', top:'0', left:'0',
      width:'100%', height:'100%',
      pointerEvents:'none', zIndex:'0',
    });
    const ctx = canvas.getContext('2d');
    let W, H;
    const MAX   = 150;
    const mouse = { x: -999, y: -999 };

    function resize() {
      W = canvas.width  = container.offsetWidth;
      H = canvas.height = container.offsetHeight;
    }
    resize();
    new ResizeObserver(resize).observe(container);

    container.addEventListener('mousemove', e => {
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }, { passive: true });
    container.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

    const pts = Array.from({ length: n }, () => ({
      x:  Math.random() * container.offsetWidth,
      y:  Math.random() * container.offsetHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 2.2 + 1.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md  = Math.sqrt(mdx*mdx + mdy*mdy);
        if (md < 90 && md > 0) { p.x += (mdx/md)*1.8; p.y += (mdy/md)*1.8; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(184,255,87,0.65)';
        ctx.fill();

        for (let j = i+1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x-q.x, dy = p.y-q.y;
          const d  = Math.sqrt(dx*dx+dy*dy);
          if (d < MAX) {
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
            ctx.strokeStyle = `rgba(184,255,87,${(1-d/MAX)*0.2})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }

        const mDist = Math.sqrt((p.x-mouse.x)**2+(p.y-mouse.y)**2);
        if (mDist < 180) {
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y);
          ctx.strokeStyle = `rgba(184,255,87,${(1-mDist/180)*0.45})`;
          ctx.lineWidth = 1; ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  function initParticles() {
    // Hero
    const heroCanvas = document.getElementById('particleCanvas');
    const hero       = document.getElementById('hero');
    if (heroCanvas && hero) makeParticleSystem(heroCanvas, hero, 75);

    // Works — behind content, not on videos
    const worksCanvas = document.getElementById('worksCanvas');
    const works       = document.getElementById('works');
    if (worksCanvas && works) makeParticleSystem(worksCanvas, works, 45);
  }

  // ─────────────────────────────────────────
  // FLOAT TAGS — mouse repulsion + oscillation
  // ─────────────────────────────────────────
  function initFloatTags() {
    const tags = [...document.querySelectorAll('.float-tag')];
    if (!tags.length) return;

    const states = tags.map(() => ({
      phase:    Math.random() * Math.PI * 2,
      repelX:   0, repelY:   0,
      targetX:  0, targetY:  0,
    }));

    let mouseX = -9999, mouseY = -9999;
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

    function tick(ts) {
      tags.forEach((tag, i) => {
        const s    = states[i];
        const rect = tag.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = mouseX - cx;
        const dy   = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const PUSH = 140;

        if (dist < PUSH && dist > 0) {
          const force    = (PUSH - dist) / PUSH;
          s.targetX = -(dx / dist) * force * 55;
          s.targetY = -(dy / dist) * force * 55;
        } else {
          s.targetX = 0;
          s.targetY = 0;
        }

        s.repelX += (s.targetX - s.repelX) * 0.1;
        s.repelY += (s.targetY - s.repelY) * 0.1;

        const floatY = Math.sin(ts * 0.0008 + s.phase) * 13;
        tag.style.transform = `translate(${s.repelX}px, ${floatY + s.repelY}px)`;
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ─────────────────────────────────────────
  // SMOOTH CURSOR
  // ─────────────────────────────────────────
  function initCursor() {
    const ring = document.getElementById('cursor');
    const dot  = document.getElementById('cursorDot');
    if (!ring || !dot) return;
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));
    document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
    function loop() {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      dot.style.transform  = `translate(${mx - 2.5}px, ${my - 2.5}px)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ─────────────────────────────────────────
  // LOADER
  // ─────────────────────────────────────────
  function initLoader(onComplete) {
    const loader = document.getElementById('loader');
    const numEl  = document.getElementById('loaderNum');
    const barEl  = document.getElementById('loaderBar');
    if (!loader) { onComplete(); return; }
    document.body.style.overflow = 'hidden';
    let start = null;
    const DURATION = 1600;
    function tick(ts) {
      if (!start) start = ts;
      const raw   = Math.min((ts - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      const n     = Math.floor(eased * 100);
      numEl.textContent = n;
      barEl.style.width = n + '%';
      if (raw < 1) { requestAnimationFrame(tick); return; }
      numEl.textContent = '100'; barEl.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hide');
        document.body.style.overflow = '';
        setTimeout(onComplete, 650);
      }, 180);
    }
    requestAnimationFrame(tick);
  }

  // ─────────────────────────────────────────
  // HERO DISSOLVE
  // ─────────────────────────────────────────
  function revealHero() {
    document.querySelectorAll('.h-line-inner').forEach(l => l.classList.add('in'));
    const tag = document.getElementById('heroTag');
    if (tag) {
      tag.style.transition = 'opacity .8s .6s cubic-bezier(.16,1,.3,1), transform .8s .6s cubic-bezier(.16,1,.3,1)';
      tag.style.transform  = 'translateX(-10px)';
      setTimeout(() => { tag.style.opacity = '1'; tag.style.transform = 'translateX(0)'; }, 50);
    }
    const hint = document.querySelector('.hero-scroll-hint');
    if (hint) { hint.style.transition = 'opacity .8s .9s'; setTimeout(() => { hint.style.opacity = '0.5'; }, 50); }
    const bottom = document.getElementById('heroBottom');
    if (bottom) setTimeout(() => bottom.classList.add('in'), 200);

    // Float tags appear after hero lines
    document.querySelectorAll('.float-tag').forEach(tag => {
      tag.style.transition = 'opacity .8s 1.2s cubic-bezier(.16,1,.3,1)';
      setTimeout(() => { tag.style.opacity = '1'; }, 50);
    });
  }

  // ─────────────────────────────────────────
  // 3D CARD TILT
  // ─────────────────────────────────────────
  function initTilt() {
    const STRENGTH = 7;
    document.querySelectorAll('.service-card, .work-browser, .pricing-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const x  = (e.clientX - r.left) / r.width  - 0.5;
        const y  = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transition = 'transform .08s';
        card.style.transform  = `perspective(1000px) rotateY(${x * STRENGTH * 2}deg) rotateX(${-y * STRENGTH}deg) scale3d(1.015,1.015,1.015)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
        card.style.transform  = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
      });
    });
  }

  // ─────────────────────────────────────────
  // PARALLAX + SCROLL PROGRESS
  // ─────────────────────────────────────────
  function initScroll() {
    const headline = document.getElementById('heroHeadline');
    const bottom   = document.getElementById('heroBottom');
    const progress = document.getElementById('scrollProgress');
    const nav      = document.getElementById('nav');
    const heroH    = window.innerHeight;
    let ticking    = false;

    function update() {
      const y = window.scrollY;
      if (progress) {
        const total = document.body.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${y / total})`;
      }
      if (nav) nav.classList.toggle('scrolled', y > 40);
      if (headline && y < heroH)
        headline.style.transform = `translateY(${y * 0.28}px)`;
      if (bottom && y < heroH) {
        bottom.style.opacity   = Math.max(0, 1 - y / (heroH * 0.5));
        bottom.style.transform = `translateY(${y * 0.12}px)`;
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  // ─────────────────────────────────────────
  // SCROLL REVEAL
  // ─────────────────────────────────────────
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-scale').forEach(el => obs.observe(el));
  }

  // ─────────────────────────────────────────
  // COUNTER ANIMATION
  // ─────────────────────────────────────────
  function initCounters() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { obs.unobserve(e.target); animateCount(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
  }
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let start = null;
    const DUR = 1800;
    function tick(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / DUR, 1);
      el.textContent = prefix + Math.floor((1 - Math.pow(1 - p, 4)) * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(tick);
  }

  // ─────────────────────────────────────────
  // MAGNETIC BUTTONS
  // ─────────────────────────────────────────
  function initMagnetic() {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.28;
        const y = (e.clientY - r.top  - r.height / 2) * 0.28;
        el.style.transition = 'transform .1s';
        el.style.transform  = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
        el.style.transform  = '';
      });
    });
  }

  // ─────────────────────────────────────────
  // VIDEO PLACEHOLDERS
  // ─────────────────────────────────────────
  function initVideos() {
    document.querySelectorAll('.work-video').forEach(video => {
      const ph = video.nextElementSibling;
      if (!ph) return;
      video.addEventListener('canplay', () => { ph.style.opacity = '0'; ph.style.pointerEvents = 'none'; });
      if (video.readyState >= 3) { ph.style.opacity = '0'; ph.style.pointerEvents = 'none'; }
    });
  }

  // ─────────────────────────────────────────
  // SMOOTH ANCHOR SCROLL
  // ─────────────────────────────────────────
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  // ─────────────────────────────────────────
  // LANGUAGE TOGGLE — EN / ES
  // ─────────────────────────────────────────
  const translations = {
    en: {
      'nav-services':'Services','nav-pricing':'Pricing','nav-works':'Work',
      'nav-process':'Process','nav-contact':'Contact','nav-cta':'Start a project',
      'hero-tag':'Marketing & Web Technology','hero-scroll':'Scroll',
      'hero-h1':'Your business','hero-h2':'deserves a website',
      'hero-h3':'that <em>sells.</em>',
      'hero-location':'Based in <strong>United States</strong> &mdash; Available worldwide',
      'hero-cta-primary':'Get your website for $700','hero-cta-ghost':'See our work ↓',
      'stmt-label':'Who we are',
      'stmt-text':'We help small and mid-size businesses turn their online presence into a <em>revenue engine</em> — with professional websites, aggressive SEO, and audits that show exactly where you\'re losing money.',
      'mkt-eyebrow':'Market reality',
      'mkt-title':'Your competitors are<br>already <em>online.</em>',
      'mkt-subtitle':'The data is clear: businesses without a strong digital presence are losing customers every day to competitors who invested in their online growth.',
      'mkt-lbl-1':'of consumers search online before buying from a local business',
      'mkt-lbl-2':'of users never scroll past page 1 of Google results',
      'mkt-lbl-3':'in global online sales in 2024 — growing 10% per year',
      'mkt-lbl-4':'higher close rate for SEO leads vs. outbound marketing',
      'insight-title-1':'The first-page advantage',
      'insight-text-1':'The top 3 Google results capture over 54% of all clicks. If your business isn\'t ranking, your competitors are taking those customers — every single day, 24/7, while you sleep.',
      'insight-hl-1':'Page 1 = 91% of all web traffic',
      'insight-title-2':'Mobile browsing is dominant',
      'insight-text-2':'Over 60% of web searches happen on mobile. A slow, non-optimized website doesn\'t just lose rankings — it loses customers the moment they land on your page.',
      'insight-hl-2':'3 seconds load time = 53% bounce rate',
      'svc-title':'What we <em>do</em>','svc-count':'03 services',
      'svc1-name':'Websites + SEO',
      'svc1-desc':'Custom professional websites designed to convert visitors into customers — fast, mobile-first, and built with SEO baked in from day one. We handle everything from design to launch.',
      'svc1-f1':'Custom design tailored to your brand','svc1-f2':'Mobile-first, sub-2s load time',
      'svc1-f3':'Full on-page SEO included','svc1-f4':'Contact forms & lead capture setup',
      'svc1-f5':'Google Analytics & Search Console',
      'svc1-price':'From $700 — SEO included','svc1-cta':'Get a quote',
      'svc2-name':'SEO & Google Optimization',
      'svc2-desc':'Get found by customers who are already searching for what you offer. We optimize your site and Google presence so you rank above your competitors.',
      'svc2-f1':'Technical SEO & on-page optimization','svc2-f2':'Google Business Profile setup & management',
      'svc2-f3':'Keyword research & content strategy','svc2-f4':'Local & national SEO campaigns',
      'svc2-f5':'Monthly ranking & traffic reports',
      'svc2-price':'Included with every website','svc2-cta':'Learn more',
      'svc3-name':'Digital Business Audits',
      'svc3-desc':'A comprehensive analysis of your entire online presence — website, SEO, competitors, ads — delivered in 48 hours with a prioritized roadmap to fix what\'s costing you revenue.',
      'svc3-f1':'Website speed & UX performance audit','svc3-f2':'SEO gap & keyword opportunity analysis',
      'svc3-f3':'Competitor benchmarking report','svc3-f4':'Ads & social media effectiveness review',
      'svc3-f5':'Revenue-prioritized action roadmap',
      'svc3-price':'Delivered in 48 hours','svc3-cta':'Get a quote',
      'price-eyebrow':'Transparent pricing',
      'price-headline':'One package.<br>Everything<br>you <em>need.</em>',
      'price-body':'No hidden fees. No vague proposals. One flat price that includes your complete professional website plus full SEO optimization so you start ranking from day one.<br><br>Most agencies charge $3,000–$8,000 for this. We deliver the same quality at a fraction of the cost because we work lean and keep our overhead low.',
      'price-badge':'Most popular','price-period':'one-time',
      'price-tagline':'Complete website + SEO — everything done for you',
      'price-f1':'Custom professional website design','price-f2':'Mobile-first & fast-loading build',
      'price-f3':'Payment gateway integration','price-f4':'Full on-page SEO optimization',
      'price-f5':'Google Business Profile setup','price-f6':'Product catalog setup (up to 50 items)',
      'price-f7':'30-day post-launch support','price-f8':'Domain & hosting guidance',
      'price-btn':'Pay & Start Now — $700',
      'price-note1':'⚡ Secure payment via Stripe · Limited spots',
      'price-note2':'* Domain & hosting are the client\'s responsibility. We provide full guidance on setup.',
      'works-title':'Our <em>work</em>','works-count':'02 projects',
      'work1-desc':'Full website design, development & local SEO for a barbershop in Houston, TX. Ranked on Google page 1 for local searches within 60 days.',
      'work1-link':'View live site →','work1-visit':'Visit site ↗',
      'work2-desc':'Website design + SEO strategy for a retail brand. Custom design aligned with the brand identity, fully optimized for search from launch.',
      'work2-soon':'Coming soon',
      'why-title':'Why businesses choose <em>WebBuilt</em>',
      'why-body':'We\'re not an agency that disappears after launch. We build long-term partnerships — starting with your goals, executing with precision, and measuring results. Every dollar you invest in us is backed by data, not guesswork.',
      'why-stat1':'Flat price for full website + SEO — no surprises',
      'why-stat2':'Digital audit delivered within 48 hours guaranteed',
      'why-stat3':'Average traffic increase after our SEO work',
      'why-stat4':'Client satisfaction rate on all delivered projects',
      'proc-title':'How we <em>work</em>',
      'proc-s1-name':'Free discovery call',
      'proc-s1-desc':'We learn about your business, your customers, and your competition. No templates — every strategy is built around your specific market and goals. 100% free, no commitment.',
      'proc-s2-name':'Clear proposal & timeline',
      'proc-s2-desc':'You receive a detailed proposal with scope, deliverables, and exact timeline before we start. One flat price — no surprises, no upsells, no hidden fees.',
      'proc-s3-name':'We build & optimize',
      'proc-s3-desc':'We design, develop, and SEO-optimize your website. You review at key milestones and we keep you updated throughout — no radio silence, no excuses.',
      'proc-s4-name':'Launch & grow together',
      'proc-s4-desc':'We launch your site, set up your Google presence, and provide 30 days of post-launch support. As your business grows, we grow with you.',
      'contact-eyebrow':'Let\'s work together',
      'contact-title':'Ready to<br><em>grow?</em>',
      'contact-btn':'Claim your $700 website',
      'contact-secondary':'Request a free audit →',
      'footer-copy':'© 2026 WebBuilt. All rights reserved. &nbsp;|&nbsp; <span style="color:#555">Client is responsible for their own domain &amp; hosting.</span>',
      'footer-powered':'Powered by',
    },
    es: {
      'nav-services':'Servicios','nav-pricing':'Precios','nav-works':'Proyectos',
      'nav-process':'Proceso','nav-contact':'Contacto','nav-cta':'Iniciar proyecto',
      'hero-tag':'Marketing & Tecnología Web','hero-scroll':'Desplaza',
      'hero-h1':'Tu negocio','hero-h2':'merece una web',
      'hero-h3':'que <em>vende.</em>',
      'hero-location':'Basados en <strong>Estados Unidos</strong> &mdash; Disponibles en todo el mundo',
      'hero-cta-primary':'Obtén tu web por $700','hero-cta-ghost':'Ver nuestros proyectos ↓',
      'stmt-label':'Quiénes somos',
      'stmt-text':'Ayudamos a pequeñas y medianas empresas a convertir su presencia online en un <em>motor de ingresos</em> — con sitios web profesionales, SEO agresivo y auditorías que muestran exactamente dónde estás perdiendo dinero.',
      'mkt-eyebrow':'Realidad del mercado',
      'mkt-title':'Tu competencia ya<br>está <em>en línea.</em>',
      'mkt-subtitle':'Los datos son claros: los negocios sin presencia digital sólida pierden clientes cada día frente a competidores que invirtieron en su crecimiento online.',
      'mkt-lbl-1':'de los consumidores buscan en internet antes de comprar a un negocio local',
      'mkt-lbl-2':'de los usuarios nunca pasa de la página 1 de Google',
      'mkt-lbl-3':'en ventas online globales en 2024 — creciendo un 10% anual',
      'mkt-lbl-4':'mayor tasa de cierre para leads de SEO vs. marketing de salida',
      'insight-title-1':'La ventaja de la primera página',
      'insight-text-1':'Los 3 primeros resultados de Google capturan más del 54% de todos los clics. Si tu negocio no aparece, tu competencia se lleva esos clientes — cada día, 24/7, mientras duermes.',
      'insight-hl-1':'Página 1 = 91% de todo el tráfico web',
      'insight-title-2':'El móvil domina las búsquedas',
      'insight-text-2':'Más del 60% de las búsquedas web ocurren en móvil. Un sitio lento y sin optimizar no solo pierde posicionamiento — pierde clientes en el momento en que llegan a tu página.',
      'insight-hl-2':'3 segundos de carga = 53% de rebote',
      'svc-title':'Lo que <em>hacemos</em>','svc-count':'03 servicios',
      'svc1-name':'Websites + SEO',
      'svc1-desc':'Sitios web profesionales personalizados diseñados para convertir visitantes en clientes — rápidos, optimizados para móvil y con SEO integrado desde el primer día. Nos encargamos de todo.',
      'svc1-f1':'Diseño personalizado para tu marca','svc1-f2':'Móvil primero, carga menor a 2s',
      'svc1-f3':'SEO on-page completo incluido','svc1-f4':'Formularios de contacto y captura de leads',
      'svc1-f5':'Google Analytics & Search Console',
      'svc1-price':'Desde $700 — SEO incluido','svc1-cta':'Pedir cotización',
      'svc2-name':'SEO & Optimización Google',
      'svc2-desc':'Sé encontrado por clientes que ya buscan lo que ofreces. Optimizamos tu sitio y presencia en Google para que aparezcas por encima de tu competencia.',
      'svc2-f1':'SEO técnico y on-page','svc2-f2':'Configuración y gestión de Google Business Profile',
      'svc2-f3':'Investigación de palabras clave y estrategia de contenido','svc2-f4':'Campañas SEO locales y nacionales',
      'svc2-f5':'Informes mensuales de posicionamiento y tráfico',
      'svc2-price':'Incluido en cada sitio web','svc2-cta':'Saber más',
      'svc3-name':'Auditorías Digitales de Negocio',
      'svc3-desc':'Un análisis completo de toda tu presencia online — web, SEO, competidores, publicidad — entregado en 48 horas con un plan de acción priorizado para recuperar ingresos.',
      'svc3-f1':'Auditoría de velocidad web y rendimiento UX','svc3-f2':'Análisis de brechas SEO y oportunidades de palabras clave',
      'svc3-f3':'Informe comparativo de competidores','svc3-f4':'Revisión de efectividad en anuncios y redes sociales',
      'svc3-f5':'Plan de acción priorizado por impacto en ingresos',
      'svc3-price':'Entregado en 48 horas','svc3-cta':'Pedir cotización',
      'price-eyebrow':'Precios transparentes',
      'price-headline':'Un paquete.<br>Todo lo que<br><em>necesitas.</em>',
      'price-body':'Sin costos ocultos. Sin propuestas vagas. Un precio fijo que incluye tu sitio web profesional completo más optimización SEO total para que empieces a posicionar desde el primer día.<br><br>La mayoría de las agencias cobran $3,000–$8,000 por esto. Nosotros entregamos la misma calidad a una fracción del costo porque trabajamos de manera eficiente.',
      'price-badge':'Más popular','price-period':'pago único',
      'price-tagline':'Web completa + SEO — todo hecho para ti',
      'price-f1':'Diseño web profesional personalizado','price-f2':'Construcción rápida y optimizada para móvil',
      'price-f3':'Integración de pasarela de pago','price-f4':'Optimización SEO on-page completa',
      'price-f5':'Configuración de Google Business Profile','price-f6':'Catálogo de productos (hasta 50 artículos)',
      'price-f7':'Soporte 30 días post-lanzamiento','price-f8':'Orientación sobre dominio y hosting',
      'price-btn':'Pagar y Comenzar — $700',
      'price-note1':'⚡ Pago seguro vía Stripe · Cupos limitados',
      'price-note2':'* El dominio y hosting son responsabilidad del cliente. Ofrecemos orientación completa.',
      'works-title':'Nuestros <em>proyectos</em>','works-count':'02 proyectos',
      'work1-desc':'Diseño web completo, desarrollo y SEO local para una barbería en Houston, TX. Posicionado en la página 1 de Google para búsquedas locales en 60 días.',
      'work1-link':'Ver sitio en vivo →','work1-visit':'Visitar sitio ↗',
      'work2-desc':'Diseño web + estrategia SEO para una marca de retail. Diseño personalizado alineado con la identidad de marca, totalmente optimizado para búsquedas desde el lanzamiento.',
      'work2-soon':'Próximamente',
      'why-title':'Por qué los negocios eligen <em>WebBuilt</em>',
      'why-body':'No somos una agencia que desaparece después del lanzamiento. Construimos asociaciones a largo plazo — comenzando con tus objetivos, ejecutando con precisión y midiendo resultados. Cada dólar que inviertes está respaldado por datos, no por suposiciones.',
      'why-stat1':'Precio fijo por web completa + SEO — sin sorpresas',
      'why-stat2':'Auditoría digital entregada en menos de 48 horas garantizado',
      'why-stat3':'Aumento promedio de tráfico tras nuestro trabajo de SEO',
      'why-stat4':'Tasa de satisfacción del cliente en todos los proyectos entregados',
      'proc-title':'Cómo <em>trabajamos</em>',
      'proc-s1-name':'Llamada de descubrimiento gratuita',
      'proc-s1-desc':'Aprendemos sobre tu negocio, tus clientes y tu competencia. Sin plantillas — cada estrategia se construye en torno a tu mercado específico y objetivos. 100% gratis, sin compromiso.',
      'proc-s2-name':'Propuesta y cronograma claros',
      'proc-s2-desc':'Recibes una propuesta detallada con alcance, entregables y cronograma exacto antes de comenzar. Un precio fijo — sin sorpresas, sin upsells, sin costos ocultos.',
      'proc-s3-name':'Construimos y optimizamos',
      'proc-s3-desc':'Diseñamos, desarrollamos y optimizamos tu sitio para SEO. Revisas en hitos clave y te mantenemos informado en todo momento — sin silencio, sin excusas.',
      'proc-s4-name':'Lanzamiento y crecimiento juntos',
      'proc-s4-desc':'Lanzamos tu sitio, configuramos tu presencia en Google y brindamos 30 días de soporte post-lanzamiento. A medida que tu negocio crece, nosotros crecemos contigo.',
      'contact-eyebrow':'Trabajemos juntos',
      'contact-title':'¿Listo para<br><em>crecer?</em>',
      'contact-btn':'Quiero mi web por $700',
      'contact-secondary':'Solicitar auditoría gratis →',
      'footer-copy':'© 2026 WebBuilt. Todos los derechos reservados. &nbsp;|&nbsp; <span style="color:#555">El dominio y hosting son responsabilidad del cliente.</span>',
      'footer-powered':'Powered by',
    }
  };

  function applyLang(lang) {
    const tr = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = tr[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = tr[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });
    document.documentElement.lang = lang;
  }

  function initLangToggle() {
    const toggle = document.getElementById('langToggle');
    if (!toggle) return;
    const saved = localStorage.getItem('wb-lang') || 'en';
    let current = saved;

    const btns = toggle.querySelectorAll('.lang-btn');
    btns.forEach(b => b.classList.toggle('active', b.dataset.lang === current));
    if (current !== 'en') applyLang(current);

    toggle.addEventListener('click', e => {
      const btn = e.target.closest('.lang-btn');
      if (!btn || btn.dataset.lang === current) return;
      current = btn.dataset.lang;
      localStorage.setItem('wb-lang', current);
      btns.forEach(b => b.classList.toggle('active', b.dataset.lang === current));
      applyLang(current);
    });
  }

  // ─────────────────────────────────────────
  // BOOT
  // ─────────────────────────────────────────
  initNoise();
  initCursor();
  initMagnetic();
  initAnchors();
  initVideos();
  initTilt();
  initLangToggle();

  initLoader(() => {
    initParticles();
    initFloatTags();
    revealHero();
    initScroll();
    initReveal();
    initCounters();
  });

})();
