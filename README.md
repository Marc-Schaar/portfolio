# Marc Schaar — Portfolio

Personal portfolio website of **Marc Schaar**, a fullstack developer based in Düsseldorf, Germany. Built with Angular to showcase projects, skills, and experience — bilingual (DE/EN), responsive, and accessible.

**🔗 Live: [marc-schaar.com](https://marc-schaar.com)**

## About

This is a single-page portfolio site presenting my work as a fullstack developer. It covers:

- **About Me** — background and how I work
- **Skills** — frontend and backend technologies I use
- **Portfolio** — six featured projects, filterable by category (Frontend / Backend / Fullstack), each linking to a live demo and its GitHub repository
- **References** — testimonials from past collaborators
- **Contact** — a validated contact form that sends inquiries directly to my inbox

### Featured projects

| Project | Category | Stack | Links |
| --- | --- | --- | --- |
| DA Bubble | Frontend | Angular, Angular Material, Firebase (Auth, Firestore) | [Live](https://da-bubble.marc-schaar.com) · [Code](https://github.com/Marc-Schaar/da-bubble) |
| Join | Frontend | JavaScript, Firebase (Realtime Database) | [Live](https://join.marc-schaar.com) · [Code](https://github.com/Marc-Schaar/join) |
| El Pollo Loco | Frontend | JavaScript, OOP, Canvas | [Live](https://el-pollo-loco.marc-schaar.com) · [Code](https://github.com/Marc-Schaar/el-pollo-loco) |
| Pokedex | Frontend | JavaScript, REST API, Bootstrap 5 | [Live](https://pokedex.marc-schaar.com) · [Code](https://github.com/Marc-Schaar/pokedex) |
| KanMind | Backend | Python, Django REST Framework, PostgreSQL | [Live](https://kanmind.marc-schaar.com) · [Code](https://github.com/Marc-Schaar/kan_mind_backend) |
| Coderr | Backend | Python, Django REST Framework, Docker, CI/CD | [Live](https://coderr.marc-schaar.com) · [Code](https://github.com/Marc-Schaar/coderr_backend) |

## Tech stack

- **Framework:** [Angular](https://angular.dev) 22 (standalone components, signals-ready)
- **Language:** TypeScript, SCSS
- **i18n:** [ngx-translate](https://github.com/ngx-translate/core) for German/English switching
- **Animations:** [AOS](https://michalsnik.github.io/aos/) (Animate On Scroll)
- **Forms:** Angular Reactive Forms with custom validation and error components
- **Testing:** Karma + Jasmine
- **Linting:** ESLint with `@angular-eslint`
- **CI/CD:** GitHub Actions — builds on every push to `main` and deploys the compiled output via SSH/rsync to a production server

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

### Build

```bash
npm run build
```

Production artifacts are written to `dist/portfolio/`.

### Tests

```bash
npm test
```

Runs unit tests via Karma.

### Lint

```bash
npm run lint
```

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the app in production mode and syncs `dist/portfolio/browser/` to the web server via SSH.

## Contact

- **Website:** [marc-schaar.com](https://marc-schaar.com)
- **Email:** [kontakt@marc-schaar.com](mailto:kontakt@marc-schaar.com)
- **GitHub:** [@Marc-Schaar](https://github.com/Marc-Schaar)

---

© Marc Schaar. This repository contains the source code of my personal portfolio; feel free to browse it for inspiration, but it is not licensed for reuse.
