const UPF_CALENDAR_URL = "https://secretariavirtual.upf.edu/pds/control/PubliHoraAlumCalendario?rnd=2141.0";
const AJAX_PATH = "/pds/control/[Ajax]selecionarRangoHorarios";

let I18N = {};

const SUPPORTED_LANGUAGES = ["ca", "es", "en"];

function getDefaultLanguage() {
  const uiLanguage = (typeof chrome !== "undefined" && chrome.i18n?.getUILanguage)
    ? chrome.i18n.getUILanguage()
    : "ca";

  const baseLanguage = String(uiLanguage || "ca").toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.includes(baseLanguage) ? baseLanguage : "ca";
}

async function loadLocaleMessages(language) {
  const selectedLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : getDefaultLanguage();

  try {
    const response = await fetch(chrome.runtime.getURL(`_locales/${selectedLanguage}/messages.json`));
    const messages = await response.json();
    I18N = messages;
    settings.language = selectedLanguage;
  } catch (error) {
    if (selectedLanguage !== "ca") {
      await loadLocaleMessages("ca");
      return;
    }

    I18N = {};
  }
}

const DEFAULT_SETTINGS = {
  language: getDefaultLanguage(),
  formats: {
    theory: ["subject", "room"],
    seminar: ["type", "group", "subject", "room"],
    exam: ["type", "subject", "room"],
  }
};

let settings = structuredClone(DEFAULT_SETTINGS);
let detectedSubjects = [];
let selectedSubjects = new Set();

const els = {
  startDate: document.getElementById("startDate"),
  endDate: document.getElementById("endDate"),
  calendarName: document.getElementById("calendarName"),
  fileName: document.getElementById("fileName"),
  includeHolidays: document.getElementById("includeHolidays"),
  includeDescription: document.getElementById("includeDescription"),
  splitBySubject: document.getElementById("splitBySubject"),
  detectSubjects: document.getElementById("detectSubjects"),
  selectAllSubjects: document.getElementById("selectAllSubjects"),
  clearSubjects: document.getElementById("clearSubjects"),
  subjectsList: document.getElementById("subjectsList"),
  exportBtn: document.getElementById("exportBtn"),
  status: document.getElementById("status"),
  pageNotice: document.getElementById("pageNotice"),
  settingsBtn: document.getElementById("settingsBtn"),
  langCode: document.getElementById("langCode"),
  settingsModal: document.getElementById("settingsModal"),
  closeSettings: document.getElementById("closeSettings"),
  languageSelect: document.getElementById("languageSelect"),
  theoryBlocks: document.getElementById("theoryBlocks"),
  seminarBlocks: document.getElementById("seminarBlocks"),
  examBlocks: document.getElementById("examBlocks"),
  saveSettings: document.getElementById("saveSettings"),
  resetSettings: document.getElementById("resetSettings"),
  formatPreview: document.getElementById("formatPreview"),
};

