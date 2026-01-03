import "./style.css";
import { appTemplate } from "./appTemplate";
import { renderRadarChart } from "./charting";
import { exportResultsPdf } from "./pdfExport";

const root = document.querySelector("#app");
root.innerHTML = appTemplate;

// Optioneel logo in PDF (base64 PNG). Laat leeg als niet nodig.
const SUPPLY_VALUE_LOGO = ""; // bijv: "data:image/png;base64,AAA..."

// Email address for notifications (from environment variable)
// Set VITE_NOTIFICATION_EMAIL in .env to enable backend notifications
const NOTIFICATION_EMAIL = import.meta.env.VITE_NOTIFICATION_EMAIL || "";

// --- Domeinmodel overgenomen uit het React-artifact ---
const DIMENSIONS = [
  {
    key: "warehouse",
    label: "Magazijn & Voorraadbeheer",
    q1: "Hoe worden voorraden en tellingen beheerd?",
    q2: "Welke mate van systeemondersteuning is aanwezig?",
    advice: {
      1: "Leg basisprocessen vast (tellen, min/max), creëer één bron van waarheid en start met servicegraad & voorraadnauwkeurigheid meten.",
      2: "Formaliseer werkwijzen, borg datakwaliteit en start eenvoudige rapportages. Zet stap naar WMS-configuratie en ABC/XYZ-segmentatie.",
      3: "Koppel WMS aan ERP, analyseer rotatie & drempelwaarden periodiek en betrek stakeholders bij structurele verbeteringen.",
      4: "Introduceer voorspellend replenishment en ketenafstemming op voorraaddoelstellingen; werk naar realtime zicht en exception-based sturing.",
      5: "Borg predictive & automatische aanvulling, schaal best practices ketenbreed en innoveer met IoT/AI (continu verbeteren)."
    },
    q1Scale: [
      "Ad-hoc, incidentele tellingen, afwijkingen achteraf",
      "Basisinventarisatie, structurele analyse per periode",
      "Gestandaardiseerd met vaste cycli en KPI’s",
      "Realtime inzicht per locatie, afwijkingen direct",
      "Voorspellend & drempelgestuurd, autonoom bijsturen"
    ],
    q2Scale: [
      "Losse Excelbestanden zonder compleet overzicht",
      "Basis-WMS zonder koppelingen",
      "Implementatie WMS-ERP koppeling",
      "Geïntegreerd WMS met dashboards",
      "Geavanceerd, datagedreven & ketenkoppelingen"
    ]
  },
  {
    key: "transport",
    label: "Transport & Distributie",
    q1: "Hoe wordt transport gepland en aangestuurd?",
    q2: "Welke zichtbaarheid/optimalisatie is beschikbaar?",
    advice: {
      1: "Wijs een transportplanner aan, standaardiseer weekplanning en start met OTIF/leverbetrouwbaarheid meten.",
      2: "Implementeer basis-TMS, definieer KPI-deck en maak prestaties zichtbaar voor operatie en management.",
      3: "Integreer TMS end-to-end, voer route-optimalisatie in en borg vaste procesafspraken met 3PL/4PL.",
      4: "Werk met realtime track & trace, exception management en gezamenlijke verbeterborden met partners.",
      5: "Schaal naar netwerk-optimalisatie, gezamenlijke planning en continue verbetering over partners heen."
    },
    q1Scale: [
      "Ad-hoc, firefighting en spoedritten",
      "Korte-termijnplanning, sporadische KPI’s",
      "Structureel met KPI’s en TMS in gebruik",
      "3PL/4PL-integratie in TMS (realtime)",
      "Voorspellende ETA & realtime route-optimalisatie"
    ],
    q2Scale: [
      "Beperkt zicht, achteraf rapporteren",
      "Basale statusupdates",
      "Dashboards per route/klant",
      "Realtime 3PL/4PL-integratie",
      "ETA-alerts & realtime optimalisatie"
    ]
  },
  {
    key: "planning",
    label: "Planning",
    q1: "Hoe vindt afstemming tussen sales, operations en logistiek plaats?",
    q2: "Hoe wordt data geïntegreerd in besluitvorming?",
    advice: {
      1: "Start maandelijkse S&OP met vaste agenda, rollen en één dataset (single source of truth).",
      2: "Standaardiseer KPI’s (forecast accuracy/bias, OTIF) en borg dat elke meeting besluiten en acties oplevert.",
      3: "Verrijk S&OP met externe signalen (klantforecast/POS), voer scenario-analyse in en verkort besluitcycli.",
      4: "Schakel naar IBP: betrek Finance en link tactische beslissingen aan strategische doelen en capaciteiten.",
      5: "Continue verbeterende voorloper die kennis deelt met partners voor optimalisatie in de keten."
    },
    q1Scale: [
      "Geen vaste afstemming, ad-hoc overleg",
      "Periodiek overleg op ervaring",
      "Gestandaardiseerd S&OP-ritme",
      "S&OP met externe data en duidelijke besluiten",
      "Integrated Business Planning"
    ],
    q2Scale: [
      "Ad-hoc of op gevoel",
      "Basisdata, enkele historische analyse",
      "Kern-KPI’s en trendanalyses",
      "Scenario’s met markt-/klantdata",
      "Realtime integratie & financiële koppeling"
    ]
  },
  {
    key: "itdata",
    label: "IT & Datagedreven Werken",
    q1: "Hoe is de datagrondslag en rapportage ingericht?",
    q2: "Welke mate van systeemintegratie/analytics is er?",
    advice: {
      1: "Centraliseer kerngegevens en start datakwaliteit; maak eenvoudige, consistente rapportages.",
      2: "Kies standaarden en koppel eerste systemen (ERP↔WMS/TMS); digitaliseer tijdrovende stappen.",
      3: "Automatiseer managementdashboards en vergroot adoptie; borg master-data governance.",
      4: "Verbind processen end-to-end; stuur beslissingen datagedreven en deel inzichten verantwoord.",
      5: "Integreer realtime met partners; AI voor voorspelling en exception-based beslissingen (human-in-the-loop)."
    },
    q1Scale: [
      "Excel-eilandjes, handmatige rapportage",
      "Basisdatamodel, enkele standaarden",
      "Standaard periodieke analyses in centrale KPI-dashboards",
      "Realtime inzichten voor besluitvorming",
      "Automated workflows/AI-predictive analytics"
    ],
    q2Scale: [
      "Losse systemen, geen koppelingen",
      "Enkele koppelingen",
      "ERP/WMS/TMS grotendeels gekoppeld",
      "End-to-end integratie intern",
      "Automated workflows & AI-integratie"
    ]
  },
  {
    key: "collab",
    label: "Ketenregie & Samenwerking",
    q1: "Hoe werken jullie met leveranciers/klanten/3PL samen?",
    q2: "In welke mate bestaan gedeelde KPI’s en gezamenlijke besluitvorming?",
    advice: {
      1: "Start periodiek partneroverleg en deel basisinformatie om vertrouwen op te bouwen.",
      2: "Leg gezamenlijke doelstellingen vast en formaliseer overlegstructuren.",
      3: "Introduceer gedeelde processen en KPI’s; intensiveer data-integratie met kernpartners.",
      4: "Bouw strategische partnerships met gezamenlijke investeringen, transparantie en governance.",
      5: "Regisseer de keten als ecosysteem met realtime informatie en continue verbetering/gain-share."
    },
    q1Scale: [
      "Transactiegericht, ad-hoc afstemming",
      "Operationele afstemming bij issues",
      "Structurele info-uitwisseling",
      "Strategische samenwerkingsprogramma’s",
      "Ecosysteem met gedeelde data"
    ],
    q2Scale: [
      "Geen gezamenlijke KPI’s",
      "Incidentele KPI-afspraken",
      "KPI’s op OTIF/voorraad/kosten",
      "Gezamenlijke governance en besluiten",
      "Volledig ketenregime & slimme contracten"
    ]
  }
];

