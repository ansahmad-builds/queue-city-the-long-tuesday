import assert from "node:assert/strict";
import { cases, roles } from "../src/data.js";
import { canChoose, choose, createGame, currentCases, effectiveOption, endWeek, getEnding, isValidSave, usePower } from "../src/engine.js";

for (const roleId of Object.keys(roles)) {
  let state = createGame(roleId);
  assert.equal(state.week, 1);
  assert.equal(currentCases(state).length, 4);
  assert.ok(isValidSave(JSON.parse(JSON.stringify(state))));

  for (let week = 1; week <= 4; week++) {
    assert.equal(state.week, week);
    const first = currentCases(state)[0];
    const affordable = first.options.find(option => (!option.roles || option.roles.includes(roleId)) && canChoose(state, first, option).ok);
    assert.ok(affordable, `${roleId}: needs an affordable choice in week ${week}`);
    state = choose(state, first.id, affordable.id);
    assert.equal(state.resolved[first.id], affordable.id);
    assert.throws(() => choose(state, first.id, affordable.id), /no longer open/);
    state = endWeek(state);
  }
  assert.equal(state.finished, true);
  const ending = getEnding(state);
  assert.ok(ending.title);
  assert.equal(ending.epilogues.length, 6);
  assert.throws(() => endWeek(state), /ended/);
}

let advisor = createGame("advisor");
const firstCase = cases.find(item => item.id === "mixed-market");
const mayorOnly = firstCase.options.find(option => option.id === "clerk");
assert.equal(canChoose(advisor, firstCase, mayorOnly).ok, false);
advisor = usePower(advisor);
assert.equal(advisor.powerUsed, true);
assert.equal(advisor.resources.trust, 8);
assert.throws(() => usePower(advisor), /unavailable/);
let linked = createGame("advisor");
linked = choose(linked, "mixed-market", "separate");
linked = endWeek(linked);
const poster = cases.find(item => item.id === "poster-war");
const broadcast = poster.options.find(option => option.id === "broadcast");
assert.equal(effectiveOption(linked, broadcast).cost.hours, 1, "earlier market choice should reduce the later cost");
assert.equal(effectiveOption(createGame("advisor"), broadcast).cost.hours, 2);
console.log("✓ role access, choices, costs, week transitions, endings, saves, and role powers");