function t(key) {
  return I18N[key]?.message || key;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDateInput(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function setDefaultDates() {
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + 95);
  els.startDate.value = formatDateInput(today);
  els.endDate.value = formatDateInput(end);
}

function setDefaultTextsForLanguage() {
  if (settings.language === "ca") {
    els.calendarName.value = "Horari UPF";
    els.fileName.value = "upf_calendari.ics";
  } else if (settings.language === "es") {
    els.calendarName.value = "Horario UPF";
    els.fileName.value = "upf_calendario.ics";
  } else {
    els.calendarName.value = "UPF Schedule";
    els.fileName.value = "upf_schedule.ics";
  }
}

function setStatus(message) {
  els.status.textContent = message || "";
  els.status.classList.toggle("hidden", !message);
}

function htmlDecode(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value ?? "";
  return textarea.value.trim();
}

function clean(value) {
  if (value === undefined || value === null) return "";
  return htmlDecode(String(value)).trim();
}

function normalizeSubject(item) {
  return clean(item.title).replace(/\s+/g, " ").trim();
}

function typeKey(item) {
  const type = clean(item.tipologia).toLowerCase();
  if (type.includes("semin")) return "seminar";
  if (type.includes("examen") || type.includes("exam")) return "exam";
  return "theory";
}

function typeLabel(item) {
  const key = typeKey(item);

  const labels = {
    ca: { theory: "TEORIA", seminar: "SEMINARI", exam: "EXAMEN" },
    es: { theory: "TEORÍA", seminar: "SEMINARIO", exam: "EXAMEN" },
    en: { theory: "THEORY", seminar: "SEMINAR", exam: "EXAM" },
  };

  return (labels[settings.language] || labels.ca)[key] || labels.ca[key];
}

function tokenLabel(token, kind) {
  const labels = {
    ca: { type: kind === "theory" ? "TEORIA" : kind === "seminar" ? "SEMINARI" : "EXAMEN", subject: "Assignatura", room: "Aula", group: "Grup" },
    es: { type: kind === "theory" ? "TEORÍA" : kind === "seminar" ? "SEMINARIO" : "EXAMEN", subject: "Asignatura", room: "Aula", group: "Grupo" },
    en: { type: kind === "theory" ? "THEORY" : kind === "seminar" ? "SEMINAR" : "EXAM", subject: "Subject", room: "Room", group: "Group" },
  };
  return (labels[settings.language] || labels.ca)[token] || token;
}

function buildTitleFromTokens(subject, room, type, tokens, group = "") {
  const values = { type, subject, room, group };
  const cleanTokens = (Array.isArray(tokens) && tokens.length ? tokens : ["subject", "room"])
    .filter((token) => values[token]);

  const roomIndex = cleanTokens.indexOf("room");

  if (roomIndex === -1) {
    return cleanTokens.map((token) => values[token]).join(" ").trim();
  }

  const before = cleanTokens.slice(0, roomIndex).map((token) => values[token]).join(" ").trim();
  const after = cleanTokens.slice(roomIndex + 1).map((token) => values[token]).join(" ").trim();

  if (before && after) return `${before} | ${room} | ${after}`;
  if (before) return `${before} | ${room}`;
  if (after) return `${room} | ${after}`;
  return room;
}

function buildCleanSummary(item) {
  const subject = normalizeSubject(item);
  const room = clean(item.aula);
  const group = clean(item.grup);
  const key = typeKey(item);
  const tokens = settings.formats[key] || DEFAULT_SETTINGS.formats[key];
  return buildTitleFromTokens(subject, room, typeLabel(item), tokens, group);
}

function buildDescription(item) {
  const lines = [];
  const aula = clean(item.aula);
  const edificio = clean(item.descEdificio);
  const grupo = clean(item.grup);
  const tipo = clean(item.tipologia);
  const observacion = clean(item.observacion);
  const comentario = clean(item.comentario);

  if (tipo) lines.push(`${t("eventFormatTitle")}: ${tipo}`);
  if (grupo) lines.push(`Grupo: ${grupo}`);
  if (aula) lines.push(`Aula: ${aula}`);
  if (edificio) lines.push(`Edificio: ${edificio}`);
  if (observacion) lines.push(`Observación: ${observacion}`);
  if (comentario) lines.push(`Comentario: ${comentario}`);

  return lines.join("\n");
}

function lastSunday(year, monthIndex) {
  const date = new Date(year, monthIndex + 1, 0);
  while (date.getDay() !== 0) date.setDate(date.getDate() - 1);
  return date;
}

function madridOffsetHours(localDate) {
  const year = localDate.getFullYear();
  const dstStart = lastSunday(year, 2);
  dstStart.setHours(2, 0, 0, 0);
  const dstEnd = lastSunday(year, 9);
  dstEnd.setHours(3, 0, 0, 0);
  return localDate >= dstStart && localDate < dstEnd ? 2 : 1;
}

function dateToMadridTimestamp(dateText) {
  const [year, month, day] = dateText.split("-").map(Number);
  const localDate = new Date(year, month - 1, day, 0, 0, 0, 0);
  const utcMs = localDate.getTime() - madridOffsetHours(localDate) * 60 * 60 * 1000;
  return Math.floor(utcMs / 1000);
}

function parseUpfDateTime(value) {
  const [datePart, timePart] = value.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second || 0, 0);
}

