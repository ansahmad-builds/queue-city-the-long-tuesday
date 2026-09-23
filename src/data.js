export const roles = {
  advisor: {
    id: "advisor", name: "Advice-centre lead", icon: "✦", tagline: "Five chairs. One pen. Everybody's Tuesday.",
    description: "You have the most time to listen, but the centre's cash drawer makes a worrying echo.",
    start: { funds: 7, trust: 6, wellbeing: 5, hours: 6 },
    power: { name: "Source clinic", description: "Spend 1 hour to earn 2 trust by giving the city a careful public explanation.", cost: { hours: 1, funds: 0 }, impact: { trust: 2 } }
  },
  mayor: {
    id: "mayor", name: "Mayor", icon: "◆", tagline: "The budget is yours. So are the complaints.",
    description: "You can move money quickly. Getting people to believe you takes longer.",
    start: { funds: 12, trust: 3, wellbeing: 5, hours: 5 },
    power: { name: "Emergency grant", description: "Spend 1 hour and 2 funds to raise community wellbeing by 3.", cost: { hours: 1, funds: 2 }, impact: { wellbeing: 3 } }
  },
  founder: {
    id: "founder", name: "Co-op founder", icon: "✺", tagline: "Your neighbours will help. Your bank account objects.",
    description: "Your network is strong, your finances are fragile, and every favour will be remembered.",
    start: { funds: 5, trust: 6, wellbeing: 6, hours: 5 },
    power: { name: "Call the network", description: "Spend 1 fund to gain 2 hours this week. Once per week.", cost: { hours: 0, funds: 1 }, impact: { hours: 2 } }
  }
};

export const districts = [
  { id: "market", name: "Lantern Market", icon: "✳", color: "#f9b571", description: "Soup, signs, and twelve competing versions of the truth." },
  { id: "quay", name: "Ferry Quay", icon: "≈", color: "#80cbc4", description: "Everything arrives here, eventually." },
  { id: "workshop", name: "Workshop Row", icon: "⚙", color: "#b6a5de", description: "Where plans become wages and wages become questions." },
  { id: "steps", name: "North Steps", icon: "▤", color: "#b7d68b", description: "Library doors, late letters, and the longest queue." }
];

export const npcs = [
  { id: "nelli", name: "Nelli", job: "night-market cook", color: "#ef926d", district: "market", line: "Soup is a plan with steam." },
  { id: "miro", name: "Miro", job: "cycle courier", color: "#8bcad1", district: "quay", line: "I can deliver anything but certainty." },
  { id: "safa", name: "Safa", job: "engineer", color: "#a9a4e9", district: "workshop", line: "Please tell me what we know." },
  { id: "otso", name: "Otso", job: "workshop owner", color: "#d9a26c", district: "workshop", line: "The machines are easier than payroll." },
  { id: "aino", name: "Aino", job: "nurse", color: "#ee9db5", district: "steps", line: "A workable plan beats a perfect leaflet." },
  { id: "lili", name: "Lili", job: "student organiser", color: "#cfb2ea", district: "steps", line: "The library is not optional." },
  { id: "rami", name: "Rami", job: "musician", color: "#e9c46e", district: "market", line: "My invoice has a chorus." },
  { id: "veera", name: "Veera", job: "accountant", color: "#93b6d5", district: "steps", line: "A sentence can save a week." },
  { id: "kaiku", name: "Kaiku", job: "radio host", color: "#f0a981", district: "market", line: "If it rhymes, people repeat it." },
  { id: "paju", name: "Paju", job: "librarian", color: "#a8c78c", district: "steps", line: "Information needs a chair to sit in." },
  { id: "toma", name: "Toma", job: "ferry operator", color: "#8acac1", district: "quay", line: "The tide waits for no form." },
  { id: "ilo", name: "Ilo", job: "printer mechanic", color: "#e3b7b0", district: "workshop", line: "It's always the printer. Except when it isn't." }
];