// --- State ---
const answers = {};
DIMENSIONS.forEach(d => { answers[d.key] = { q1: null, q2: null }; });

let tried = false;
let submitted = false;
let notified = false;
let radarChart = null;

// --- Helpers ---
function emailValid(email) {
  const e = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(e);
}

function allQuestionsAnswered() {
  return DIMENSIONS.every(d => answers[d.key].q1 && answers[d.key].q2);
}

function allAnsweredAndValid() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const consent = document.getElementById("consent").checked;
  return allQuestionsAnswered() && name && emailValid(email) && consent;
}

function levelFromValues(q1, q2) {
  const v1 = q1 || 0;
  const v2 = q2 || 0;
  const avg = (v1 + v2) / 2;
  const lvl = Math.round(avg || 1);
  return Math.max(1, Math.min(5, lvl));
}

function calcResults() {
  return DIMENSIONS.map(d => {
    const q1 = answers[d.key].q1;
    const q2 = answers[d.key].q2;
    const level = levelFromValues(q1, q2);
    const next = level >= 5 ? 5 : level + 1;
    return {
      key: d.key,
      label: d.label,
      level,
      nextAdvice: d.advice[next]
    };
  });
}

function maturityLabel(level) {
  if (level <= 1) return "Niveau 1 – Ad-hoc";
  if (level === 2) return "Niveau 2 – Basis";
  if (level === 3) return "Niveau 3 – Gestandaardiseerd";
  if (level === 4) return "Niveau 4 – Geïntegreerd";
  return "Niveau 5 – Vooruitstrevend";
}