function icsDateTime(date) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "T",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function icsUtcDateTime(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function icsEscape(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n/g, "\\n")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\n");
}

function foldIcsLine(line) {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const parts = [];
  let current = "";
  let currentLength = 0;

  for (const char of line) {
    const charLength = encoder.encode(char).length;
    if (currentLength + charLength > 75) {
      parts.push(current);
      current = " " + char;
      currentLength = 1 + charLength;
    } else {
      current += char;
      currentLength += charLength;
    }
  }

  if (current) parts.push(current);
  return parts.join("\r\n");
}

function makeUid(item) {
  const raw = [
    "upf",
    clean(item.codAsignatura),
    clean(item.reseId),
    clean(item.blocID),
    clean(item.start).replace(/\s+/g, "T"),
    clean(item.aula).replace(/\s+/g, "_"),
  ].join("-");

  const safe = raw.replace(/[^a-zA-Z0-9_.@-]/g, "-");
  return `${safe}@upf-calendar-exporter`;
}

function shouldExport(item, includeHolidays) {
  if ("mostrarMensaje" in item) return false;
  if (!item.start || !item.end) return false;
  if (item.festivoNoLectivo === true && !includeHolidays) return false;
  if (!clean(item.title)) return false;
  return true;
}

function createIcs(items, options) {
  const now = new Date();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendar exporter for UPF//CA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsEscape(options.calendarName)}`,
    "X-WR-TIMEZONE:Europe/Madrid",
  ];

  let exported = 0;
  const sorted = [...items].sort((a, b) => String(a.start || "").localeCompare(String(b.start || "")));

  for (const item of sorted) {
    if (!shouldExport(item, options.includeHolidays)) continue;

    const subject = normalizeSubject(item);
    if (options.subjectFilter && subject !== options.subjectFilter) continue;
    if (options.selectedSubjects?.size && !options.selectedSubjects.has(subject)) continue;

    const start = parseUpfDateTime(item.start);
    const end = parseUpfDateTime(item.end);
    const summary = buildCleanSummary(item);
    const description = buildDescription(item);

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${icsEscape(makeUid(item))}`);
    lines.push(`DTSTAMP:${icsUtcDateTime(now)}`);
    lines.push(`DTSTART;TZID=Europe/Madrid:${icsDateTime(start)}`);
    lines.push(`DTEND;TZID=Europe/Madrid:${icsDateTime(end)}`);
    lines.push(`SUMMARY:${icsEscape(summary)}`);

    if (options.includeDescription && description) {
      lines.push(`DESCRIPTION:${icsEscape(description)}`);
    }

    lines.push("END:VEVENT");
    exported += 1;
  }

  lines.push("END:VCALENDAR");

  return {
    ics: lines.map(foldIcsLine).join("\r\n") + "\r\n",
    exported,
    ignored: items.length - exported,
    received: items.length,
  };
}

function safeFilePart(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._ -]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replaceAll(" ", "_")
    .slice(0, 90) || "materia";
}

function baseFileName(value) {
  const name = value.trim() || "upf_calendari.ics";
  return name.toLowerCase().endsWith(".ics") ? name.slice(0, -4) : name;
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function checkCurrentPage() {
  const tab = await getActiveTab();

  if (!tab?.url || !tab.url.startsWith("https://secretariavirtual.upf.edu/")) {
    els.pageNotice.textContent = t("pageNotUpf");
    els.pageNotice.className = "notice";
    return false;
  }

  els.pageNotice.textContent = t("pageUpf");
  els.pageNotice.className = "notice ok";
  return true;
}

async function fetchEventsFromPage(tabId, startTimestamp, endTimestamp) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    args: [AJAX_PATH, startTimestamp, endTimestamp],
    func: async (ajaxPath, start, end) => {
      const rnd = `${Math.floor(Math.random() * 9000) + 1000}.0`;
      const url = `${location.origin}${ajaxPath}?rnd=${encodeURIComponent(rnd)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      const text = await response.text();

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
      if (text.trim().startsWith("<")) throw new Error("La UPF ha devuelto HTML. Parece que la sesión no está activa.");

      return JSON.parse(text);
    }
  });

  if (!Array.isArray(result)) throw new Error("La respuesta no es una lista de eventos.");
  return result;
}

