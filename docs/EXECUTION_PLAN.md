# Execution plan

## Delivery principle

Build and publish one complete four-week campaign before adding more systems. The full vision is a strategic narrative city game; the first playable slice must already support all three roles, recurring NPCs, meaningful resource tradeoffs, saving, endings, and official source cards.

## Milestone 1 — playable vertical slice

- Static browser app with role selection, city board, 12 NPCs, four districts, 16 linked cases, four weeks, three endings, and local save.
- Original visual identity and readable responsive UI.
- Content files separate from state-transition code.
- Source register with reviewed official links.

**Acceptance:** A new player can finish a campaign in every role, make different choices, see different outcomes, reset, and replay without a server or API key.

## Milestone 2 — content and source pipeline

1. Obtain the challenge corpus and question bank using its documented fetch scripts.
2. Extract candidate facts, topic, jurisdiction, relevant date, and publisher into a private authoring sheet.
3. Verify each selected fact against its current official page or the applicable dated version.
4. Write a short source card, NPC situation, choices, and consequences by hand.
5. Run the content validator: unique IDs, valid links, all roles able to proceed, no dangling flags.
6. Playtest comprehension. Revise unclear wording before adding volume.

The bank is not shipped as a hidden answer key. A question/answer pair is a seed for a scenario, not a finished level.

## Milestone 3 — deeper strategy

- NPC relationship edges influence future cases.
- Staff specialisations, fatigue, recurring operating costs, and district projects.
- More endings and long arcs, with a weekly newspaper that reflects player decisions.
- Ten-year legacy or policy sandbox only after the four-week loop proves fun.

**Acceptance:** Different strategies produce materially different case availability and character outcomes, not only different score totals.

## Milestone 4 — publication

- Review source citations and redistribution rights; keep bulk external corpus out of the repository.
- Run the validator and engine tests, then a keyboard and narrow-screen playthrough.
- Create a dedicated public GitHub repository and publish its root through GitHub Pages.
- Verify the live URL on desktop and mobile, then link it from the portfolio.

## Risks and responses

| Risk | Response |
| --- | --- |
| Many NPCs create shallow writing | Give each a recurring goal and two connections; add breadth only after arcs work. |
| A numerical score makes choices obvious | Show costs and forecasts, then reveal some delayed social effects through story. |
| Real tax facts age | Store source and review dates; keep the playable demo anchored to a stated period and review before releases. |
| Comedy trivialises hardship | Make systems absurd, never the resident's situation. |
| Scope outgrows free hosting | Ship static content and deterministic rules; no runtime LLM or database server. |

## Playtest questions

- Which NPC did players remember after one campaign, and why?
- Did at least two decisions feel genuinely difficult?
- Could players explain why a source card mattered?
- Did each role feel different without feeling unfair?
- Did the ending reflect the player's actual priorities?
