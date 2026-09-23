import { cases, roles, weeks } from "./data.js";

export const SAVE_KEY = "queue-city-long-tuesday-v1";

const clamp = (value, min = 0, max = 20) => Math.min(max, Math.max(min, value));

export function createGame(roleId) {
  const role = roles[roleId];
  if (!role) throw new Error(`Unknown role: ${roleId}`);
  return {
    version: 1,
    roleId,
    week: 1,
    resources: { funds: role.start.funds, trust: role.start.trust, wellbeing: role.start.wellbeing, hours: role.start.hours },
    resolved: {},
    flags: {},
    log: [{ week: 1, kind: "opening", text: "No. 404 rolls into the square. The longest Tuesday begins." }],
    powerUsed: false,
    finished: false
  };
}

export function currentCases(state) {
  if (state.finished) return [];
  return cases.filter(item => item.week === state.week && !state.resolved[item.id]);
}

export function effectiveOption(state, option) {
  const cost = { ...option.cost };
  const impact = { ...(option.impact || {}) };
  const notes = [];
  for (const modifier of option.modifiers || []) {
    if (!state.flags[modifier.flag]) continue;
    for (const [key, value] of Object.entries(modifier.cost || {})) cost[key] = Math.max(0, (cost[key] || 0) + value);
    for (const [key, value] of Object.entries(modifier.impact || {})) impact[key] = (impact[key] || 0) + value;
    if (modifier.note) notes.push(modifier.note);
  }
  return { cost, impact, notes };
}

export function canChoose(state, item, option) {
  if (!state || state.finished) return { ok: false, reason: "The campaign has ended." };
  if (item.week !== state.week || state.resolved[item.id]) return { ok: false, reason: "This case is no longer open." };
  if (!item.options.includes(option)) return { ok: false, reason: "That choice is not part of this case." };
  if (option.roles && !option.roles.includes(state.roleId)) return { ok: false, reason: "This approach belongs to another role." };
  if (option.requires && !option.requires.every(flag => state.flags[flag])) return { ok: false, reason: "An earlier step is missing." };
  const effective = effectiveOption(state, option);
  if (state.resources.hours < effective.cost.hours) return { ok: false, reason: "Not enough hours left this week." };
  if (effective.cost.funds > 0 && state.resources.funds < effective.cost.funds) return { ok: false, reason: "Not enough funds for this approach." };
  return { ok: true, reason: "" };
}

function applyImpact(resources, impact = {}) {
  return {
    funds: resources.funds + (impact.funds || 0),
    trust: clamp(resources.trust + (impact.trust || 0)),
    wellbeing: clamp(resources.wellbeing + (impact.wellbeing || 0)),
    hours: Math.max(0, resources.hours + (impact.hours || 0))
  };
}

export function choose(state, caseId, optionId) {
  const item = cases.find(entry => entry.id === caseId);
  if (!item) throw new Error(`Unknown case: ${caseId}`);
  const option = item.options.find(entry => entry.id === optionId);
  if (!option) throw new Error(`Unknown choice: ${optionId}`);
  const access = canChoose(state, item, option);
  if (!access.ok) throw new Error(access.reason);
  const effective = effectiveOption(state, option);

  const afterCost = {
    ...state.resources,
    hours: state.resources.hours - effective.cost.hours,
    funds: state.resources.funds - effective.cost.funds
  };
  return {
    ...state,
    resources: applyImpact(afterCost, effective.impact),
    resolved: { ...state.resolved, [caseId]: optionId },
    flags: { ...state.flags, ...Object.fromEntries((option.flags || []).map(flag => [flag, true])) },
    log: [...state.log, { week: state.week, kind: "choice", caseId, optionId, title: item.title, text: `${option.result}${effective.notes.length ? ` Earlier choices mattered: ${effective.notes.join(" ")}` : ""}` }]
  };
}

export function canUsePower(state) {
  if (!state || state.finished || state.powerUsed) return false;
  const power = roles[state.roleId].power;
  return state.resources.hours >= power.cost.hours && state.resources.funds >= power.cost.funds;
}