function narrativeFromResults(results) {
  const low = results.filter(r => r.level <= 3);
  const high = results.filter(r => r.level >= 4);
  const focusDims = low.map(l => l.label).join(", ");
  const strengths = high.map(h => h.label).join(", ");

  const opening =
    "Uw quick scan laat een helder vertrekpunt zien voor gerichte waardecreatie in de logistieke keten. " +
    (strengths
      ? `Sterke fundamenten zien we op ${strengths}. `
      : "Er liggen kansen over de volle breedte van de keten. ");

  const body = low.length
    ? `De grootste versnellers liggen bij ${focusDims}. Hier adviseren we door te groeien naar het volgende niveau door standaardisatie, zichtbaarheid en gedeelde KPI’s te versterken. Integreer systemen waar mogelijk (ERP–WMS–TMS), verbeter datakwaliteit en richt een vast S&OP-ritme in met één dataset. In transport en samenwerking leveren realtime status, route-optimalisatie en partneroverleg met gezamenlijke KPI’s doorgaans meetbare winst op (OTIF omhoog, minder spoed, lagere voorraadwaarde). `
    : "U opereert op hoog niveau; focus nu op ketenbrede integratie en voorspellende sturing. Versterk realtime data-deling met partners en schaal scenario-gestuurde besluitvorming (IBP) met finance en strategische leveranciers/3PL’s. ";

  const close =
    "Concreet betekent dit: benut uw sterke punten als hefboom en pak per dimensie één stap omhoog. Daarmee verhoogt u leverbetrouwbaarheid en wendbaarheid, verlaagt u kosten en creëert u een duurzaam concurrentievoordeel. Wij helpen u desgewenst bij het prioriteren en borgen van deze stappen.";

  const text = (opening + body + close).trim();
  const words = text.split(" ");
  const limit = 230;
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "…";
}

function updateProgress() {
  const answeredCount = DIMENSIONS.reduce((acc, d) => {
    return acc + (answers[d.key].q1 ? 1 : 0) + (answers[d.key].q2 ? 1 : 0);
  }, 0);
  const total = DIMENSIONS.length * 2;
  const progressText = document.getElementById("progress-text");
  progressText.textContent = `${answeredCount} van ${total} vragen beantwoord.`;
}

function updateValidationUi() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const consentEl = document.getElementById("consent");
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const consent = consentEl.checked;

  const nameError = document.getElementById("error-name");
  const emailError = document.getElementById("error-email");
  const consentError = document.getElementById("error-consent");

  if (tried && !name) {
    nameEl.classList.add("error");
    nameError.textContent = "Vul uw naam in.";
    nameError.style.display = "block";
  } else {
    nameEl.classList.remove("error");
    nameError.textContent = "";
    nameError.style.display = "none";
  }

  if (tried && !emailValid(email)) {
    emailEl.classList.add("error");
    emailError.textContent = "Gebruik een geldig e-mailadres (bijv. naam@domein.ext).";
    emailError.style.display = "block";
  } else {
    emailEl.classList.remove("error");
    emailError.textContent = "";
    emailError.style.display = "none";
  }

  if (tried && !consent) {
    consentError.style.display = "block";
  } else {
    consentError.style.display = "none";
  }

  const allOk = allAnsweredAndValid();
  const hintAll = document.getElementById("hint-all");
  const btn = document.getElementById("show-results");

  if (!allOk && tried) {
    hintAll.style.display = "block";
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-secondary");
  } else {
    hintAll.style.display = "none";
    btn.classList.remove("btn-secondary");
    btn.classList.add("btn-primary");
  }

  btn.textContent = submitted ? "Herbereken resultaten" : "Toon resultaten";
}

