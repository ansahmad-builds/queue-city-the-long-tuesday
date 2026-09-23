import { cases, districts, npcs, roles, sources, weeks } from "./data.js";
import { SAVE_KEY, canChoose, canUsePower, choose, createGame, currentCases, effectiveOption, endWeek, getEnding, isValidSave, usePower } from "./engine.js";

const app = document.getElementById("app");
let state = readSave();
let tab = "city";
let districtId = "market";
let selectedCaseId = null;
let recap = null;

function readSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    return isValidSave(value) ? value : null;
  } catch { return null; }
}

function persist() {
  try {
    if (state) localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    else localStorage.removeItem(SAVE_KEY);
  } catch { /* The campaign remains playable if storage is disabled. */ }
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function getNpc(id) { return npcs.find(npc => npc.id === id); }
function getDistrict(id) { return districts.find(district => district.id === id); }
function resource(value, name, icon, tone) {
  return `<div class="resource ${tone}"><span class="resource-icon" aria-hidden="true">${icon}</span><span class="resource-label">${name}</span><strong>${value}</strong></div>`;
}

function avatar(npc, small = false) {
  return `<span class="avatar ${small ? "small" : ""}" style="--avatar:${npc.color}" aria-hidden="true"><span class="avatar-head"></span><span class="avatar-body"></span></span>`;
}

function startView() {
  return `<div class="start-page">
    <div class="skyline" aria-hidden="true"><span class="sun"></span><span class="building b1"></span><span class="building b2"></span><span class="building b3"></span><span class="building b4"></span><span class="ferry"></span></div>
    <header class="start-header"><span class="brand-mark">404</span><span>AN ORIGINAL NARRATIVE STRATEGY GAME</span></header>
    <main class="start-main">
      <div class="sticker">ONE CITY · THREE ROLES · FOUR VERY LONG WEEKS</div>
      <h1>QUEUE <em>CITY</em></h1><p class="subtitle">The Long Tuesday</p>
      <p class="lede">The queue-ticket machine has escaped. The ferry is late. Twelve neighbours need help, and your calendar is already full. Choose who you will be when everyone calls at once.</p>
      <div class="speech opening-speech"><span class="speech-who">NO. 404, QUEUE-TICKET MACHINE</span><p>“Good morning. Your ticket is number 404. This is not an error. I have chosen it.”</p></div>
      <h2 class="section-kicker">CHOOSE YOUR ROLE</h2>
      <div class="role-grid">${Object.values(roles).map(role => `<article class="role-card"><div class="role-symbol" aria-hidden="true">${role.icon}</div><div class="role-title"><h3>${esc(role.name)}</h3><span>${esc(role.tagline)}</span></div><p>${esc(role.description)}</p><div class="role-stats"><span>⏱ ${role.start.hours} hours</span><span>◈ ${role.start.funds} funds</span><span>♥ ${role.start.trust} trust</span></div><button class="button primary" data-action="start" data-role="${role.id}">Play as ${esc(role.name)} <span aria-hidden="true">→</span></button></article>`).join("")}</div>
      <p class="start-footnote">Fictional stories · real source links · no timer · saves in this browser · free to play</p>
    </main>
  </div>`;
}

function nav() {
  return `<nav class="tabs" aria-label="Game views"><button class="tab ${tab === "city" ? "active" : ""}" data-action="tab" data-tab="city" aria-current="${tab === "city" ? "page" : "false"}">⌂ <span>City board</span></button><button class="tab ${tab === "sources" ? "active" : ""}" data-action="tab" data-tab="sources" aria-current="${tab === "sources" ? "page" : "false"}">▣ <span>Source shelf</span></button><button class="tab ${tab === "journal" ? "active" : ""}" data-action="tab" data-tab="journal" aria-current="${tab === "journal" ? "page" : "false"}">✎ <span>Journal</span></button></nav>`;
}

function districtCard(district) {
  const open = currentCases(state).filter(item => item.district === district.id).length;
  const weekAll = cases.filter(item => item.week === state.week && item.district === district.id).length;
  return `<button class="district ${districtId === district.id ? "selected" : ""}" style="--district:${district.color}" data-action="district" data-id="${district.id}" aria-pressed="${districtId === district.id}"><span class="district-art"><span class="district-icon" aria-hidden="true">${district.icon}</span><span class="district-dots" aria-hidden="true">${open ? "●".repeat(open) : "✓"}</span></span><span class="district-name">${esc(district.name)}</span><span class="district-meta">${open} open / ${weekAll} this week</span></button>`;
}

function caseCard(item) {
  const characters = item.npcs.map(id => getNpc(id)).filter(Boolean);
  return `<button class="case-card ${selectedCaseId === item.id ? "selected" : ""}" data-action="case" data-id="${item.id}" aria-pressed="${selectedCaseId === item.id}"><span class="case-card-top"><span class="tiny-label">${esc(item.urgency)}</span><span class="case-arrow" aria-hidden="true">↗</span></span><strong>${esc(item.title)}</strong><span class="case-people">${characters.map(npc => avatar(npc, true)).join("")}<span>${characters.map(npc => npc.name).join(" · ")}</span></span></button>`;
}

function sourceCard(source, compact = false) {
  return `<article class="source-card ${compact ? "compact" : ""}"><span class="source-publisher">${esc(source.publisher)} · CHECKED ${esc(source.checked)}</span><h4>${esc(source.title)}</h4><p>${esc(source.note)}</p><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Read official source <span aria-hidden="true">↗</span></a></article>`;
}

function caseDetail(item) {
  if (!item) return `<div class="empty-detail"><div class="empty-icon" aria-hidden="true">✉</div><h3>Pick a letter from the queue</h3><p>Every person has a story. You have ${state.resources.hours} hours left this week.</p></div>`;
  const people = item.npcs.map(id => getNpc(id)).filter(Boolean);
  const applicable = item.options.filter(option => !option.roles || option.roles.includes(state.roleId));
  const sourcesForCase = sources.filter(source => item.sourceIds.includes(source.id));
  return `<div class="detail-inner"><div class="detail-top"><span class="tiny-label">${esc(getDistrict(item.district).name)} / ${esc(item.urgency)}</span><button class="icon-button" data-action="close-case" aria-label="Close case">×</button></div><h2>${esc(item.title)}</h2><div class="cast-row">${people.map(npc => `<div class="cast-member">${avatar(npc)}<span><strong>${esc(npc.name)}</strong><small>${esc(npc.job)}</small></span></div>`).join("")}</div><p class="scene">${esc(item.scene)}</p>${item.introIf && state.flags[item.introIf.flag] ? `<p class="memory">↪ ${esc(item.introIf.text)}</p>` : ""}<div class="speech"><span class="speech-who">FROM THE SCENE</span><p>${esc(item.dialogue)}</p></div><div class="choice-heading"><h3>What do you do?</h3><span>Choices spend hours and may affect future weeks.</span></div><div class="choices">${applicable.map(option => { const access = canChoose(state, item, option); const effective = effectiveOption(state, option); return `<button class="choice" data-action="choose" data-case="${item.id}" data-option="${option.id}" ${access.ok ? "" : "disabled"}><span class="choice-row"><strong>${esc(option.label)}</strong><span class="choice-cost">⏱ ${effective.cost.hours} ${effective.cost.funds ? ` · ◈ ${effective.cost.funds}` : ""}</span></span><small>${esc(access.ok ? option.forecast : access.reason)}</small>${effective.notes.length ? `<span class="choice-memory">↪ ${esc(effective.notes.join(" "))}</span>` : ""}${option.roles ? `<span class="role-only">${esc(roles[state.roleId].name)} approach</span>` : ""}</button>`; }).join("")}</div>${sourcesForCase.length ? `<div class="case-sources"><h3>On the source shelf</h3>${sourcesForCase.map(source => sourceCard(source, true)).join("")}</div>` : `<p class="fiction-note">This scene is fictional and does not ask you to determine an individual tax rule.</p>`}</div>`;
}

function cityView() {
  const district = getDistrict(districtId);
  const open = currentCases(state).filter(item => item.district === districtId);
  const resolvedHere = cases.filter(item => item.week === state.week && item.district === districtId && state.resolved[item.id]);
  const item = open.find(entry => entry.id === selectedCaseId);
  const residents = npcs.filter(npc => npc.district === districtId);
  return `<div class="city-layout"><section class="board-col"><div class="board-heading"><div><span class="eyebrow">QUEUE CITY / WEEK ${state.week}</span><h2>Choose where to go.</h2></div><span class="board-note">${currentCases(state).length} letters still open</span></div><div class="district-grid">${districts.map(districtCard).join("")}</div><div class="district-info"><div><span class="eyebrow">DISTRICT FOCUS</span><h3>${esc(district.name)}</h3><p>${esc(district.description)}</p></div><span class="district-big-icon" aria-hidden="true" style="--district:${district.color}">${district.icon}</span></div><div class="queue-list"><div class="list-heading"><h3>On the desk</h3><span>${open.length} open</span></div>${open.length ? open.map(caseCard).join("") : `<div class="empty-queue">No open letters here this week. ${resolvedHere.length ? `${resolvedHere.length} handled.` : "Try another district."}</div>`}</div><div class="residents"><h3>Neighbours here</h3><div class="resident-list">${residents.map(npc => `<div class="resident">${avatar(npc, true)}<span><strong>${esc(npc.name)}</strong><small>${esc(npc.job)}</small></span></div>`).join("")}</div></div></section><section class="detail-col" aria-label="Selected case">${caseDetail(item)}</section></div>`;
}

function sourcesView() {
  return `<section class="secondary-page"><span class="eyebrow">THE SOURCE SHELF</span><h2>Official pages, human decisions.</h2><p>These short cards explain the real-world facts referenced in a few fictional scenes. Each card links to its publisher. They were checked on 24 September 2026; review the source again before using it outside the game.</p><div class="source-grid">${sources.map(source => sourceCard(source)).join("")}</div><div class="note-panel"><strong>How this game uses sources</strong><p>Rules are fixed by their source and date. Your strategic choices concern time, communication, funding, and whose needs you can address. The fictional outcomes are part of the story.</p></div></section>`;
}

function journalView() {
  const entries = [...state.log].reverse();
  return `<section class="secondary-page"><span class="eyebrow">FIELD NOTES</span><h2>The city remembers.</h2><p>Choices, missed deadlines, and weekly costs appear here. A different role can produce a different history.</p><ol class="journal">${entries.map(entry => `<li class="journal-entry ${entry.kind}"><span class="journal-week">WEEK ${entry.week} · ${esc(entry.kind.toUpperCase())}</span><strong>${esc(entry.title || (entry.kind === "opening" ? "A new week" : entry.kind === "upkeep" ? "Keeping the lights on" : "Role action"))}</strong><p>${esc(entry.text)}</p></li>`).join("")}</ol></section>`;
}

function recapView() {
  if (!recap) return "";
  return `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="recap-title"><div class="recap-card"><span class="eyebrow">WEEK ${recap.from} COMPLETE</span><h2 id="recap-title">The city turns another page.</h2><p>${recap.missed.length ? `${recap.missed.length} case${recap.missed.length === 1 ? "" : "s"} passed their deadline. The queue keeps moving, even when you cannot.` : "Every letter on this week's desk received an answer."}</p>${recap.missed.length ? `<ul>${recap.missed.map(item => `<li>${esc(item.title)}</li>`).join("")}</ul>` : ""}<div class="recap-stats"><span>◈ Funds ${state.resources.funds}</span><span>♥ Trust ${state.resources.trust}</span><span>✦ Wellbeing ${state.resources.wellbeing}</span></div><button class="button primary" data-action="close-recap">${state.finished ? "Read the ending" : `Begin week ${state.week}`} →</button></div></div>`;
}

function endingView() {
  const ending = getEnding(state);
  return `<div class="ending-page"><header class="start-header"><span class="brand-mark">404</span><span>QUEUE CITY / THE LONG TUESDAY</span></header><main class="ending-main"><span class="sticker">FOUR WEEKS LATER</span><h1>${esc(ending.title)}</h1><p class="ending-summary">${esc(ending.summary)}</p><div class="ending-score"><span><strong>${ending.resolvedCount}</strong> of ${ending.totalCases} letters answered</span><span><strong>${state.resources.trust}</strong> trust</span><span><strong>${state.resources.wellbeing}</strong> wellbeing</span><span><strong>${state.resources.funds}</strong> funds</span></div><h2>Where everyone went</h2><div class="epilogues">${ending.epilogues.map((line, index) => `<article><span class="epilogue-number">0${index + 1}</span><p>${esc(line)}</p></article>`).join("")}</div><div class="speech"><span class="speech-who">YOUR ROLE</span><p>${esc(ending.roleLine)}</p></div><div class="ending-actions"><button class="button primary" data-action="reset">Try another role ↻</button><button class="button secondary" data-action="tab" data-tab="journal">Read your journal</button></div></main></div>`;
}

function gameView() {
  const role = roles[state.roleId];
  const week = weeks[state.week - 1];
  return `<div class="game-shell"><header class="game-header"><div class="game-brand"><span class="brand-mark">404</span><span><strong>QUEUE CITY</strong><small>THE LONG TUESDAY</small></span></div><div class="header-right"><span class="role-chip">${role.icon} ${esc(role.name)}</span><button class="header-reset" data-action="reset" title="Start a new game">Reset</button></div></header><div class="game-top"><div class="week-title"><span class="eyebrow">WEEK ${state.week} OF ${weeks.length} · ${esc(week.weather)}</span><h1>${esc(week.title)}</h1><p>${esc(week.bulletin)}</p></div><div class="machine-quote"><span class="machine-face" aria-hidden="true">:)</span><span>NO. 404 SAYS<br><strong>“${esc(week.quote)}”</strong></span></div></div><div class="toolbar"><div class="resources">${resource(state.resources.hours, "Hours", "⏱", "hours")}${resource(state.resources.funds, "Funds", "◈", "funds")}${resource(state.resources.trust, "Trust", "♥", "trust")}${resource(state.resources.wellbeing, "Wellbeing", "✦", "wellbeing")}</div><div class="week-actions">${state.finished ? `<button class="button primary" data-action="tab" data-tab="city">Back to ending →</button>` : `<button class="button power" data-action="power" ${canUsePower(state) ? "" : "disabled"} title="${esc(role.power.description)}">${esc(role.power.name)} ${state.powerUsed ? "✓" : "✧"}</button><button class="button end-week" data-action="end-week">End week →</button>`}</div></div>${nav()}<main class="game-main">${tab === "city" ? cityView() : tab === "sources" ? sourcesView() : journalView()}</main><footer class="game-footer"><span>Fictional Queue City · source links are official</span><span>Progress saves in this browser</span></footer>${recapView()}</div>`;
}

function render() {
  app.innerHTML = !state ? startView() : state.finished && !recap && tab !== "journal" ? endingView() : gameView();
  if (recap) document.querySelector('[data-action="close-recap"]')?.focus();
}

app.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === "start") { state = createGame(button.dataset.role); tab = "city"; districtId = "market"; selectedCaseId = null; persist(); }
  else if (action === "tab") { tab = button.dataset.tab; }
  else if (action === "district") { districtId = button.dataset.id; selectedCaseId = null; }
  else if (action === "case") { selectedCaseId = button.dataset.id; }
  else if (action === "close-case") { selectedCaseId = null; }
  else if (action === "choose") { state = choose(state, button.dataset.case, button.dataset.option); selectedCaseId = null; persist(); }
  else if (action === "power") { state = usePower(state); persist(); }
  else if (action === "end-week") {
    const from = state.week;
    const missed = currentCases(state);
    state = endWeek(state);
    recap = { from, missed };
    selectedCaseId = null;
    persist();
  }
  else if (action === "close-recap") { recap = null; tab = "city"; }
  else if (action === "reset") {
    if (!confirm("Start a new campaign? Your current progress will be replaced.")) return;
    state = null; recap = null; tab = "city"; selectedCaseId = null; persist();
  }
  render();
});

render();