export const sources = [
  { id: "vat-rates", publisher: "Vero", title: "Rates of VAT", checked: "24 Sep 2026", url: "https://vero.fi/en/businesses-and-corporations/taxes-and-charges/vat/rates-of-vat/", note: "The general VAT rate is 25.5%. Different goods and services can have different rates, so a mixed basket needs careful treatment." },
  { id: "prepayment-register", publisher: "Vero", title: "Prepayment register", checked: "24 Sep 2026", url: "https://www.vero.fi/en/businesses-and-corporations/business-operations/tax-administrations-registers--business/prepayment-register/", note: "A customer should check a seller's prepayment registration before paying for work or services; registration affects withholding responsibilities." },
  { id: "business-start", publisher: "PRH", title: "Starting a business", checked: "24 Sep 2026", url: "https://www.prh.fi/en/companiesandorganisations/yrityksen_perustaminen/perusilmoituksen_tekeminen.html", note: "The start-up notification and Business ID are distinct steps in establishing a business. The exact filing route depends on the business form." },
  { id: "capital-income", publisher: "Vero", title: "Capital income", checked: "24 Sep 2026", url: "https://www.vero.fi/en/individuals/tax-cards-and-tax-returns/income/capital-income/", note: "The page lists 30% on capital income up to €30,000 and 34% on the portion above that threshold." }
];

export const weeks = [
  { number: 1, title: "The queue grows legs", weather: "Bright, with a chance of envelopes", bulletin: "The queue-ticket machine has left the building. It claims this improves access. Four neighbours need a decision before Friday.", quote: "I am not missing. I am improving the route." },
  { number: 2, title: "The poster war", weather: "Paper flurries", bulletin: "Three contradictory posters have appeared around town. Nobody knows who printed them. Everyone knows who to blame.", quote: "A poster can be wrong at a very impressive size." },
  { number: 3, title: "The flood of envelopes", weather: "Rain, then more rain", bulletin: "The ferry is late, the printer is loud, and small delays are joining hands. This is the week your earlier promises come due.", quote: "The envelopes have formed a union." },
  { number: 4, title: "The long Tuesday", weather: "Clear after the storm", bulletin: "The town is watching what you built: a fast office, a careful one, a generous one, or a closed one. One week remains.", quote: "Please take a number. Please also take a breath." }
];