async function downloadIcs(ics, fileName) {
  const safeFileName = fileName.toLowerCase().endsWith(".ics") ? fileName : `${fileName}.ics`;
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  await chrome.downloads.download({
    url,
    filename: safeFileName,
    saveAs: true,
  });

  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function validateForm() {
  if (!els.startDate.value || !els.endDate.value) throw new Error(t("errorDates"));
  if (els.endDate.value <= els.startDate.value) throw new Error(t("errorDateOrder"));
  if (!els.calendarName.value.trim()) throw new Error(t("errorCalendarName"));
  if (!els.fileName.value.trim()) throw new Error(t("errorFileName"));
}

function renderSubjects(subjects) {
  detectedSubjects = subjects;
  if (!selectedSubjects.size) selectedSubjects = new Set(subjects);

  if (!subjects.length) {
    els.subjectsList.className = "subjects-empty";
    els.subjectsList.textContent = t("noSubjectsInRange");
    return;
  }

  els.subjectsList.className = "subjects-list";
  els.subjectsList.textContent = "";

  subjects.forEach((subject) => {
    const row = document.createElement("label");
    row.className = "subject-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectedSubjects.has(subject);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) selectedSubjects.add(subject);
      else selectedSubjects.delete(subject);
    });

    const name = document.createElement("div");
    name.className = "subject-name";
    name.textContent = subject;

    row.append(checkbox, name);
    els.subjectsList.append(row);
  });
}

async function readItemsFromUpf() {
  const tab = await getActiveTab();
  if (!tab?.id || !tab?.url?.startsWith("https://secretariavirtual.upf.edu/")) {
    throw new Error(t("errorOpenUpf"));
  }

  const startTimestamp = dateToMadridTimestamp(els.startDate.value);
  const endTimestamp = dateToMadridTimestamp(els.endDate.value);
  return fetchEventsFromPage(tab.id, startTimestamp, endTimestamp);
}

