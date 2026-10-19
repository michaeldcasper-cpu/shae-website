# Shae — Media Portfolio

Static portfolio site (plain HTML/CSS/JS, no build step) for photo + video work. Hosts free on GitHub Pages.

## Pages
- `index.html` — full-screen crossfading hero, horizontal **Projects** bar, About teaser
- `projects.html` — all projects with category filter
- `project.html?id=...` — one template for every project: cover, summary, video embed, photo gallery + lightbox, next-project link
- `about.html` — portrait, bio, services, clients
- `contact.html` — contact details + inquiry form

## Editing content
Almost everything lives in **`assets/js/site-data.js`** — name, hero photos, projects, bio, contact, socials.
To add a project: drop images in `assets/img/projects/`, then copy a block in the `projects` list.
Colors and fonts are at the top of `assets/css/style.css`.

## Preview locally
```
python -m http.server 5500
```
then open http://localhost:5500

## Publish (GitHub Pages)
Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root.
