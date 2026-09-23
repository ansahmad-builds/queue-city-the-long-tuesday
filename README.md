# Queue City: The Long Tuesday

A free, local-first narrative strategy game about a city full of people who need help at once. Play as an advice-centre lead, the mayor, or a worker-cooperative founder. Each role sees the same four-week crisis through different resources and choices.

This is an original work. Its compact town, oddball humour, and returning characters take broad inspiration from playful adventure games such as *Turnip Boy Commits Tax Evasion*. Characters, art, writing, systems, and setting are original.

## Play locally

No package install, API key, model, or backend is needed. Serve this directory with any static file server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/queue-city/` if serving the parent workspace, or `http://localhost:8000/` if serving this directory.

## Validate

```bash
node scripts/validate-content.mjs
node tests/engine.test.mjs
```

The game saves progress in browser local storage. The **Reset** control clears that save.

## Project documents

- [Game design](docs/GAME_DESIGN.md): vision, systems, roles, narrative structure, accessibility, and scope.
- [Story bible](docs/STORY_BIBLE.md): setting, cast, tone, and scripts for the playable slice.
- [Execution plan](docs/EXECUTION_PLAN.md): milestones, acceptance criteria, content pipeline, and publishing plan.
- [Source register](docs/SOURCES.md): official references used for the educational cards.

## Source boundaries

The city and its outcomes are fictional. Source cards link to official public information; the game does not calculate individual taxes or replace professional advice. The challenge question bank is a content-development input, not a runtime dependency. Game dialogue and choices are written and reviewed separately.

## Hosting

The site is static and can be published from the repository root with GitHub Pages. There are no secrets to configure. A dedicated repository keeps the game separate from the portfolio workspace.
