/*
 * SITE CONTENT — edit this file to update the website.
 * Every page reads its text, images and projects from here.
 * Anything marked TODO is placeholder content waiting on real material.
 */
const SITE = {
  name: "SHAE GRIFFITH",
  tagline: "Photographer & Filmmaker",
  location: "Mizzou student · Chicago native",

  // Home page hero — these fade into one another (Kyle Button style).
  // Landscape images, ~1920x1080 or larger.
  hero: [
    "assets/img/projects/kentucky-vb/kentucky-vb-03.jpg",
    "assets/img/projects/nebraska-wrigley/nebraska-wrigley-13.jpg",
    "assets/img/projects/kentucky-vb/kentucky-vb-12.jpg",
    "assets/img/projects/nebraska-wrigley/nebraska-wrigley-25.jpg",
  ],

  // Featured films — playable videos on the home page, in this order.
  // video: an .mp4 in assets/video/ (or a YouTube/Vimeo link); poster: the still shown before play.
  // link: optional project id to link the title to.
  featured: [
    { title: "Odyssey", subtitle: "Mizzou Football", video: "assets/video/odyssey.mp4", poster: "assets/video/odyssey-poster.jpg" },
    { title: "You", subtitle: "Mizzou Football", video: "assets/video/you.mp4", poster: "assets/video/you-poster.jpg" },
    { title: "Game Day", subtitle: "Mizzou Football", video: "assets/video/mizzou-football.mp4", poster: "assets/video/mizzou-football-poster.jpg" }, // TODO: real title
    { title: "Nebraska at Wrigley", subtitle: "Nebraska Volleyball", video: "assets/video/nebraska-wrigley.mp4", poster: "assets/video/nebraska-wrigley-poster.jpg", link: "nebraska-at-wrigley" },
  ],

  // Categories used for the filter bar on the Projects page.
  categories: ["Sports"], // add more (e.g. "Documentary", "Events") as new work comes in

  // Projects — the home "Projects" bar and the Projects page are built from this list.
  // id: used in the link (project.html?id=...), keep it lowercase-with-dashes.
  // video: optional .mp4 in assets/video/ or a YouTube/Vimeo link; leave "" for photo-only projects.
  // heroVideo: optional silent .mp4 that loops behind the project title.
  projects: [
    {
      id: "nebraska-at-wrigley",
      title: "Nebraska at Wrigley",
      category: "Sports",
      year: "2026",
      client: "Big Ten × SEC Volleyball Challenge", // TODO: confirm client / outlet
      cover: "assets/img/projects/nebraska-wrigley/nebraska-wrigley-10.jpg",
      summary: "Nebraska volleyball under the lights at Wrigley Field for the Big Ten × SEC Volleyball Challenge, September 9, 2026.", // TODO: Shae's own words
      video: "assets/video/nebraska-wrigley.mp4",
      videoPoster: "assets/video/nebraska-wrigley-poster.jpg",
      heroVideo: "assets/video/nebraska-wrigley-bg.mp4", // silent loop behind the page title
      photos: [
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-01.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-02.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-03.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-04.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-05.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-06.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-07.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-08.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-09.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-10.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-11.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-12.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-13.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-14.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-15.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-16.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-17.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-18.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-19.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-20.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-21.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-22.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-23.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-24.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-25.jpg",
        "assets/img/projects/nebraska-wrigley/nebraska-wrigley-26.jpg",
      ],
    },
    {
      id: "kentucky-volleyball",
      title: "Kentucky Volleyball",
      category: "Sports",
      year: "2026",
      client: "Big Ten × SEC Volleyball Challenge", // TODO: confirm client / outlet
      cover: "assets/img/projects/kentucky-vb/kentucky-vb-17.jpg",
      summary: "Kentucky volleyball at Wrigley Field for the Big Ten × SEC Volleyball Challenge, September 10, 2026.", // TODO: Shae's own words
      video: "",
      photos: [
        "assets/img/projects/kentucky-vb/kentucky-vb-01.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-02.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-03.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-04.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-05.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-06.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-07.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-08.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-09.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-10.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-11.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-12.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-13.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-14.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-15.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-16.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-17.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-18.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-19.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-20.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-21.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-22.jpg",
        "assets/img/projects/kentucky-vb/kentucky-vb-23.jpg",
      ],
    },
  ],

  about: {
    portrait: "assets/img/about/portrait.svg",
    headline: "Bringing positivity into the lens.",
    bio: [
      "I've been a competitor my entire life, on and off the field, and I knew picking up a camera was my way to stay close to the game.",
      "What started as taking photos grew into producing films of the events I shoot.",
      "Through every team and event I cover, one thing has stayed close to my heart: bringing positivity into the lens and telling stories, whether in stills or in frames.",
    ],
    services: ["Sports Photography", "Game-Day Films", "Event Coverage", "Video Editing"],
    clients: [], // optional — e.g. ["Nebraska Volleyball"]; empty hides the section
  },

  contact: {
    email: "hello@example.com", // TODO
    phone: "",                  // optional — leave "" to hide
    // Form submissions: create a free form at formspree.io and paste its endpoint here.
    // Left blank, the form falls back to opening the visitor's email app.
    formEndpoint: "",
  },

  social: {
    // full URLs; leave "" to hide an icon
    instagram: "https://www.instagram.com/shae_shoots/",
    youtube: "",
    vimeo: "",
    tiktok: "https://www.tiktok.com/@shae_shoots",
    linkedin: "",
  },
};