async function detectSubjects() {
  els.detectSubjects.disabled = true;
  setStatus(t("detecting"));

  try {
    validateForm();
    const items = await readItemsFromUpf();

    const subjects = [...new Set(
      items
        .filter((item) => shouldExport(item, false))
        .map(normalizeSubject)
        .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    selectedSubjects = new Set(subjects);
    renderSubjects(subjects);
    setStatus(`${t("subjectsDetected")}: ${subjects.length}`);
  } catch (error) {
    console.error(error);
    setStatus(`${t("error")}: ${error.message || error}`);
  } finally {
    els.detectSubjects.disabled = false;
  }
}

function selectedSubjectsForExport(items) {
  const allInItems = [...new Set(
    items
      .filter((item) => shouldExport(item, els.includeHolidays.checked))
      .map(normalizeSubject)
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));

  if (!detectedSubjects.length) {
    detectedSubjects = allInItems;
    selectedSubjects = new Set(allInItems);
    renderSubjects(allInItems);
  }

  if (!selectedSubjects.size) throw new Error(t("errorNoSubjectsSelected"));

  return [...selectedSubjects].filter((subject) => allInItems.includes(subject));
}

async function exportCalendar() {
  saveOrderFromContainer("theory");
  saveOrderFromContainer("seminar");
  saveOrderFromContainer("exam");
  await saveSettingsData();

  els.exportBtn.disabled = true;
  setStatus(t("preparing"));

  try {
    validateForm();

    setStatus(t("reading"));
    const items = await readItemsFromUpf();
    const subjects = selectedSubjectsForExport(items);

    if (els.splitBySubject.checked) {
      let totalExported = 0;
      const base = baseFileName(els.fileName.value);

      for (const subject of subjects) {
        const result = createIcs(items, {
          includeHolidays: els.includeHolidays.checked,
          includeDescription: els.includeDescription.checked,
          calendarName: subject,
          subjectFilter: subject,
        });

        if (result.exported > 0) {
          totalExported += result.exported;
          const fileName = `${base}_${safeFilePart(subject)}.ics`;
          await downloadIcs(result.ics, fileName);
        }
      }

      setStatus(
        `${t("createdMany")}\n` +
        `${t("exportedSubjects")}: ${subjects.length}\n` +
        `${t("exported")}: ${totalExported}`
      );
    } else {
      const result = createIcs(items, {
        includeHolidays: els.includeHolidays.checked,
        includeDescription: els.includeDescription.checked,
        calendarName: els.calendarName.value.trim(),
        selectedSubjects,
      });

      await downloadIcs(result.ics, els.fileName.value.trim());

      setStatus(
        `${t("createdOne")}\n` +
        `${t("received")}: ${result.received}\n` +
        `${t("exported")}: ${result.exported}\n` +
        `${t("ignored")}: ${result.ignored}`
      );
    }
  } catch (error) {
    console.error(error);
    setStatus(`${t("error")}: ${error.message || error}`);
  } finally {
    els.exportBtn.disabled = false;
  }
}


function getBlockContainer(kind) {
  if (kind === "theory") return els.theoryBlocks;
  if (kind === "seminar") return els.seminarBlocks;
  return els.examBlocks;
}

function renderBlockBuilder(kind) {
  const container = getBlockContainer(kind);
  container.textContent = "";
  container.dataset.kind = kind;

  const tokens = settings.formats[kind] || DEFAULT_SETTINGS.formats[kind];

  tokens.forEach((token) => {
    const chip = document.createElement("div");
    chip.className = "block-chip";
    chip.draggable = true;
    chip.dataset.token = token;
    chip.textContent = tokenLabel(token, kind);

    chip.addEventListener("dragstart", () => {
      chip.classList.add("dragging");
    });

    chip.addEventListener("dragend", () => {
      chip.classList.remove("dragging");
      saveOrderFromContainer(kind);
      updateFormatPreview();
    });

    container.appendChild(chip);
  });

  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    const dragging = container.querySelector(".dragging");
    if (!dragging) return;

    const afterElement = getDragAfterElement(container, event.clientX);
    if (afterElement == null) {
      container.appendChild(dragging);
    } else {
      container.insertBefore(dragging, afterElement);
    }
  });
}

