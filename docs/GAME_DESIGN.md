# Game design: Queue City — The Long Tuesday

## High concept

Queue City is a narrative strategy game about scarce attention. Twelve recurring residents are connected by work, family, housing, and friendship. The player chooses one of three civic roles and tries to keep the city functioning through four difficult weeks. Correct rules matter, but the core challenge is deciding what to do with limited time, money, and trust.

**Player fantasy:** be the person everyone calls when the city is one form away from falling apart.

**Promise:** funny on the surface; meaningful consequences underneath. A talking queue-ticket machine and an overdramatic ferry bell can share a scene with a person who cannot afford a wrong answer.

## Inspiration and originality

The inspiration from *Turnip Boy Commits Tax Evasion* is its compact oddball world, readable humour, memorable side characters, and willingness to let bureaucracy become adventure. Queue City is a turn-based strategy game with original people, writing, visual design, and systems. It does not reuse Turnip Boy characters, vegetable imagery, story beats, dialogue, or assets.

## Playable roles

All three roles are selectable at the start. They share the town, NPCs, and calendar. Their starting resources, unique actions, and some case options differ.

| Role | Advantage | Pressure | Unique lens |
| --- | --- | --- | --- |
| Advice-centre lead | More staff time and trusted expertise | Very little cash | Check sources, ask questions, refer carefully |
| Mayor | Larger emergency budget | Less personal trust and fewer actions | Fund services, redirect scarce public resources |
| Co-op founder | Community network and flexible labour | Precarious cash flow | Mobilise volunteers, trade work and mutual aid |

Role choice is not a difficulty selector. Every role has a viable route and its own closing epilogue.

## Core loop

1. **Hear the city:** read the week's news and meet cases on the four-district map.
2. **Triage:** choose which cases merit staff time now. Unresolved cases do not pause politely.
3. **Act:** pick one of several approaches. Some options require a role, resources, or prior trust.
4. **Check:** consult short official source cards when a case touches a real administrative rule.
5. **Live with it:** end the week, pay upkeep, see missed deadlines and relationship effects, then face the next week.

The game ends after week four with a city outcome and character epilogues. Replaying with another role changes the available strategies.

## Strategic systems

### Resources

- **Hours:** action points refreshed each week. They are the strictest constraint.
- **Funds:** pay for direct aid and operations; upkeep is due weekly.
- **Trust:** makes future cooperation possible; misleading certainty damages it.
- **Wellbeing:** measures how the connected community is faring.

The goal is not to maximise one score. A solvent but alienated city, or a beloved centre that cannot keep its doors open, is a mixed ending.

### Case structure

Each case has a deadline, involved NPCs, a district, a scene, and two to four approaches. Costs are shown before commitment. Consequences are expressed through resources, persistent flags, and future scenes. The same case can become harder or easier because of an earlier choice.

### Legal and administrative facts

Real rules are represented as dated source cards, never as a randomised system. A card stores source publisher, page title, URL, review date, and a short paraphrase. Fictional case outcomes are distinct from claims about real rules. The game can ask the player to verify a supplier's prepayment status or notice that goods have different VAT treatment; it does not pretend to provide a personal tax decision.

### NPC network

Every named NPC appears in more than one context. A decision for Nelli's night market can affect Rami's music event and Miro's courier work. A choice that saves one week may consume the capacity needed for Safa's employer the next week.

## Story structure

**Act I — The queue grows legs:** one unusual Tuesday becomes a week of linked requests. The player learns that seemingly minor choices connect people.

**Act II — The poster war:** contradictory posters about fees and forms spread. The player must spend capacity on clear information or deal with individual confusion one person at a time.

**Act III — The flood of envelopes:** a courier mix-up and a district event compress several deadlines. Role powers matter most here.

**Act IV — The long Tuesday:** the city asks what kind of institution the player has built. Results are shown in individual epilogues rather than only a score.

## Difficulty and fairness

The player sees immediate costs and a plain-language forecast, but later social effects are partly uncertain. The game does not hide a secret legal answer behind misleading wording. Safe choices such as asking for missing facts are valid strategies and sometimes the strongest move. No timer pressures reading or accessibility.

## Visual and audio direction

A tiny paper-cut harbour city: ink-blue outlines, warm cream paper, stamp-red warnings, sea-glass green, and yellow streetlamps. Districts are readable cards on a compact map. NPC portraits use original geometric shapes. UI copy can be absurd; critical facts stay clear. The first slice uses CSS and SVG without external assets or audio. Later, original pixel animation and short musical cues can add charm.

## Accessibility

Keyboard-operable controls, visible focus, sufficient contrast, no time limit, no sound dependency, reduced-motion support, and responsive layout are part of the first slice. Progress can be reset without deleting unrelated browser data.

## Full-game possibilities

- A ten-year legacy mode with ageing NPCs and inherited consequences.
- A policy sandbox with clearly fictional amendments and simulated distributional effects.
- Rotating neighbourhood events and source updates, curated rather than generated at runtime.
- Local pass-and-play council mode where players assume different roles in the same city.

These follow the vertical slice only if playtests show that the core decisions are enjoyable.