export function usePower(state) {
  if (!canUsePower(state)) throw new Error("This role action is unavailable.");
  const power = roles[state.roleId].power;
  const afterCost = {
    ...state.resources,
    hours: state.resources.hours - power.cost.hours,
    funds: state.resources.funds - power.cost.funds
  };
  return {
    ...state,
    resources: applyImpact(afterCost, power.impact),
    powerUsed: true,
    log: [...state.log, { week: state.week, kind: "power", text: `${power.name}: ${power.description}` }]
  };
}

export function endWeek(state) {
  if (!state || state.finished) throw new Error("The campaign has ended.");
  const pending = currentCases(state);
  const flags = { ...state.flags };
  const log = [...state.log];
  let resources = { ...state.resources };
  for (const item of pending) {
    flags[`missed_${item.id}`] = true;
    resources = applyImpact(resources, { trust: -1, wellbeing: -1 });
    log.push({ week: state.week, kind: "missed", title: item.title, text: `${item.title} waited past its deadline. People found another way, or went without.` });
  }
  resources.funds -= 1;
  log.push({ week: state.week, kind: "upkeep", text: "The lights, rent, and tea cost 1 fund." });

  if (state.week >= weeks.length) {
    return { ...state, resources, flags, log, finished: true };
  }
  const nextWeek = state.week + 1;
  resources.hours = roles[state.roleId].start.hours;
  log.push({ week: nextWeek, kind: "opening", text: weeks[nextWeek - 1].bulletin });
  return { ...state, week: nextWeek, resources, flags, log, powerUsed: false };
}

export function getEnding(state) {
  if (!state.finished) return null;
  const { funds, trust, wellbeing } = state.resources;
  const resolvedCount = Object.keys(state.resolved).length;
  const title = funds >= 0 && trust >= 8 && wellbeing >= 8
    ? "The city finds its rhythm"
    : (trust >= 5 && wellbeing >= 5 ? "A city still in motion" : "The queue reaches the sea");
  const summary = title === "The city finds its rhythm"
    ? "No single choice fixed Queue City. The people you made room for built something durable together."
    : title === "A city still in motion"
      ? "Some promises held, some slipped. The city has enough trust to try again, and enough unfinished work to stay honest."
      : "The pressure outpaced the help available. The city remembers who waited. It also remembers that a new plan can begin tomorrow.";
  const epilogues = [
    state.flags.market_system ? "Nelli runs a market with a checklist taped beside the soup pot." : state.flags.market_clear ? "Nelli keeps the first clear market sign as a lucky charm." : "Nelli is still explaining the sign between bowls of soup.",
    state.flags.miro_supported ? "Miro's courier work becomes steadier because somebody made time for the person behind the invoice." : state.flags.miro_checked ? "Miro now checks his paperwork before a delivery becomes a dispute." : "Miro keeps pedalling while a payment question trails behind him.",
    state.flags.safa_resolved ? "Safa and Otso now share a folder whose dates everyone can find." : state.flags.safa_verified ? "Safa knows which questions are settled and which deserve another check." : "Safa asks for the missing date again, this time in writing.",
    state.flags.workshop_shared ? "Safa and Ilo have a written voice in the repair group's next chapter." : state.flags.coop_prepared ? "The repair group starts slowly, with its first filing questions answered." : "The workshop's bright new logo waits beside unfinished forms.",
    state.flags.radio_clear ? "Kaiku's correction becomes the most replayed segment of the month." : state.flags.radio_wrong ? "Kaiku gives Veera a standing slot for corrections." : "Kaiku keeps asking for a sentence the whole city can trust.",
    state.flags.library_future ? "Paju posts an evening rota with real names and real rest days." : state.flags.library_open ? "Lili keeps one library evening alive while she plans the next." : "Lili folds a poster and begins planning a room that can stay open."
  ];
  const roleLines = {
    advisor: "Your centre becomes known for answers that admit what they still need to check.",
    mayor: "The council minutes record where the money went. The city records whether people felt heard.",
    founder: "Your co-op learns that mutual aid works best when its helpers can keep going too."
  };
  return { title, summary, epilogues, roleLine: roleLines[state.roleId], resolvedCount, totalCases: cases.length };
}

export function isValidSave(value) {
  return !!value && value.version === 1 && !!roles[value.roleId] && Number.isInteger(value.week)
    && value.week >= 1 && value.week <= weeks.length && value.resources && value.resolved && value.flags && Array.isArray(value.log);
}
