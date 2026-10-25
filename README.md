# ICT Quest

ICT Quest is a responsive learning prototype for Diploma in ICT learners in Kenya. It pairs short revision notes with practice questions, score tracking, and practical assessment activities.

## Features

- Public landing page with course overview and links into the learning app.
- Seven units, each with two topics, revision notes, and three multiple-choice questions per topic:
  1. ICT Foundations & Ethics
  2. Data and Information
  3. Operating Systems & Software
  4. Computer Applications
  5. Communication
  6. Computational Mathematics
  7. Structured Programming
- Answer explanations, a mistake notebook, and XP rewards that are not duplicated on retries.
- Best scoreboards per unit, based on each topic's best question score.
- Practical checklist and timed mock exam with topic-by-topic review.
- Local progress storage using browser `localStorage`.
- Service-worker caching of the app shell and visited application assets for offline revisits after an initial online load.
- Responsive desktop and mobile navigation.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Other commands

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` creates the production bundle in `dist/`. `npm run preview` serves that built bundle locally.

## Project structure

- `src/App.jsx` — learner app screens, quiz and exam interactions, scoreboards, and local progress handling.
- `src/LandingPage.jsx` — public landing page and course links.
- `src/courseData.js` — units, topic notes, questions, and practical checklist data.
- `src/index.css` — global styles and responsive layouts.
- `public/student.jpg` — landing-page hero photograph.
- `public/favicon.svg` — ICT Quest browser icon.
- `public/sw.js` — app-shell and asset caching for offline revisits.

## Curriculum status

The unit areas and learning content are a study framework based on the requested Diploma in ICT subject areas. The detailed topic mapping has not been verified against a current official KNEC syllabus document. Confirm the current syllabus, unit naming, and assessment requirements with KNEC or the relevant training institution before using this content as an authoritative course specification.

## Progress and privacy

Learner progress is stored in the current browser on the current device. There are no user accounts or cloud synchronisation in this prototype. Clearing the browser's site data removes locally saved progress. Do not enter sensitive personal information.
# ICT-Quest
