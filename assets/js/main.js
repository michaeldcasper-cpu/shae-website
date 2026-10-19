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
      ["projects.html", "Projects", "projects"],
      ["about.html", "About", "about"],
      ["contact.html", "Contact", "contact"],
    ];
    const header = document.createElement("header");
    header.className = "site-header" + (page === "home" ? " is-overlay" : "");
    header.innerHTML = `
      <a class="brand" href="index.html">${esc(SITE.name)}</a>
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

  /* ---------- Home: fading hero (Kyle Button style) ---------- */
  function renderHero() {
    const hero = $("#hero");
    if (!hero) return;
    hero.insertAdjacentHTML(
      "afterbegin",
      SITE.hero
        .map((src, i) => `<div class="hero-slide${i === 0 ? " is-active" : ""}" style="background-image:url('${esc(src)}')"></div>`)
        .join("")
    );
    $("#hero-name").textContent = SITE.name;
    $("#hero-tagline").textContent = SITE.tagline;

    const slides = hero.querySelectorAll(".hero-slide");
    const counter = $("#hero-count");
    let current = 0;
    let timer;
    const show = (n) => {
      slides[current].classList.remove("is-active");
      current = (n + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };
    const start = () => {
      clearInterval(timer);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => show(current + 1), 5000);
    };
    $("#hero-prev").addEventListener("click", () => { show(current - 1); start(); });
    $("#hero-next").addEventListener("click", () => { show(current + 1); start(); });
    show(0);
    start();
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
    bar.innerHTML = SITE.projects.slice(0, 6).map(card).join("");
    const scrollBy = (dir) => bar.scrollBy({ left: dir * bar.clientWidth * 0.8, behavior: "smooth" });
    $("#bar-prev")?.addEventListener("click", () => scrollBy(-1));
    $("#bar-next")?.addEventListener("click", () => scrollBy(1));
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
    const next = SITE.projects[(idx + 1) % SITE.projects.length];
    root.innerHTML = `
      <section class="project-hero" style="background-image:url('${esc(p.cover)}')">
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
        ${embed ? `<div class="video reveal"><iframe src="${embed}" title="${esc(p.title)} video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : ""}
        <div class="gallery">
          ${p.photos.map((src, i) => `<img class="reveal" src="${esc(src)}" alt="${esc(p.title)} photo ${i + 1}" loading="lazy" data-index="${i}">`).join("")}
        </div>
        <a class="next-project reveal" href="project.html?id=${encodeURIComponent(next.id)}">
          <span class="eyebrow">Next project</span><span class="next-title">${esc(next.title)} →</span>
        </a>
      </section>`;
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
  renderHero();
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
