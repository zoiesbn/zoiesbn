# Zoha Sobhani — Product Design Portfolio

A responsive product-design portfolio for **Zoha Sobhani**, built with Jekyll, semantic HTML, modern CSS, and vanilla JavaScript. It includes five detailed case studies covering mobile products, dashboards, developer tools, and telecommunications experiences.

## Live site

After GitHub Pages is enabled for this repository, the portfolio is published at:

**https://zoiesbn.github.io/zoiesbn/**

## Featured projects

- My Rightel Application
- Restaurant Management Dashboard
- FakeStore API Landing Page
- Mr.Box Delivery Application
- Rightel Website and SIM Purchase

## Technology

- Jekyll and Liquid
- GitHub Pages and GitHub Actions
- Semantic HTML5
- Responsive CSS
- Vanilla JavaScript
- Local image, video, and PDF assets

No client-side framework or external design runtime is required.

## Project structure

```text
.
├── _config.yml               # Jekyll and site metadata
├── _data/projects.yml        # Project catalog and ordering
├── _includes/seo.html        # Shared SEO and structured data
├── .github/workflows/        # GitHub Pages deployment
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── media/                # Local portfolio media, CV, and video
├── myrightel/                # Jekyll project pages
├── restaurant/
├── fsa/
├── mr.box/
├── rightelwebsite/
├── 404.html
├── robots.txt
└── index.html
```

## Run locally

Ruby and Bundler are required.

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/zoiesbn/`.

For a production-equivalent build:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

The generated site is written to `_site/`.

## Add or update a project

1. Add the project metadata to `_data/projects.yml`.
2. Create a project page with YAML front matter and a stable `permalink`.
3. Add media to `assets/media/` and reference it with a local path.

The homepage project grid and each case study's related-project cards are generated from `_data/projects.yml`, so titles, ordering, thumbnails, and links remain consistent.

## SEO

The site includes:

- Canonical URLs
- Open Graph and Twitter metadata
- Person and CreativeWork JSON-LD
- XML sitemap generation
- `robots.txt`
- Descriptive page titles and summaries
- Semantic headings and descriptive image alternative text
- A custom 404 page

## Deployment

Pushes to `main` trigger `.github/workflows/pages.yml`, which builds the Jekyll site and deploys the generated artifact to GitHub Pages.

In the repository settings, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

## Contact

- [LinkedIn](https://www.linkedin.com/in/zoha-sobhani-773103177/)
- [Email](mailto:zohasobhani39@gmail.com)

