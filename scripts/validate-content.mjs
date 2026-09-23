import { cases, districts, npcs, roles, sources, weeks } from "../src/data.js";

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const unique = (items, label) => expect(new Set(items.map(item => item.id)).size === items.length, `${label} IDs must be unique`);
const producedFlags = new Map();
for (const item of cases) for (const option of item.options) for (const flag of option.flags || []) producedFlags.set(flag, Math.min(item.week, producedFlags.get(flag) ?? item.week));
unique(cases, "Case"); unique(districts, "District"); unique(npcs, "NPC"); unique(sources, "Source");
expect(weeks.length === 4, "The playable slice must have four weeks");
expect(npcs.length >= 12, "The playable slice must include at least twelve NPCs");
expect(Object.keys(roles).length === 3, "Every promised role must be playable");

for (const item of cases) {
  expect(Number.isInteger(item.week) && item.week >= 1 && item.week <= weeks.length, `${item.id}: invalid week`);
  expect(districts.some(district => district.id === item.district), `${item.id}: invalid district`);
  expect(item.npcs.length > 0 && item.npcs.every(id => npcs.some(npc => npc.id === id)), `${item.id}: invalid cast`);
  expect(item.sourceIds.every(id => sources.some(source => source.id === id)), `${item.id}: invalid source`);
  expect(item.options.length >= 2, `${item.id}: needs at least two choices`);
  expect(new Set(item.options.map(option => option.id)).size === item.options.length, `${item.id}: duplicate choice ID`);
  for (const [roleId] of Object.entries(roles)) {
    expect(item.options.some(option => !option.roles || option.roles.includes(roleId)), `${item.id}: no choice for ${roleId}`);
  }
  for (const option of item.options) {
    expect(option.cost && Number.isInteger(option.cost.hours) && option.cost.hours >= 0, `${item.id}/${option.id}: invalid hours`);
    expect(option.cost && Number.isInteger(option.cost.funds) && option.cost.funds >= 0, `${item.id}/${option.id}: invalid funds`);
    expect(typeof option.result === "string" && option.result.length > 20, `${item.id}/${option.id}: missing outcome`);
    expect(typeof option.forecast === "string" && option.forecast.length > 15, `${item.id}/${option.id}: missing forecast`);
    for (const modifier of option.modifiers || []) {
      expect(producedFlags.has(modifier.flag), `${item.id}/${option.id}: modifier flag ${modifier.flag} is never produced`);
      expect((producedFlags.get(modifier.flag) ?? Infinity) < item.week, `${item.id}/${option.id}: modifier flag ${modifier.flag} is not from an earlier week`);
    }
  }
}

for (const source of sources) {
  expect(source.url.startsWith("https://"), `${source.id}: invalid source URL`);
  expect(source.checked && source.publisher && source.note, `${source.id}: incomplete source record`);
}

if (errors.length) {
  console.error(errors.map(error => `✗ ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`✓ ${cases.length} cases, ${npcs.length} NPCs, ${Object.keys(roles).length} roles, ${sources.length} source cards validated`);
}