function getDragAfterElement(container, x) {
  const draggableElements = [...container.querySelectorAll(".block-chip:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }

    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveOrderFromContainer(kind) {
  const container = getBlockContainer(kind);
  settings.formats[kind] = [...container.querySelectorAll(".block-chip")].map((chip) => chip.dataset.token);
}

function renderAllBlockBuilders() {
  renderBlockBuilder("theory");
  renderBlockBuilder("seminar");
  renderBlockBuilder("exam");
}


function updateLanguageButton() {
  const meta = {
    ca: { code: "CAT", title: "Idioma" },
    es: { code: "ES", title: "Idioma" },
    en: { code: "EN", title: "Language" },
  };

  const current = meta[settings.language] || meta.ca;
  if (els.langCode) els.langCode.textContent = current.code;
  els.settingsBtn.title = current.title;
  els.settingsBtn.setAttribute("aria-label", current.title);
}

function applyI18n() {
  document.documentElement.lang = settings.language;
  document.title = t("extName");
  updateLanguageButton();

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  renderAllBlockBuilders();
  updateFormatPreview();
  checkCurrentPage();
}

function updateFormatPreview() {
  // Els blocs ja mostren el format visualment.
}

function normalizeFormats(formats) {
  const normalized = structuredClone(DEFAULT_SETTINGS.formats);
  const incoming = formats || {};

  for (const kind of ["theory", "seminar", "exam"]) {
    if (Array.isArray(incoming[kind])) {
      const allowed = incoming[kind].filter((token) => ["type", "subject", "room", "group"].includes(token));
      if (allowed.length) normalized[kind] = allowed;
    } else if (typeof incoming[kind] === "string") {
      const legacy = {
        subject_room: ["subject", "room"],
        room_subject: ["room", "subject"],
        type_subject_room: ["type", "subject", "room"],
        room_type_subject: ["room", "type", "subject"],
        subject_only: ["subject"],
      };
      normalized[kind] = legacy[incoming[kind]] || normalized[kind];
    }
  }

  if (!normalized.seminar.includes("group")) {
    normalized.seminar.splice(1, 0, "group");
  }

  const oldDefaultSeminar = ["type", "subject", "room", "group"];
  if (
    normalized.seminar.length === oldDefaultSeminar.length &&
    normalized.seminar.every((token, index) => token === oldDefaultSeminar[index])
  ) {
    normalized.seminar = ["type", "group", "subject", "room"];
  }

  return normalized;
}

async function loadSettings() {
  const data = await chrome.storage.local.get({ upfExporterSettings: DEFAULT_SETTINGS });
  settings = {
    ...structuredClone(DEFAULT_SETTINGS),
    ...data.upfExporterSettings,
    formats: normalizeFormats(data.upfExporterSettings?.formats)
  };
}

async function saveSettingsData() {
  await chrome.storage.local.set({ upfExporterSettings: settings });
}

function syncSettingsForm() {
  els.languageSelect.value = settings.language;
  renderAllBlockBuilders();
}

function openSettings() {
  syncSettingsForm();
  els.settingsModal.classList.remove("hidden");
  els.settingsModal.setAttribute("aria-hidden", "false");
}

function closeSettings() {
  els.settingsModal.classList.add("hidden");
  els.settingsModal.setAttribute("aria-hidden", "true");
}

async function saveSettingsFromForm() {
  const previousLanguage = settings.language;
  settings.language = els.languageSelect.value;
  await loadLocaleMessages(settings.language);

  saveOrderFromContainer("theory");
  saveOrderFromContainer("seminar");
  saveOrderFromContainer("exam");

  await saveSettingsData();
  applyI18n();

  if (previousLanguage !== settings.language) {
    setDefaultTextsForLanguage();
  }

  setStatus(t("settingsSaved"));
  closeSettings();
}

async function resetSettings() {
  settings = structuredClone(DEFAULT_SETTINGS);
  await loadLocaleMessages(settings.language);
  await saveSettingsData();
  syncSettingsForm();
  applyI18n();
  setDefaultTextsForLanguage();
  setStatus(t("settingsSaved"));
}

els.detectSubjects.addEventListener("click", detectSubjects);

els.selectAllSubjects.addEventListener("click", () => {
  selectedSubjects = new Set(detectedSubjects);
  renderSubjects(detectedSubjects);
});

els.clearSubjects.addEventListener("click", () => {
  selectedSubjects = new Set();
  renderSubjects(detectedSubjects);
});

els.exportBtn.addEventListener("click", exportCalendar);
els.settingsBtn.addEventListener("click", openSettings);
els.closeSettings.addEventListener("click", closeSettings);
els.saveSettings.addEventListener("click", saveSettingsFromForm);
els.resetSettings.addEventListener("click", resetSettings);
els.languageSelect.addEventListener("change", async () => {
  settings.language = els.languageSelect.value;
  await loadLocaleMessages(settings.language);
  applyI18n();
});

els.settingsModal.addEventListener("click", (event) => {
  if (event.target === els.settingsModal) closeSettings();
});

(async function init() {
  setDefaultDates();
  await loadSettings();
  await loadLocaleMessages(settings.language);
  syncSettingsForm();
  setDefaultTextsForLanguage();
  applyI18n();
})();
