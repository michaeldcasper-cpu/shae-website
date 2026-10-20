/* Shared behavior for every page. Content comes from site-data.js (SITE). */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const page = document.body.dataset.page;

  /* ---------- Header + footer ---------- */
  function renderHeader() {
    const links = [
      ["index.html", "Home", "home"],
      ["portfolio.html", "Portfolio", "portfolio"],
      ["projects.html", "Projects", "projects"],
      ["about.html", "About", "about"],
      ["contact.html", "Contact", "contact"],
    ];
    const header = document.createElement("header");
    header.className = "site-header" + (page === "home" ? " is-overlay" : "");
    header.innerHTML = `
      <a class="brand" href="index.html" aria-label="${esc(SITE.name)} home">${
        SITE.logo
          ? `<img class="brand-logo" src="${esc(SITE.logo)}" alt="${esc(SITE.name)}">`
          : `<span class="brand-mark">${esc(SITE.monogram || "SS")}</span>`
      }</a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
      <nav class="site-nav">
        ${links
          .map(([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ""}>${label}</a>`)
          .join("")}
      </nav>`;
    document.body.prepend(header);

    const toggle = $(".nav-toggle", header);
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
    // Solid header once the user scrolls past the hero.
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function socialLinks() {
    return Object.entries(SITE.social)
      .filter(([, url]) => url)
      .map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>`)
      .join("");
  }

  function renderFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <p class="brand">${esc(SITE.name)}</p>
          <p class="muted">${esc(SITE.tagline)} · ${esc(SITE.location)}</p>
        </div>
        <div class="footer-links">
          <a href="mailto:${esc(SITE.contact.email)}">${esc(SITE.contact.email)}</a>
          <div class="social">${socialLinks()}</div>
        </div>
      </div>
      <p class="muted small">© ${new Date().getFullYear()} ${esc(SITE.name)}. All rights reserved.</p>`;
    document.body.append(footer);
  }

  /* ---------- Shared photo helpers ---------- */
  const thumbOf = (src) => src.replace(/\/([^/]+)$/, "/thumbs/$1");
  // Every project photo, in a fixed shuffled order so neighbours come from different shoots.
  function allPhotos(seed) {
    const list = [
      ...SITE.projects.flatMap((p) => p.photos.map((src) => ({ src, href: `project.html?id=${encodeURIComponent(p.id)}`, title: p.title }))),
      ...(SITE.collection || []).map((src) => ({ src, href: "portfolio.html", title: "Portfolio" })),
    ];
    const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  /* ---------- Portfolio: every photo in one unsorted collage ---------- */
  function renderPortfolio() {
    const grid = $("#portfolio-grid");
    if (!grid) return;
    const photos = allPhotos(23);
    grid.innerHTML = photos
      .map((ph, i) => `<img class="reveal" src="${esc(thumbOf(ph.src))}" alt="${esc(ph.title)} photo" loading="lazy" data-index="${i}">`)
      .join("");
    setupLightbox(photos.map((ph) => ph.src)); // full-size photo opens on click
  }

  /* ---------- Home: full-screen photo wall ---------- */
  // Three rows of photos fill the screen edge to edge and slide sideways: top and bottom rows
  // drift right, the middle row drifts left. Hover slows them down; clicking opens the project.
  function renderReel() {
    const stage = $("#reel");
    if (!stage) return;
    $("#hero-name").textContent = SITE.name;

    const pool = allPhotos(7);
    const ROWS = 3, dirs = [1, -1, 1];
    const per = Math.ceil(pool.length / ROWS);
    stage.innerHTML = Array.from({ length: ROWS }, (_, r) => {
      const tiles = pool.slice(r * per, (r + 1) * per).map((ph) =>
        `<a class="reel-tile" href="${esc(ph.href)}" aria-label="${esc(ph.title)}" tabindex="-1"><img src="${esc(thumbOf(ph.src))}" alt="" draggable="false"></a>`
      ).join("");
      return `<div class="reel-row"><div class="reel-track">${tiles}${tiles}</div></div>`; // doubled for a seamless loop
    }).join("");

    const tracks = [...stage.querySelectorAll(".reel-track")];
    const offsets = tracks.map(() => 0);
    const CRUISE = 38, SLOW = 8; // pixels per second
    let speed = CRUISE, target = CRUISE, last = performance.now();
    stage.addEventListener("pointerenter", () => (target = SLOW));
    stage.addEventListener("pointerleave", () => (target = CRUISE));
    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      speed += (target - speed) * Math.min(1, dt * 3);
      tracks.forEach((track, r) => {
        const half = track.scrollWidth / 2;
        if (!half) return;
        offsets[r] += dirs[r] * speed * dt;
        const x = ((offsets[r] % half) + half) % half;
        track.style.transform = `translate3d(${x - half}px, 0, 0)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    renderVeil();
  }

  // Dark veil over the photo wall with SHAE GRIFFITH cut out, so the photos shine through the letters.
  function renderVeil() {
    const svg = $("#reel-veil");
    const text = $(".reel-text");
    const draw = () => {
      const W = window.innerWidth, H = $("#reel-hero").clientHeight;
      const lines = W < 720 ? SITE.name.split(" ") : [SITE.name];
      const fs = Math.round(lines.length > 1 ? Math.min(W * 0.2, 150) : Math.min(W * 0.115, 180));
      const lh = fs * 0.98, cy = H * 0.44;
      const ys = lines.map((_, i) => cy + (i - (lines.length - 1) / 2) * lh);
      const t = (fill, extra = "") =>
        lines.map((l, i) => `<text x="${W / 2}" y="${ys[i]}" font-size="${fs}" fill="${fill}" ${extra} text-anchor="middle" dominant-baseline="central">${esc(l)}</text>`).join("");
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = `
        <defs><mask id="veil-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
          <rect width="${W}" height="${H}" fill="#fff"/>${t("#000")}
        </mask></defs>
        <rect width="${W}" height="${H}" fill="rgba(6,6,8,0.72)" mask="url(#veil-cut)"/>
        ${t("none", 'stroke="rgba(255,255,255,0.55)" stroke-width="1.2"')}`;
      text.style.top = `${ys[ys.length - 1] + fs * 0.62}px`;
    };
    draw();
    window.addEventListener("resize", draw);
    document.fonts?.ready.then(draw);
  }

  /* ---------- Project cards ---------- */
  const card = (p) => `
    <a class="project-card reveal" href="project.html?id=${encodeURIComponent(p.id)}" data-category="${esc(p.category)}">
      <div class="project-thumb"><img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="project-meta">
        <h3>${esc(p.title)}</h3>
        <span>${esc(p.category)} · ${esc(p.year)}</span>
      </div>
    </a>`;

  // Home: horizontal project bar (Jarrell style).
  function renderProjectBar() {
    const bar = $("#project-bar");
    if (!bar) return;
    bar.innerHTML = SITE.projects.map(card).join("");
    const scrollBy = (dir) => bar.scrollBy({ left: dir * bar.clientWidth * 0.8, behavior: "smooth" });
    $("#bar-prev")?.addEventListener("click", () => scrollBy(-1));
    $("#bar-next")?.addEventListener("click", () => scrollBy(1));
  }

  // Home: featured films. Shows the poster until clicked, then loads and plays the full video inline.
  function renderFeatured() {
    const grid = $("#featured-grid");
    if (!grid || !SITE.featured?.length) return $("#featured")?.remove();
    grid.innerHTML = SITE.featured
      .map((f, i) => {
        const title = f.link ? `<a href="project.html?id=${encodeURIComponent(f.link)}">${esc(f.title)}</a>` : esc(f.title);
        return `
        <article class="film reveal" style="--ar:${+f.aspect || 16 / 9}">
          <div class="film-frame">
            <button class="film-play" data-index="${i}" aria-label="Play ${esc(f.title)}">
              <img src="${esc(f.poster)}" alt="" loading="lazy">
              <span class="play-icon" aria-hidden="true"></span>
            </button>
          </div>
          <div class="film-meta"><h3>${title}</h3><span>${esc(f.subtitle)}</span></div>
        </article>`;
      })
      .join("");
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".film-play");
      if (!btn) return;
      const f = SITE.featured[+btn.dataset.index];
      const embed = videoEmbed(f.video);
      const frame = btn.parentElement;
      if (embed) {
        frame.innerHTML = `<iframe src="${embed}?autoplay=1" title="${esc(f.title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        return;
      }
      frame.innerHTML = `<video src="${esc(f.video)}" poster="${esc(f.poster)}" controls autoplay playsinline preload="auto"></video>`;
      const video = $("video", frame);
      // Only one film plays at a time.
      video.addEventListener("play", () =>
        grid.querySelectorAll("video").forEach((v) => v !== video && v.pause())
      );
      video.play().catch(() => {});
    });
  }

  function renderAboutTeaser() {
    const el = $("#about-teaser");
    if (!el) return;
    el.innerHTML = `
      <div class="split reveal">
        <img src="${esc(SITE.about.portrait)}" alt="Portrait of ${esc(SITE.name)}">
        <div>
          <p class="eyebrow">About</p>
          <h2>${esc(SITE.about.headline)}</h2>
          <p>${esc(SITE.about.bio[0])}</p>
          <a class="btn" href="about.html">More about me</a>
        </div>
      </div>`;
  }

  // Projects page: grid + category filter.
  function renderProjectGrid() {
    const grid = $("#project-grid");
    if (!grid) return;
    const filters = $("#filters");
    filters.innerHTML = ["All", ...SITE.categories]
      .map((c, i) => `<button class="filter${i === 0 ? " is-active" : ""}" data-filter="${esc(c)}">${esc(c)}</button>`)
      .join("");
    grid.innerHTML = SITE.projects.map(card).join("");
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
      const f = btn.dataset.filter;
      grid.querySelectorAll(".project-card").forEach((c) => {
        c.hidden = f !== "All" && c.dataset.category !== f;
      });
    });
  }

  /* ---------- Single project page ---------- */
  function videoEmbed(url) {
    if (!url) return "";
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
    m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}`;
    return "";
  }

  function renderProject() {
    const root = $("#project");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const idx = SITE.projects.findIndex((p) => p.id === id);
    const p = SITE.projects[idx];
    if (!p) {
      root.innerHTML = `<section class="container page-top"><h1>Project not found</h1><a class="btn" href="projects.html">All projects</a></section>`;
      return;
    }
    document.title = `${p.title} | ${SITE.name}`;
    const embed = videoEmbed(p.video);
    const film = embed
      ? `<div class="video reveal"><iframe src="${embed}" title="${esc(p.title)} video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
      : p.video
        ? `<div class="video reveal"><video src="${esc(p.video)}" poster="${esc(p.videoPoster || p.cover)}" controls playsinline preload="none"></video></div>`
        : "";
    // Background loop behind the title, with a pause control for motion-sensitive visitors.
    const heroVideo = p.heroVideo
      ? `<video class="project-hero-video" src="${esc(p.heroVideo)}" poster="${esc(p.cover)}" autoplay muted loop playsinline aria-hidden="true"></video>
         <button class="hero-video-toggle" aria-label="Pause background video">Pause</button>`
      : "";
    const next = SITE.projects[(idx + 1) % SITE.projects.length];
    root.innerHTML = `
      <section class="project-hero${heroVideo ? " has-video" : ""}" style="background-image:url('${esc(p.cover)}')">
        ${heroVideo}
        <div class="project-hero-text">
          <p class="eyebrow">${esc(p.category)} · ${esc(p.year)}</p>
          <h1>${esc(p.title)}</h1>
        </div>
      </section>
      <section class="container project-body">
        <div class="project-info reveal">
          <p>${esc(p.summary)}</p>
          <dl><dt>Client</dt><dd>${esc(p.client)}</dd><dt>Year</dt><dd>${esc(p.year)}</dd></dl>
        </div>
        ${film}
        <div class="gallery">
          ${p.photos.map((src, i) => `<img class="reveal" src="${esc(src)}" alt="${esc(p.title)} photo ${i + 1}" loading="lazy" data-index="${i}">`).join("")}
        </div>
        <a class="next-project reveal" href="project.html?id=${encodeURIComponent(next.id)}">
          <span class="eyebrow">Next project</span><span class="next-title">${esc(next.title)} →</span>
        </a>
      </section>`;
    const bg = $(".project-hero-video", root);
    const toggle = $(".hero-video-toggle", root);
    toggle?.addEventListener("click", () => {
      bg.paused ? bg.play() : bg.pause();
      toggle.textContent = bg.paused ? "Play" : "Pause";
      toggle.setAttribute("aria-label", `${toggle.textContent} background video`);
    });
    setupLightbox(p.photos);
  }

  function setupLightbox(photos) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `<button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous">‹</button><img alt=""><button class="lb-next" aria-label="Next">›</button>`;
    document.body.append(box);
    const img = $("img", box);
    let i = 0;
    const open = (n) => { i = (n + photos.length) % photos.length; img.src = photos[i]; box.classList.add("is-open"); };
    const close = () => box.classList.remove("is-open");
    document.querySelectorAll(".gallery img").forEach((el) => el.addEventListener("click", () => open(+el.dataset.index)));
    $(".lb-close", box).addEventListener("click", close);
    $(".lb-prev", box).addEventListener("click", () => open(i - 1));
    $(".lb-next", box).addEventListener("click", () => open(i + 1));
    box.addEventListener("click", (e) => e.target === box && close());
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") open(i - 1);
      if (e.key === "ArrowRight") open(i + 1);
    });
  }

  /* ---------- About page ---------- */
  function renderAbout() {
    const root = $("#about");
    if (!root) return;
    const a = SITE.about;
    root.innerHTML = `
      <div class="split reveal">
        <img src="${esc(a.portrait)}" alt="Portrait of ${esc(SITE.name)}">
        <div>
          <p class="eyebrow">About</p>
          <h1>${esc(a.headline)}</h1>
          ${a.bio.map((p) => `<p>${esc(p)}</p>`).join("")}
        </div>
      </div>
      <div class="about-lists">
        <div class="reveal"><h2>Services</h2><ul>${a.services.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
        ${a.clients.length ? `<div class="reveal"><h2>Selected clients</h2><ul>${a.clients.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>` : ""}
      </div>
      <div class="cta reveal"><h2>Let's work together.</h2><a class="btn" href="contact.html">Get in touch</a></div>`;
  }

  /* ---------- Contact page ---------- */
  function renderContact() {
    const root = $("#contact-details");
    if (!root) return;
    const c = SITE.contact;
    root.innerHTML = `
      <p><span class="eyebrow">Email</span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>
      ${c.phone ? `<p><span class="eyebrow">Phone</span><a href="tel:${esc(c.phone.replace(/[^\d+]/g, ""))}">${esc(c.phone)}</a></p>` : ""}
      <p><span class="eyebrow">About</span>${esc(SITE.location)}</p>
      <div class="social">${socialLinks()}</div>`;

    const form = $("#contact-form");
    const status = $("#form-status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (!c.formEndpoint) {
        // No form service configured yet: hand off to the visitor's email app.
        const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
        location.href = `mailto:${c.email}?subject=${encodeURIComponent(data.get("subject") || "Website inquiry")}&body=${encodeURIComponent(body)}`;
        return;
      }
      status.textContent = "Sending…";
      try {
        const res = await fetch(c.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error();
        form.reset();
        status.textContent = "Thanks! I'll get back to you soon.";
      } catch {
        status.textContent = `Something went wrong. Please email ${c.email} directly.`;
      }
    });
  }

  /* ---------- Scroll reveal (Jarrell-style slide-in on scroll) ---------- */
  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-visible"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  renderHeader();
  renderReel();
  renderFeatured();
  renderPortfolio();
  renderProjectBar();
  renderAboutTeaser();
  renderProjectGrid();
  renderProject();
  renderAbout();
  renderContact();
  renderFooter();
  if (page !== "project") document.title = document.title.replace("{name}", SITE.name);
  setupReveal();
})();
