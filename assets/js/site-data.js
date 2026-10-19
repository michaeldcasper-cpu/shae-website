/*
 * SITE CONTENT — edit this file to update the website.
 * Every page reads its text, images and projects from here.
 * Anything marked TODO is placeholder content waiting on real material.
 */
const SITE = {
  name: "SHAE LASTNAME",            // TODO: real name as it should appear in the header
  tagline: "Photographer & Filmmaker", // TODO: title line under the name
  location: "City, State",          // TODO

  // Home page hero — these fade into one another (Kyle Button style).
  // Landscape images, ~1920x1080 or larger.
  hero: [
    "assets/img/hero/hero-1.svg",
    "assets/img/hero/hero-2.svg",
    "assets/img/hero/hero-3.svg",
  ],

  // Categories used for the filter bar on the Projects page.
  categories: ["Sports", "Documentary", "Events", "Portraits"],

  // Projects — the home "Projects" bar and the Projects page are built from this list.
  // id: used in the link (project.html?id=...), keep it lowercase-with-dashes.
  // video: optional YouTube or Vimeo link; leave "" for photo-only projects.
  projects: [
    {
      id: "project-one",
      title: "Project One",
      category: "Sports",
      year: "2026",
      client: "Client Name",
      cover: "assets/img/projects/project-1-cover.svg",
      summary: "One or two sentences describing the shoot, the story and your role.",
      video: "",
      photos: [
        "assets/img/projects/project-1-1.svg",
        "assets/img/projects/project-1-2.svg",
        "assets/img/projects/project-1-3.svg",
      ],
    },
    {
      id: "project-two",
      title: "Project Two",
      category: "Documentary",
      year: "2026",
      client: "Client Name",
      cover: "assets/img/projects/project-2-cover.svg",
      summary: "One or two sentences describing the shoot, the story and your role.",
      video: "https://www.youtube.com/watch?v=VIDEO_ID", // TODO: real link
      photos: [
        "assets/img/projects/project-2-1.svg",
        "assets/img/projects/project-2-2.svg",
        "assets/img/projects/project-2-3.svg",
      ],
    },
    {
      id: "project-three",
      title: "Project Three",
      category: "Events",
      year: "2025",
      client: "Client Name",
      cover: "assets/img/projects/project-3-cover.svg",
      summary: "One or two sentences describing the shoot, the story and your role.",
      video: "",
      photos: [
        "assets/img/projects/project-3-1.svg",
        "assets/img/projects/project-3-2.svg",
        "assets/img/projects/project-3-3.svg",
      ],
    },
    {
      id: "project-four",
      title: "Project Four",
      category: "Portraits",
      year: "2025",
      client: "Client Name",
      cover: "assets/img/projects/project-4-cover.svg",
      summary: "One or two sentences describing the shoot, the story and your role.",
      video: "",
      photos: [
        "assets/img/projects/project-4-1.svg",
        "assets/img/projects/project-4-2.svg",
        "assets/img/projects/project-4-3.svg",
      ],
    },
    {
      id: "project-five",
      title: "Project Five",
      category: "Sports",
      year: "2025",
      client: "Client Name",
      cover: "assets/img/projects/project-5-cover.svg",
      summary: "One or two sentences describing the shoot, the story and your role.",
      video: "https://vimeo.com/VIDEO_ID", // TODO: real link
      photos: [
        "assets/img/projects/project-5-1.svg",
        "assets/img/projects/project-5-2.svg",
        "assets/img/projects/project-5-3.svg",
      ],
    },
    {
      id: "project-six",
      title: "Project Six",
      category: "Documentary",
      year: "2024",
      client: "Client Name",
      cover: "assets/img/projects/project-6-cover.svg",
      summary: "One or two sentences describing the shoot, the story and your role.",
      video: "",
      photos: [
        "assets/img/projects/project-6-1.svg",
        "assets/img/projects/project-6-2.svg",
        "assets/img/projects/project-6-3.svg",
      ],
    },
  ],

  about: {
    portrait: "assets/img/about/portrait.svg",
    headline: "Telling stories through the lens.", // TODO
    bio: [
      // TODO: 2–4 short paragraphs
      "Paragraph one: who you are and what you shoot.",
      "Paragraph two: your background, style, and what drives your work.",
      "Paragraph three: what clients can expect working with you.",
    ],
    services: ["Sports Photography", "Event Coverage", "Short Documentary", "Video Editing"], // TODO
    clients: ["Client One", "Client Two", "Client Three", "Client Four"], // TODO (optional)
  },

  contact: {
    email: "hello@example.com", // TODO
    phone: "(000) 000-0000",    // TODO (optional — set to "" to hide)
    // Form submissions: create a free form at formspree.io and paste its endpoint here.
    // Left blank, the form falls back to opening the visitor's email app.
    formEndpoint: "",
  },

  social: {
    // TODO: full URLs; leave "" to hide an icon
    instagram: "https://instagram.com/",
    youtube: "",
    vimeo: "",
    tiktok: "",
    linkedin: "",
  },
};