function renderRadar(results) {
  const canvas = document.getElementById("radarChart");
  radarChart = renderRadarChart(canvas, results, radarChart);
}

function renderDimensionResults(results) {
  const container = document.getElementById("dimension-results");
  container.innerHTML = "";
  results.forEach(r => {
    const wrap = document.createElement("div");
    wrap.className = "result-dimension";

    const topRow = document.createElement("div");
    topRow.style.display = "flex";
    topRow.style.justifyContent = "space-between";
    topRow.style.gap = "8px";
    topRow.style.alignItems = "flex-start";

    const left = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = r.label;
    const lvl = document.createElement("p");
    lvl.innerHTML =
      'Huidig niveau: <span style="font-weight:600;">' +
      r.level +
      "</span> (" +
      maturityLabel(r.level) +
      ")";
    left.appendChild(title);
    left.appendChild(lvl);

    const pill = document.createElement("span");
    let pillClass = "pill pill-basis";
    let pillText = "Basis";
    if (r.level >= 4) {
      pillClass = "pill pill-gevorderd";
      pillText = "Gevorderd";
    } else if (r.level === 3) {
      pillClass = "pill pill-midden";
      pillText = "Midden";
    }
    pill.className = pillClass;
    pill.textContent = pillText;

    topRow.appendChild(left);
    topRow.appendChild(pill);

    const advice = document.createElement("div");
    advice.className = "advice-text";
    advice.textContent = r.nextAdvice;

    wrap.appendChild(topRow);
    wrap.appendChild(advice);
    container.appendChild(wrap);
  });
}

async function notifyBackendOnce(results) {
  const statusEl = document.getElementById("notify-status");
  const setStatus = (message, variant) => {
    if (!statusEl) return;
    if (!message) {
      statusEl.textContent = "";
      statusEl.className = "status-banner";
      return;
    }
    statusEl.textContent = message;
    statusEl.className = `status-banner ${variant}`;
  };

  if (notified) {
    setStatus("Resultaten verstuurd", "success");
    return;
  }
  
  // Skip notification if no email is configured
  if (!NOTIFICATION_EMAIL) {
    console.info("Backend notification skipped: VITE_NOTIFICATION_EMAIL not configured");
    notified = true;
    return;
  }
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const node = document.getElementById("results-grid");
  if (!node) return;

  try {
    setStatus("", "");
    const canvas = await html2canvas(node, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 36;
    const usable = pageWidth - margin * 2;

    if (SUPPLY_VALUE_LOGO) {
      try {
        const logoImg = new Image();
        logoImg.src = SUPPLY_VALUE_LOGO;
        await logoImg.decode();
        pdf.addImage(logoImg, "PNG", margin, 20, 120, 32);
      } catch (e) {
        console.warn("Logo kon niet geladen worden", e);
      }
    }

    pdf.setFontSize(14);
    pdf.text("Quick Scan Logistieke Ketenvolwassenheid", margin, 72);
    pdf.setFontSize(10);
    const dt = new Date().toLocaleString();
    pdf.text(`Naam: ${name}  •  E-mail: ${email}  •  Datum: ${dt}`, margin, 88);

    const imgWidth = usable;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const yStart = 100;
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      yStart,
      imgWidth,
      Math.min(imgHeight, pageHeight - yStart - 160)
    );

    const blob = pdf.output("blob");
    const base64 = await new Promise(resolve => {
      const fr = new FileReader();
      fr.onload = () => {
        const result = String(fr.result || "");
        const b64 = result.split(",")[1] || "";
        resolve(b64);
      };
      fr.readAsDataURL(blob);
    });

    const res = await fetch("/api/quickscan-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: NOTIFICATION_EMAIL,
        name,
        email,
        pdfBase64: `data:application/pdf;base64,${base64}`
      })
    });

    if (!res.ok) {
      throw new Error(`Notificatie mislukt (status ${res.status})`);
    }

    setStatus("Resultaten verstuurd", "success");
    notified = true;
  } catch (e) {
    console.warn("Notificatie mislukt of endpoint ontbreekt", e);
    // Don't show warning to users - silently fail backend notification
    notified = false;
  }
}