export const cases = [
  {
    id: "mixed-market", week: 1, district: "market", npcs: ["nelli", "miro"], sourceIds: ["vat-rates"], urgency: "Friday launch",
    title: "One sign for every stall?", scene: "Nelli sells soup. Ilo sells cleaning kits. Miro has printed one price sign for both. The market opens Friday, and nobody wants to buy more paper.",
    dialogue: "NELLI: ‘If the sign is wrong, tell me before the soup has a fan club.’",
    options: [
      { id: "separate", label: "Check categories and print separate signs", forecast: "Slower and safer; the market can explain its prices.", cost: { hours: 2, funds: 1 }, impact: { trust: 2, wellbeing: 1 }, flags: ["market_clear"], result: "Veera helps Nelli separate the goods and label them clearly. Miro grumbles, then delivers the right signs." },
      { id: "single", label: "Use one convenient sign", forecast: "Saves time now; confusion may return.", cost: { hours: 1, funds: 0 }, impact: { trust: -1, funds: 1 }, flags: ["market_rushed"], result: "The sign goes up quickly. So do the questions. Nelli sells soup while explaining the sign to every second customer." },
      { id: "delay", label: "Postpone the stall opening", forecast: "Protects accuracy but costs Nelli a trading day.", cost: { hours: 1, funds: 1 }, impact: { trust: 1, wellbeing: -1 }, flags: ["market_delayed"], result: "Nelli gets time to fix the sign, but the Friday crowd finds an empty counter." },
      { id: "clerk", label: "Fund a market information clerk", roles: ["mayor"], forecast: "Expensive; helps every stall, not only Nelli.", cost: { hours: 1, funds: 3 }, impact: { trust: 2, wellbeing: 2 }, flags: ["market_clear", "public_clerk"], result: "A clerk takes the desk. By lunchtime the rumours have fewer places to hide." }
    ]
  },
  {
    id: "courier-invoice", week: 1, district: "quay", npcs: ["miro", "otso"], sourceIds: ["prepayment-register"], urgency: "Payment due",
    title: "The courier's invoice", scene: "Otso owes Miro for an urgent delivery. The invoice is ready; the registration check is not. Miro needs the money, and Otso needs to pay correctly.",
    dialogue: "MIRO: ‘My bicycle has made the delivery. Can the paperwork catch up?’",
    options: [
      { id: "check", label: "Check the public register before payment", forecast: "Costs time; clarifies the payment route.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 1 }, flags: ["miro_checked"], result: "The registration status is confirmed before Otso pays. Miro gets a clear explanation, not a shrug." },
      { id: "guess", label: "Tell Otso to pay without checking", forecast: "Fast, but shifts uncertainty onto both of them.", cost: { hours: 1, funds: 0 }, impact: { trust: -2, funds: 1 }, flags: ["miro_risk"], result: "The money moves. So does the worry. Veera adds the invoice to her growing correction pile." },
      { id: "bridge", label: "Cover Miro's urgent need while checking", forecast: "Kind and careful, but uses scarce funds.", cost: { hours: 2, funds: 2 }, impact: { trust: 1, wellbeing: 2 }, flags: ["miro_checked", "miro_supported"], result: "The co-op bridge fund buys time. The register is checked before the invoice is settled." },
      { id: "network", label: "Ask members to help Miro today", roles: ["founder"], forecast: "Uses your network instead of cash; members lose time elsewhere.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 1 }, flags: ["miro_supported"], result: "Co-op members carry Miro's next deliveries while the payment route is clarified." }
    ]
  },
  {
    id: "safa-envelope", week: 1, district: "workshop", npcs: ["safa", "otso"], sourceIds: [], urgency: "First payroll",
    title: "The envelope with no date", scene: "Safa has started at Otso's workshop. The payroll folder contains two versions of a document and no clear date. Otso wants an answer before closing time.",
    dialogue: "SAFA: ‘I don't need a heroic promise. I need to know which document is missing.’",
    options: [
      { id: "verify", label: "Confirm the date and request the right document", forecast: "Careful but time-consuming.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 1 }, flags: ["safa_verified"], result: "Safa and Otso leave with a concrete document list and a real deadline." },
      { id: "assume", label: "Assume the newer-looking paper applies", forecast: "Clears the desk quickly; uncertainty remains.", cost: { hours: 1, funds: 0 }, impact: { trust: -2, funds: 1 }, flags: ["safa_assumed"], result: "The answer sounds confident. Safa notices the date is still missing." },
      { id: "refer", label: "Book a specialist and explain the delay", forecast: "Uses funds but protects the decision.", cost: { hours: 1, funds: 2 }, impact: { trust: 1, wellbeing: 1 }, flags: ["safa_verified"], result: "A specialist takes the complex question. Otso does not love the delay, but he understands it." },
      { id: "clinic", label: "Open an urgent source clinic", roles: ["advisor"], forecast: "Your staff can help both sides check the record.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 2 }, flags: ["safa_verified", "clinic_open"], result: "The clinic checks the paperwork with Safa present. Nothing is guessed on her behalf." }
    ]
  },
  {
    id: "library-lights", week: 1, district: "steps", npcs: ["lili", "paju", "aino"], sourceIds: [], urgency: "Event tonight",
    title: "Lights at the library", scene: "Lili's free evening event has no room attendant. Paju can open the doors, but only if someone covers the desk. Aino offers one hour after her shift.",
    dialogue: "PAJU: ‘The library is everyone's living room. Living rooms still need a key.’",
    options: [
      { id: "cover", label: "Send a staff member to cover the desk", forecast: "A strong community win; staff time disappears.", cost: { hours: 2, funds: 0 }, impact: { wellbeing: 2, trust: 1 }, flags: ["library_open"], result: "The lights stay on. Lili's event fills the room with people who needed it." },
      { id: "pay", label: "Pay for an evening attendant", forecast: "Preserves time, spends cash.", cost: { hours: 1, funds: 2 }, impact: { wellbeing: 2, trust: 1 }, flags: ["library_open"], result: "An attendant takes the desk. Paju watches the room fill and stops pretending not to smile." },
      { id: "cancel", label: "Cancel tonight and promise another date", forecast: "Protects resources, costs momentum.", cost: { hours: 1, funds: 0 }, impact: { wellbeing: -2, trust: -1 }, flags: ["library_closed"], result: "Lili folds the posters. Some people hear the promise of a new date; others only see the locked door." }
    ]
  },
  {
    id: "poster-war", week: 2, district: "market", npcs: ["kaiku", "veera", "nelli"], sourceIds: ["vat-rates"], urgency: "Radio at noon",
    title: "Three posters, one microphone", scene: "Kaiku finds three posters claiming three different rules. One is from an old year. Her noon broadcast can reach everyone, but she needs a sentence worth repeating.",
    dialogue: "KAIKU: ‘If it rhymes, people repeat it. Can accuracy rhyme?’",
    introIf: { flag: "market_clear", text: "Nelli's clear labels give Kaiku a useful example." },
    options: [
      { id: "broadcast", label: "Check dates and write a precise explainer", forecast: "Costs time; reaches the whole city.", cost: { hours: 2, funds: 1 }, impact: { trust: 3, wellbeing: 1 }, modifiers: [{ flag: "market_clear", cost: { hours: -1 }, note: "Nelli's clear market sign gives Kaiku a ready example." }, { flag: "market_rushed", cost: { hours: 1 }, note: "The rushed sign takes extra time to correct publicly." }], flags: ["radio_clear"], result: "Kaiku reads the correction twice. The first time is for accuracy; the second is because it fits the tune." },
      { id: "clinics", label: "Offer individual appointments instead", forecast: "Deeper help for fewer people.", cost: { hours: 3, funds: 0 }, impact: { trust: 2, wellbeing: 2 }, flags: ["appointments_open"], result: "Veera's appointment list fills. The radio remains quiet, but several residents get a real conversation." },
      { id: "quick", label: "Pick the newest-looking poster", forecast: "Fast broadcast; date uncertainty stays.", cost: { hours: 1, funds: 0 }, impact: { trust: -2, funds: 1 }, flags: ["radio_wrong"], result: "Kaiku goes live. Later, Veera circles the date in red ink so hard the pen gives up." },
      { id: "fund", label: "Fund a citywide notice audit", roles: ["mayor"], forecast: "Broad fix, substantial spending.", cost: { hours: 1, funds: 3 }, impact: { trust: 3, wellbeing: 2 }, flags: ["radio_clear", "audit_funded"], result: "Every public board is checked. Kaiku announces what changed and where to read more." }
    ]
  },
  {
    id: "co-op-form", week: 2, district: "workshop", npcs: ["otso", "ilo", "safa"], sourceIds: ["business-start"], urgency: "Meeting tomorrow",
    title: "A workshop with three names", scene: "Otso, Safa, and Ilo want to spin a repair group out of the workshop. They have three names, two forms, and one printer that is threatening to become a boat.",
    dialogue: "ILO: ‘I can fix the printer. I cannot fix a form we never filed.’",
    options: [
      { id: "route", label: "Check the business form and filing route", forecast: "Careful start; consumes scarce advice time.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 1 }, modifiers: [{ flag: "safa_verified", cost: { hours: -1 }, impact: { trust: 1 }, note: "Safa brings the organised folder you helped create." }], flags: ["coop_prepared"], result: "The group leaves with a filing route and a list of unresolved decisions, not a made-up Business ID." },
      { id: "rush", label: "Print the logo and announce the launch", forecast: "Morale today; paperwork tomorrow.", cost: { hours: 1, funds: 0 }, impact: { trust: -1, funds: 1 }, flags: ["coop_rushed"], result: "The logo is excellent. The unanswered registration question is less excellent." },
      { id: "mentor", label: "Bring in a business mentor", forecast: "Spends cash but builds capacity.", cost: { hours: 1, funds: 2 }, impact: { trust: 1, wellbeing: 2 }, flags: ["coop_prepared", "mentor_found"], result: "A mentor helps the trio separate the idea, the registration, and the first invoice." },
      { id: "host", label: "Host the group at your co-op", roles: ["founder"], forecast: "Uses your space and time; builds a lasting ally.", cost: { hours: 2, funds: 1 }, impact: { trust: 2, wellbeing: 2 }, flags: ["coop_prepared", "coop_alliance"], result: "The workshop group gains a table, a mentor, and a co-op willing to call them back." }
    ]
  },
  {
    id: "rami-contract", week: 2, district: "market", npcs: ["rami", "nelli"], sourceIds: ["prepayment-register"], urgency: "Show on Saturday",
    title: "The contract with a chorus", scene: "Rami will perform at Nelli's stall. They agree on the music but not the payment paperwork. A rumour says artists are exempt from every form ever invented.",
    dialogue: "RAMI: ‘That rumour has a catchy hook. Is it true?’",
    options: [
      { id: "check", label: "Check the arrangement and registration", forecast: "Prevents a catchy mistake.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 1 }, modifiers: [{ flag: "market_clear", cost: { hours: -1 }, note: "Nelli already has a habit of checking the details." }], flags: ["rami_paid_clearly"], result: "Rami and Nelli agree on a documented payment route before the first song." },
      { id: "promise", label: "Let the rumour settle the paperwork", forecast: "Fast; leaves both parties exposed to confusion.", cost: { hours: 1, funds: 0 }, impact: { trust: -2, funds: 1 }, flags: ["rami_unclear"], result: "The show goes ahead. The paperwork returns for an encore nobody requested." },
      { id: "postpone", label: "Move the show to next week", forecast: "Creates time but hurts the market's draw.", cost: { hours: 1, funds: 1 }, impact: { trust: 1, wellbeing: -1 }, flags: ["rami_delayed"], result: "Rami keeps rehearsing while Nelli explains the empty stage." }
    ]
  },
  {
    id: "aino-hours", week: 2, district: "steps", npcs: ["aino", "lili", "paju"], sourceIds: [], urgency: "Shift decision",
    title: "Aino's impossible calendar", scene: "Aino can cover a library shift or take an extra hospital shift. Lili needs the library. Aino needs income. Both choices matter to her.",
    dialogue: "AINO: ‘Please don't tell me what a good person would do. Help me make a plan.’",
    options: [
      { id: "cover-income", label: "Pay for library cover so Aino can work", forecast: "Protects both needs; costs funds.", cost: { hours: 1, funds: 2 }, impact: { wellbeing: 2, trust: 1 }, flags: ["aino_supported", "library_open"], result: "Aino takes the paid shift. The library keeps its lights on without asking her to do two jobs at once." },
      { id: "pressure", label: "Ask Aino to volunteer anyway", forecast: "Saves money, transfers the cost to her.", cost: { hours: 1, funds: 0 }, impact: { wellbeing: -2, trust: -1 }, flags: ["aino_overstretched"], result: "Aino says yes. She looks exhausted by the time she finishes saying it." },
      { id: "roster", label: "Build a shared volunteer rota", forecast: "Uses time now; may help later weeks.", cost: { hours: 2, funds: 0 }, impact: { wellbeing: 1, trust: 2 }, modifiers: [{ flag: "library_open", cost: { hours: -1 }, note: "The first event brought willing helpers together." }], flags: ["library_rota", "aino_supported"], result: "Five neighbours take short shifts. Aino gets to choose, rather than be cornered." },
      { id: "grant", label: "Create an evening-access grant", roles: ["mayor"], forecast: "A structural answer with a price tag.", cost: { hours: 1, funds: 3 }, impact: { wellbeing: 3, trust: 2 }, flags: ["library_grant", "aino_supported"], result: "Paju can schedule the room without rebuilding the plan around Aino each week." }
    ]
  },
  {
    id: "ferry-delay", week: 3, district: "quay", npcs: ["toma", "nelli", "miro"], sourceIds: [], urgency: "Supplies today",
    title: "The ferry, the soup, the storm", scene: "A storm holds Toma's ferry. Nelli's market supplies are aboard. Miro can cycle a smaller load, but only if someone coordinates the route.",
    dialogue: "TOMA: ‘The sea has declined your request for punctuality.’",
    options: [
      { id: "route", label: "Coordinate Miro's emergency route", forecast: "Saves the market; costs time and a little cash.", cost: { hours: 2, funds: 1 }, impact: { wellbeing: 2, trust: 1 }, modifiers: [{ flag: "miro_supported", cost: { hours: -1 }, impact: { wellbeing: 1 }, note: "Miro's earlier support means his route is ready." }], flags: ["ferry_rerouted"], result: "Miro arrives soaked and triumphant. Nelli names a soup after him. He asks her not to." },
      { id: "wait", label: "Wait for the ferry", forecast: "Conserves resources; market stalls lose their day.", cost: { hours: 1, funds: 0 }, impact: { wellbeing: -2 }, flags: ["ferry_waited"], result: "The ferry returns safely. The market has already closed." },
      { id: "buy", label: "Buy replacement supplies nearby", forecast: "Fast but expensive.", cost: { hours: 1, funds: 3 }, impact: { wellbeing: 2 }, flags: ["market_supplied"], result: "The stall opens. Nelli thanks the town and asks the budget not to tell her the total." }
    ]
  },
  {
    id: "printer-strike", week: 3, district: "workshop", npcs: ["ilo", "safa", "otso"], sourceIds: [], urgency: "Forms due",
    title: "The printer declares independence", scene: "Ilo's printer produces only seagulls. The workshop has a deadline; the library has the last working machine. Moving the queue moves the problem.",
    dialogue: "ILO: ‘It says it wants a window and a title. I say it needs a new roller.’",
    options: [
      { id: "repair", label: "Help Ilo repair it properly", forecast: "Time-intensive; restores future capacity.", cost: { hours: 3, funds: 1 }, impact: { wellbeing: 2, trust: 1 }, modifiers: [{ flag: "coop_prepared", cost: { hours: -1 }, impact: { trust: 1 }, note: "The prepared repair group can lend a hand." }], flags: ["printer_fixed"], result: "The printer works. It produces one final seagull as a farewell." },
      { id: "library", label: "Move the forms to the library", forecast: "Quick for the workshop; burdens Paju's desk.", cost: { hours: 1, funds: 0 }, impact: { wellbeing: -1, trust: 1 }, flags: ["library_overloaded"], result: "The forms print. Paju adds ‘temporary print factory’ to her job description." },
      { id: "new", label: "Buy a replacement", forecast: "Protects the deadline; spends heavily.", cost: { hours: 1, funds: 3 }, impact: { wellbeing: 2 }, flags: ["printer_fixed"], result: "The deadline is met. Ilo keeps the old printer as a very small, very loud table." },
      { id: "members", label: "Use the co-op's shared machine", roles: ["founder"], forecast: "Low cash cost; members lose production time.", cost: { hours: 2, funds: 0 }, impact: { wellbeing: 1, trust: 2 }, flags: ["printer_fixed", "coop_alliance"], result: "The co-op prints the forms. Ilo repairs the printer in return." }
    ]
  },
  {
    id: "safa-followup", week: 3, district: "workshop", npcs: ["safa", "veera", "otso"], sourceIds: [], urgency: "Payroll closes",
    title: "The missing date returns", scene: "Veera finds the missing date in Safa's file. If the first answer was guessed, the correction now needs care. If it was checked, the team can move on.",
    dialogue: "VEERA: ‘Facts are kinder when we make room for them early.’",
    introIf: { flag: "safa_verified", text: "Your earlier document check means Safa already knows what to expect." },
    options: [
      { id: "explain", label: "Explain the finding to both sides", forecast: "Honesty builds durable trust.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 1 }, modifiers: [{ flag: "safa_verified", cost: { hours: -1 }, impact: { trust: 1 }, note: "The earlier document check makes this conversation easier." }, { flag: "safa_assumed", cost: { hours: 1 }, note: "An earlier guess must be corrected first." }], flags: ["safa_resolved"], result: "Safa and Otso hear the same explanation. The folder finally has a date on its front." },
      { id: "memo", label: "Send a short memo and close the file", forecast: "Saves time; leaves questions unanswered.", cost: { hours: 1, funds: 0 }, impact: { trust: -1 }, flags: ["safa_memo"], result: "The memo is filed. Safa reads it twice, then asks Veera for the conversation it replaced." },
      { id: "meeting", label: "Bring Veera into a joint meeting", forecast: "Costs funds; prevents conflicting messages.", cost: { hours: 1, funds: 2 }, impact: { trust: 2, wellbeing: 2 }, flags: ["safa_resolved", "veera_joined"], result: "Veera translates the paperwork into a plan everyone can repeat." }
    ]
  },
  {
    id: "capital-rumour", week: 3, district: "steps", npcs: ["veera", "kaiku", "paju"], sourceIds: ["capital-income"], urgency: "Rumour spreading",
    title: "The thirty-thousand-euro rumour", scene: "A flyer says all capital income is taxed at one flat rate. Veera knows the official page describes a threshold. Kaiku can correct it, but the radio slot is short.",
    dialogue: "VEERA: ‘A threshold is not a magic trapdoor. Please give me one sentence.’",
    options: [
      { id: "explain", label: "Make a short, sourced threshold explainer", forecast: "Accurate public information costs time.", cost: { hours: 2, funds: 0 }, impact: { trust: 2, wellbeing: 1 }, modifiers: [{ flag: "radio_clear", cost: { hours: -1 }, note: "Kaiku already has a trusted correction format." }], flags: ["capital_clear"], result: "The library and radio share the same clear explanation and source link." },
      { id: "ignore", label: "Focus on individual cases instead", forecast: "People in the queue get help; the rumour travels.", cost: { hours: 1, funds: 0 }, impact: { wellbeing: 1, trust: -1 }, flags: ["capital_rumour"], result: "Three people leave with good answers. Thirty others keep the flyer." },
      { id: "poster", label: "Print a correction without a source", forecast: "Quick reach, weaker credibility.", cost: { hours: 1, funds: 1 }, impact: { trust: 0 }, flags: ["capital_poster"], result: "A new poster joins the old one. Paju asks which one visitors are meant to believe." }
    ]
  },
  {
    id: "city-forum", week: 4, district: "steps", npcs: ["kaiku", "paju", "lili", "veera"], sourceIds: [], urgency: "Tonight's forum",
    title: "A room for the whole city", scene: "Lili organises a public forum. The room is small, the questions are not. Kaiku offers a live broadcast; Paju worries that quieter voices will disappear.",
    dialogue: "LILI: ‘If everyone can speak, can anyone be heard?’",
    options: [
      { id: "small-groups", label: "Run small groups with facilitators", forecast: "Inclusive but staff-intensive.", cost: { hours: 3, funds: 1 }, impact: { trust: 2, wellbeing: 2 }, modifiers: [{ flag: "library_rota", cost: { hours: -1 }, note: "The library volunteers already know how to host a room." }], flags: ["forum_listened"], result: "The room becomes four conversations. The quietest table produces the clearest idea." },
      { id: "broadcast", label: "Broadcast a brisk town-hall session", forecast: "Broad reach, less room for individual stories.", cost: { hours: 1, funds: 1 }, impact: { trust: 1, wellbeing: 1 }, flags: ["forum_broadcast"], result: "The whole city hears the forum. Paju keeps a notebook for voices that ran out of airtime." },
      { id: "cancel", label: "Cancel and clear the urgent queue", forecast: "Protects casework; public frustration rises.", cost: { hours: 1, funds: 0 }, impact: { trust: -2, wellbeing: 1 }, flags: ["forum_cancelled"], result: "The queue moves faster. The city still wants a room to talk in." }
    ]
  },
  {
    id: "market-future", week: 4, district: "market", npcs: ["nelli", "rami", "miro"], sourceIds: ["vat-rates", "prepayment-register"], urgency: "Next season",
    title: "A market that lasts", scene: "Nelli's market survived its first weeks. Rami wants regular shows, Miro wants reliable deliveries, and the stalls need a system that survives beyond one heroic Friday.",
    dialogue: "NELLI: ‘I would like a plan with fewer miracles and more soup.’",
    options: [
      { id: "system", label: "Create a shared checklist and payment process", forecast: "Slow today; strong next season.", cost: { hours: 3, funds: 1 }, impact: { trust: 2, wellbeing: 2 }, modifiers: [{ flag: "market_clear", cost: { hours: -1 }, note: "The first clear sign becomes the checklist's opening page." }, { flag: "rami_paid_clearly", impact: { wellbeing: 1 }, note: "Rami brings a payment process that already works." }], flags: ["market_system"], result: "The market writes down what worked. Miro calls this the least glamorous revolution he has ever delivered." },
      { id: "subsidy", label: "Cover the next market weekend", forecast: "Immediate relief; little structural change.", cost: { hours: 1, funds: 3 }, impact: { wellbeing: 2 }, flags: ["market_subsidy"], result: "Another weekend is safe. Nelli puts the next one on the calendar with a question mark." },
      { id: "leave", label: "Let the stalls manage independently", forecast: "Frees your capacity; uneven results.", cost: { hours: 1, funds: 0 }, impact: { trust: -1, funds: 1 }, flags: ["market_alone"], result: "Some stalls thrive. Others spend Sunday reconstructing Friday's paperwork." },
      { id: "market-office", label: "Fund a permanent market desk", roles: ["mayor"], forecast: "Expensive, durable public capacity.", cost: { hours: 1, funds: 4 }, impact: { trust: 2, wellbeing: 3 }, flags: ["market_system"], result: "The market gains a small desk with a big folder. Nelli brings soup to its first shift." }
    ]
  },
  {
    id: "workshop-future", week: 4, district: "workshop", npcs: ["otso", "safa", "ilo"], sourceIds: ["business-start"], urgency: "Ownership meeting",
    title: "Who owns the next chapter?", scene: "The repair group can become a durable enterprise, stay an informal side project, or fold into Otso's workshop. Each choice changes who gets a say.",
    dialogue: "SAFA: ‘I want my name on the plan, not only on the rota.’",
    options: [
      { id: "shared", label: "Support a documented shared plan", forecast: "Takes time and cash; distributes voice.", cost: { hours: 3, funds: 1 }, impact: { trust: 2, wellbeing: 2 }, modifiers: [{ flag: "coop_prepared", cost: { hours: -1 }, note: "The group already knows which filing questions remain." }, { flag: "coop_rushed", cost: { hours: 1 }, note: "The premature launch created paperwork to unwind." }], flags: ["workshop_shared"], result: "The group agrees on responsibilities and seeks the correct filing path before announcing a new enterprise." },
      { id: "owner", label: "Keep the project under Otso for now", forecast: "Efficient; Safa and Ilo get less control.", cost: { hours: 1, funds: 0 }, impact: { funds: 1, wellbeing: -1 }, flags: ["workshop_owner"], result: "The work continues. Safa asks when ‘for now’ ends." },
      { id: "pause", label: "Pause the venture until the team is ready", forecast: "Avoids a rushed decision; loses momentum.", cost: { hours: 1, funds: 0 }, impact: { trust: 1, wellbeing: -1 }, flags: ["workshop_paused"], result: "Nobody signs a plan they do not understand. The tools stay on the shelf a little longer." }
    ]
  },
  {
    id: "north-steps", week: 4, district: "steps", npcs: ["aino", "lili", "paju"], sourceIds: [], urgency: "Final budget",
    title: "The last line of the budget", scene: "The library's evening hours can survive only if somebody owns the rota. Aino refuses to be the invisible solution again. Lili and Paju ask for a lasting arrangement.",
    dialogue: "AINO: ‘Make a system. I can be a person in it.’",
    options: [
      { id: "staff", label: "Fund a rotating paid attendant", forecast: "Fair and durable; costly.", cost: { hours: 2, funds: 3 }, impact: { trust: 2, wellbeing: 3 }, flags: ["library_future"], result: "The library publishes a real rota. Aino attends an event as a guest for the first time." },
      { id: "volunteers", label: "Formalise a voluntary rota with limits", forecast: "Affordable; depends on continued energy.", cost: { hours: 2, funds: 1 }, impact: { trust: 1, wellbeing: 2 }, modifiers: [{ flag: "library_rota", cost: { hours: -1 }, impact: { trust: 1 }, note: "The earlier rota gives Paju a fair starting point." }], flags: ["library_future"], result: "No one is assumed to be available forever. Paju writes that rule at the top." },
      { id: "close", label: "Return to daytime hours", forecast: "Balances the budget; closes a door for some residents.", cost: { hours: 1, funds: 0 }, impact: { funds: 2, wellbeing: -2, trust: -1 }, flags: ["library_daytime"], result: "The budget balances. Lili studies the locked evening door on her way home." }
    ]
  }
];
