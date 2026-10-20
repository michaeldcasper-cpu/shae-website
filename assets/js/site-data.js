/*
 * SITE CONTENT — edit this file to update the website.
 * Every page reads its text, images and projects from here.
 * Anything marked TODO is placeholder content waiting on real material.
 */
const SITE = {
  name: "SHAE GRIFFITH",
  tagline: "Photographer & Filmmaker",
  location: "Mizzou student · Chicago native",
  logo: "assets/img/logo.png", // Shae's SS logo (transparent PNG); "" falls back to the SS monogram
  monogram: "SS", // placeholder mark used until the logo is added

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
  // aspect: the film's width / height, so it shows uncropped. link: optional project id for the title.
  featured: [
    { title: "Mizzou vs. Kansas", subtitle: "Mizzou Football", video: "assets/video/odyssey.mp4", poster: "assets/video/odyssey-poster.jpg", link: "mizzou-football", aspect: 16 / 9 },
    { title: "You", subtitle: "Mizzou Football", video: "assets/video/you.mp4", poster: "assets/video/you-poster.jpg", link: "mizzou-football", aspect: 4 / 3 },
    { title: "Game Day", subtitle: "Mizzou Football", video: "assets/video/mizzou-football.mp4", poster: "assets/video/mizzou-football-poster.jpg", link: "mizzou-football", aspect: 4 / 5 }, // TODO: real title
  ],

  // Categories used for the filter bar on the Projects page.
  categories: ["Sports", "Lifestyle"],

  // Projects — every photo here feeds the home page scroll, grouped by `sport`.
  // id: used in the link (project.html?id=...), keep it lowercase-with-dashes.
  // video: optional .mp4 in assets/video/ or a YouTube/Vimeo link; leave "" for photo-only projects.
  // heroVideo: optional silent .mp4 that loops behind the project title.
  projects: [
    {
      id: "mizzou-football",
      sport: "Football", // groups the home feed
      title: "Mizzou Football",
      category: "Sports",
      year: "2025",
      client: "Mizzou Athletics", // TODO: confirm client / outlet
      cover: "assets/img/projects/mizzou-football/mizzou-football-05.jpg",
      summary: "Game day with Mizzou Football at Faurot Field.", // TODO: Shae's own words
      video: "",
      photos: [
        "assets/img/projects/mizzou-football/mizzou-football-01.jpg",
        "assets/img/projects/mizzou-football/mizzou-football-02.jpg",
        "assets/img/projects/mizzou-football/mizzou-football-03.jpg",
        "assets/img/projects/mizzou-football/mizzou-football-04.jpg",
        "assets/img/projects/mizzou-football/mizzou-football-05.jpg",
      ],
    },
    {
      id: "mizzou-basketball",
      sport: "Basketball", // groups the home feed
      title: "Mizzou Basketball",
      category: "Sports",
      year: "2026",
      client: "Mizzou Athletics", // TODO: confirm
      cover: "assets/img/projects/mizzou-basketball/mizzou-basketball-10.jpg",
      summary: "Men's and women's basketball at Mizzou Arena through the 2025–26 season.", // TODO: Shae's own words
      video: "",
      photos: [
        "assets/img/projects/mizzou-basketball/mizzou-basketball-01.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-02.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-03.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-04.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-05.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-06.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-07.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-08.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-09.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-10.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-11.jpg",
        "assets/img/projects/mizzou-basketball/mizzou-basketball-12.jpg",
      ],
    },
    {
      id: "mizzou-volleyball",
      sport: "Volleyball", // groups the home feed
      title: "Mizzou Volleyball",
      category: "Sports",
      year: "2025",
      client: "Mizzou Athletics", // TODO: confirm
      cover: "assets/img/projects/mizzou-volleyball/mizzou-volleyball-03.jpg",
      summary: "Mizzou volleyball at the Hearnes Center.", // TODO: Shae's own words
      video: "",
      photos: [
        "assets/img/projects/mizzou-volleyball/mizzou-volleyball-01.jpg",
        "assets/img/projects/mizzou-volleyball/mizzou-volleyball-02.jpg",
        "assets/img/projects/mizzou-volleyball/mizzou-volleyball-03.jpg",
      ],
    },
    {
      id: "mizzou-athletics",
      sport: "Diamond & Pitch", // groups the home feed
      title: "Mizzou Athletics",
      category: "Sports",
      year: "2026",
      client: "Mizzou Athletics", // TODO: confirm
      cover: "assets/img/projects/mizzou-athletics/mizzou-athletics-04.jpg",
      summary: "Softball, baseball and soccer across the Mizzou athletics calendar.", // TODO: Shae's own words
      video: "",
      photos: [
        "assets/img/projects/mizzou-athletics/mizzou-athletics-01.jpg",
        "assets/img/projects/mizzou-athletics/mizzou-athletics-02.jpg",
        "assets/img/projects/mizzou-athletics/mizzou-athletics-03.jpg",
        "assets/img/projects/mizzou-athletics/mizzou-athletics-04.jpg",
      ],
    },
    {
      id: "nebraska-at-wrigley",
      sport: "Volleyball", // groups the home feed
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
      sport: "Volleyball", // groups the home feed
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
    {
      id: "depaul-prep-football",
      sport: "Football", // groups the home feed
      title: "DePaul Prep Media Day",
      category: "Sports",
      year: "2025",
      client: "DePaul College Prep", // TODO: confirm
      cover: "assets/img/projects/depaul-prep-football/depaul-prep-football-01.jpg",
      summary: "DePaul College Prep football media day at Wrigley Field and Navy Pier.", // TODO: Shae's own words
      video: "",
      photos: [
        "assets/img/projects/depaul-prep-football/depaul-prep-football-01.jpg",
        "assets/img/projects/depaul-prep-football/depaul-prep-football-02.jpg",
      ],
    },
    {
      id: "day-in-the-life",
      sport: "Lifestyle", // groups the home feed
      title: "Day in the Life",
      category: "Lifestyle",
      year: "2025",
      client: "Personal project", // TODO: confirm
      cover: "assets/img/projects/day-in-the-life/day-in-the-life-01.jpg",
      summary: "A day-in-the-life lifestyle shoot.", // TODO: Shae's own words
      video: "",
      photos: [
        "assets/img/projects/day-in-the-life/day-in-the-life-01.jpg",
        "assets/img/projects/day-in-the-life/day-in-the-life-02.jpg",
        "assets/img/projects/day-in-the-life/day-in-the-life-03.jpg",
        "assets/img/projects/day-in-the-life/day-in-the-life-04.jpg",
      ],
    },
  ],

  // More of Shae's best work that isn't in a project yet. It rotates in the home-page photo
  // cylinder along with every project photo (clicks go to the Projects page).
  collection: [],

  about: {
    portrait: "assets/img/about/portrait.jpg",
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
    email: "shaeshootsphotos@gmail.com",
    phone: "(312) 722-7933", // optional — leave "" to hide
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