async function downloadPdf() {
  const node = document.getElementById("results-grid");
  if (!node) return;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const narrative = document.getElementById("narrative-text").textContent || "";

  await exportResultsPdf({
    node,
    name,
    email,
    narrative,
    logoDataUri: SUPPLY_VALUE_LOGO
  });
}

// --- Init UI ---
function buildQuestionnaire() {
  const container = document.getElementById("dimensions-container");
  container.innerHTML = "";
  DIMENSIONS.forEach(d => {
    const card = document.createElement("div");
    card.className = "card dimension-card";

    const title = document.createElement("h3");
    title.textContent = d.label;
    card.appendChild(title);

    // Vraag 1
    const q1t = document.createElement("div");
    q1t.className = "question-text";
    q1t.textContent = "1) " + d.q1;
    card.appendChild(q1t);

    const q1ul = document.createElement("ul");
    q1ul.className = "scale-list";
    d.q1Scale.forEach((opt, idx) => {
      const li = document.createElement("li");
      li.className = "scale-item";
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = d.key + "-q1";
      input.value = idx + 1;
      input.dataset.dim = d.key;
      input.dataset.question = "q1";
      input.addEventListener("change", onAnswerChange);
      const span = document.createElement("span");
      span.textContent = opt;
      label.appendChild(input);
      label.appendChild(span);
      li.appendChild(label);
      q1ul.appendChild(li);
    });
    card.appendChild(q1ul);

    // Vraag 2
    const q2t = document.createElement("div");
    q2t.className = "question-text";
    q2t.textContent = "2) " + d.q2;
    card.appendChild(q2t);

    const q2ul = document.createElement("ul");
    q2ul.className = "scale-list";
    d.q2Scale.forEach((opt, idx) => {
      const li = document.createElement("li");
      li.className = "scale-item";
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = d.key + "-q2";
      input.value = idx + 1;
      input.dataset.dim = d.key;
      input.dataset.question = "q2";
      input.addEventListener("change", onAnswerChange);
      const span = document.createElement("span");
      span.textContent = opt;
      label.appendChild(input);
      label.appendChild(span);
      li.appendChild(label);
      q2ul.appendChild(li);
    });
    card.appendChild(q2ul);

    container.appendChild(card);
  });
}

function onAnswerChange(e) {
  const dim = e.target.dataset.dim;
  const q = e.target.dataset.question;
  const val = parseInt(e.target.value, 10);
  if (!answers[dim]) answers[dim] = {};
  answers[dim][q] = val;
  updateProgress();
  if (tried) updateValidationUi();
}

function onContactChange() {
  if (tried) updateValidationUi();
}

function onSubmitClick() {
  tried = true;
  const allOk = allAnsweredAndValid();
  updateValidationUi();
  if (!allOk) return;

  submitted = true;
  document.getElementById("results-section").style.display = "block";

  const results = calcResults();
  renderRadar(results);
  renderDimensionResults(results);
  document.getElementById("narrative-text").textContent = narrativeFromResults(results);

  notifyBackendOnce(results).catch(() => {});
  updateValidationUi();
  document
    .getElementById("results-section")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function init() {
  buildQuestionnaire();
  updateProgress();

  document.getElementById("name").addEventListener("input", onContactChange);
  document.getElementById("email").addEventListener("input", onContactChange);
  document.getElementById("consent").addEventListener("change", onContactChange);

  document.getElementById("show-results").addEventListener("click", onSubmitClick);

  document.getElementById("download-pdf").addEventListener("click", async () => {
    if (!submitted || !allAnsweredAndValid()) return;
    await downloadPdf();
  });
}

init();
