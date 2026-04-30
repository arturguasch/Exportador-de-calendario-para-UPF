const UPF_CALENDAR_URL = "https://secretariavirtual.upf.edu/pds/control/PubliHoraAlumCalendario?rnd=2141.0";
const AJAX_PATH = "/pds/control/[Ajax]selecionarRangoHorarios";

const I18N = {
  ca: {
    appTitle: "Exportador de calendari per a UPF",
    appSubtitle: "Exporta les teves classes i exàmens a Google Calendar.",
    unofficialNotice: "Extensió no oficial. No està afiliada, avalada ni mantinguda per la Universitat Pompeu Fabra.",
    privacyNotice: "L\'extensió processa les dades localment al navegador. No recopila, ven ni transmet dades personals, credencials ni informació acadèmica a servidors externs.",
    privacyPolicyLink: "Política de privacitat",
    pageNotUpf: "No ets a la secretaria virtual de la UPF. Obre el calendari i torna a prémer l'extensió.",
    pageUpf: "Pàgina UPF detectada. Pots exportar fent servir la sessió oberta.",
    howToTitle: "Com fer-ho servir",
    help1: "Entra a la <strong>secretaria virtual de la UPF</strong>.",
    help2: "Obre el <strong>calendari de classes</strong>.",
    help3: "Tria la <strong>data inicial</strong> i la <strong>data final</strong>.",
    help4: "Prem <strong>Detectar matèries</strong>.",
    help5: "Marca les matèries que vols exportar.",
    help6: "Activa <strong>Crear un .ics per cada matèria seleccionada</strong> si vols importar cada matèria en un calendari diferent.",
    help7: "Prem <strong>Exportar .ics</strong>.",
    helpImportant: "<strong>IMPORTANT:</strong> Per tenir colors a Google Calendar, crea un calendari per matèria i posa un color diferent a cada calendari. Després importa cada .ics de cada matèria al calendari corresponent.",
    importErrorNote: "Si Google Calendar mostra l'error <strong>“No hem pogut importar aquest fitxer. Torna-ho a provar d'aquí a una estona.”</strong>, espera 10 segons i torna a prémer importar.",
    startDate: "Data inicial",
    endDate: "Data final",
    calendarName: "Nom del calendari",
    fileName: "Nom de l'arxiu",
    eventFormatTitle: "Format dels esdeveniments",
    includeHolidays: "Incloure festius i vacances",
    includeDescription: "Incloure descripció extensiva",
    splitBySubject: "Crear un .ics per cada matèria seleccionada",
    subjectsTitle: "Matèries",
    subjectsSubtitle: "Prem “Detectar matèries” per triar què vols exportar.",
    detectSubjects: "Detectar matèries",
    allSubjects: "Totes",
    noSubjects: "Cap",
    subjectsEmpty: "Encara no hi ha matèries detectades.",
    noSubjectsInRange: "No s'han detectat matèries en aquest rang.",
    openUpf: "Obrir UPF",
    exportIcs: "Exportar .ics",
    ready: "Preparat.",
    settingsTitle: "Configuració",
    language: "Idioma",
    titleOrder: "Ordre del títol",
    titleOrderHelp: "Mou els blocs per decidir l’ordre del títol.",
    blockHint: "Arrossega els blocs segons l’ordre que vols que aparegui al títol de l’esdeveniment.",
    help8: "L’arxiu <strong>.ics</strong> és un arxiu de calendari. A Google Calendar, ves a <strong>Configuració → Importar i exportar → Importar</strong>, selecciona l’arxiu .ics i tria el calendari on vols afegir els esdeveniments.",
    theoryFormat: "Teoria",
    seminarFormat: "Seminari",
    examFormat: "Examen",
    fmtSubjectRoom: "Assignatura | aula",
    fmtRoomSubject: "Aula | assignatura",
    fmtTypeSubjectRoom: "TIPUS Assignatura | aula",
    fmtRoomTypeSubject: "Aula | TIPUS assignatura",
    fmtSubjectOnly: "Només assignatura",
    reset: "Restablir",
    save: "Desar",
    formatPreviewTheory: "Teoria",
    formatPreviewSeminar: "Seminari",
    formatPreviewExam: "Examen",
    errorDates: "Tria data inicial i data final.",
    errorDateOrder: "La data final ha de ser posterior a la data inicial.",
    errorCalendarName: "Posa un nom per al calendari.",
    errorFileName: "Posa un nom per a l'arxiu.",
    errorOpenUpf: "Obre primer el calendari de la UPF en aquesta pestanya.",
    errorNoSubjectsSelected: "No hi ha cap matèria seleccionada.",
    detecting: "Detectant matèries...",
    subjectsDetected: "Matèries detectades",
    preparing: "Preparant l'exportació...",
    reading: "Llegint esdeveniments des de la sessió oberta a la UPF...",
    createdOne: "Arxiu generat correctament.",
    createdMany: "Arxius generats correctament.",
    received: "Esdeveniments rebuts",
    exported: "Esdeveniments exportats",
    ignored: "Elements ignorats",
    exportedSubjects: "Matèries exportades",
    creating: "Creant arxiu .ics...",
    error: "Error",
    settingsSaved: "Configuració desada.",
  },
  es: {
    appTitle: "Exportador de calendario para UPF",
    appSubtitle: "Exporta tus clases y exámenes a Google Calendar.",
    unofficialNotice: "Extensión no oficial. No está afiliada, avalada ni mantenida por la Universitat Pompeu Fabra.",
    privacyNotice: "La extensión procesa los datos localmente en el navegador. No recopila, vende ni transmite datos personales, credenciales ni información académica a servidores externos.",
    privacyPolicyLink: "Política de privacidad",
    pageNotUpf: "No estás en la secretaría virtual de la UPF. Abre el calendario y vuelve a pulsar la extensión.",
    pageUpf: "Página UPF detectada. Puedes exportar usando tu sesión abierta.",
    howToTitle: "Cómo usarlo",
    help1: "Entra en la <strong>secretaría virtual de la UPF</strong>.",
    help2: "Abre el <strong>calendario de clases</strong>.",
    help3: "Elige <strong>fecha inicial</strong> y <strong>fecha final</strong>.",
    help4: "Pulsa <strong>Detectar materias</strong>.",
    help5: "Marca las materias que quieres exportar.",
    help6: "Activa <strong>Crear un .ics por cada materia seleccionada</strong> si quieres importar cada materia en un calendario distinto.",
    help7: "Pulsa <strong>Exportar .ics</strong>.",
    helpImportant: "<strong>IMPORTANTE:</strong> Para colores en Google Calendar, crea un calendario por materia y pon un color distinto a cada calendario. Luego importa cada .ics de cada materia en su calendario correspondiente.",
    importErrorNote: "Si Google Calendar muestra el error <strong>“No hemos podido importar este archivo. Vuelve a intentarlo dentro de un rato.”</strong>, espera 10 segundos y vuelve a pulsar importar.",
    startDate: "Fecha inicial",
    endDate: "Fecha final",
    calendarName: "Nombre del calendario",
    fileName: "Nombre del archivo",
    eventFormatTitle: "Formato de eventos",
    includeHolidays: "Incluir festivos y vacaciones",
    includeDescription: "Incluir descripción extensiva",
    splitBySubject: "Crear un .ics por cada materia seleccionada",
    subjectsTitle: "Materias",
    subjectsSubtitle: "Pulsa “Detectar materias” para elegir qué quieres exportar.",
    detectSubjects: "Detectar materias",
    allSubjects: "Todas",
    noSubjects: "Ninguna",
    subjectsEmpty: "Aún no hay materias detectadas.",
    noSubjectsInRange: "No se han detectado materias en este rango.",
    openUpf: "Abrir UPF",
    exportIcs: "Exportar .ics",
    ready: "Listo.",
    settingsTitle: "Configuración",
    language: "Idioma",
    titleOrder: "Orden del título",
    titleOrderHelp: "Mueve los bloques para decidir el orden del título.",
    blockHint: "Arrastra los bloques según el orden en que quieres que aparezcan en el título del evento.",
    help8: "El archivo <strong>.ics</strong> es un archivo de calendario. En Google Calendar, ve a <strong>Configuración → Importar y exportar → Importar</strong>, selecciona el archivo .ics y elige el calendario donde quieres añadir los eventos.",
    theoryFormat: "Teoría",
    seminarFormat: "Seminario",
    examFormat: "Examen",
    fmtSubjectRoom: "Asignatura | aula",
    fmtRoomSubject: "Aula | asignatura",
    fmtTypeSubjectRoom: "TIPO Asignatura | aula",
    fmtRoomTypeSubject: "Aula | TIPO asignatura",
    fmtSubjectOnly: "Solo asignatura",
    reset: "Restablecer",
    save: "Guardar",
    formatPreviewTheory: "Teoría",
    formatPreviewSeminar: "Seminario",
    formatPreviewExam: "Examen",
    errorDates: "Elige fecha inicial y fecha final.",
    errorDateOrder: "La fecha final debe ser posterior a la fecha inicial.",
    errorCalendarName: "Pon un nombre para el calendario.",
    errorFileName: "Pon un nombre para el archivo.",
    errorOpenUpf: "Abre primero el calendario de la UPF en esta pestaña.",
    errorNoSubjectsSelected: "No hay ninguna materia seleccionada.",
    detecting: "Detectando materias...",
    subjectsDetected: "Materias detectadas",
    preparing: "Preparando exportación...",
    reading: "Leyendo eventos desde la sesión abierta en la UPF...",
    createdOne: "Archivo generado correctamente.",
    createdMany: "Archivos generados correctamente.",
    received: "Eventos recibidos",
    exported: "Eventos exportados",
    ignored: "Elementos ignorados",
    exportedSubjects: "Materias exportadas",
    creating: "Creando archivo .ics...",
    error: "Error",
    settingsSaved: "Configuración guardada.",
  },
  en: {
    appTitle: "Calendar exporter for UPF",
    appSubtitle: "Export your classes and exams to Google Calendar.",
    unofficialNotice: "Unofficial extension. It is not affiliated with, endorsed by, or maintained by Universitat Pompeu Fabra.",
    privacyNotice: "The extension processes data locally in the browser. It does not collect, sell, or transmit personal data, credentials, or academic information to external servers.",
    privacyPolicyLink: "Privacy policy",
    pageNotUpf: "You are not on the UPF virtual secretary page. Open the calendar and click the extension again.",
    pageUpf: "UPF page detected. You can export using your active session.",
    howToTitle: "How to use it",
    help1: "Open the <strong>UPF virtual secretary</strong>.",
    help2: "Open the <strong>class calendar</strong>.",
    help3: "Choose the <strong>start date</strong> and <strong>end date</strong>.",
    help4: "Click <strong>Detect subjects</strong>.",
    help5: "Select the subjects you want to export.",
    help6: "Enable <strong>Create one .ics per selected subject</strong> if you want to import each subject into a different calendar.",
    help7: "Click <strong>Export .ics</strong>.",
    helpImportant: "<strong>IMPORTANT:</strong> To get colors in Google Calendar, create one calendar per subject and assign a different color to each calendar. Then import each subject's .ics into its corresponding calendar.",
    importErrorNote: "If Google Calendar shows the error <strong>“Could not import this file. Please try again later.”</strong>, wait 10 seconds and click import again.",
    startDate: "Start date",
    endDate: "End date",
    calendarName: "Calendar name",
    fileName: "File name",
    eventFormatTitle: "Event format",
    includeHolidays: "Include holidays and breaks",
    includeDescription: "Include extended description",
    splitBySubject: "Create one .ics per selected subject",
    subjectsTitle: "Subjects",
    subjectsSubtitle: "Click “Detect subjects” to choose what to export.",
    detectSubjects: "Detect subjects",
    allSubjects: "All",
    noSubjects: "None",
    subjectsEmpty: "No subjects detected yet.",
    noSubjectsInRange: "No subjects were detected in this range.",
    openUpf: "Open UPF",
    exportIcs: "Export .ics",
    ready: "Ready.",
    settingsTitle: "Settings",
    language: "Language",
    titleOrder: "Title order",
    titleOrderHelp: "Move the blocks to decide the title order.",
    blockHint: "Drag the blocks into the order you want them to appear in the event title.",
    help8: "The <strong>.ics</strong> file is a calendar file. In Google Calendar, go to <strong>Settings → Import & export → Import</strong>, select the .ics file and choose the calendar where you want to add the events.",
    theoryFormat: "Theory",
    seminarFormat: "Seminar",
    examFormat: "Exam",
    fmtSubjectRoom: "Subject | room",
    fmtRoomSubject: "Room | subject",
    fmtTypeSubjectRoom: "TYPE Subject | room",
    fmtRoomTypeSubject: "Room | TYPE subject",
    fmtSubjectOnly: "Subject only",
    reset: "Reset",
    save: "Save",
    formatPreviewTheory: "Theory",
    formatPreviewSeminar: "Seminar",
    formatPreviewExam: "Exam",
    errorDates: "Choose a start date and end date.",
    errorDateOrder: "The end date must be after the start date.",
    errorCalendarName: "Enter a calendar name.",
    errorFileName: "Enter a file name.",
    errorOpenUpf: "Open the UPF calendar in this tab first.",
    errorNoSubjectsSelected: "No subject is selected.",
    detecting: "Detecting subjects...",
    subjectsDetected: "Subjects detected",
    preparing: "Preparing export...",
    reading: "Reading events from your active UPF session...",
    createdOne: "File created successfully.",
    createdMany: "Files created successfully.",
    received: "Events received",
    exported: "Events exported",
    ignored: "Items ignored",
    exportedSubjects: "Subjects exported",
    creating: "Creating .ics file...",
    error: "Error",
    settingsSaved: "Settings saved.",
  }
};

const DEFAULT_SETTINGS = {
  language: "ca",
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
  return I18N[settings.language]?.[key] || I18N.ca[key] || key;
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
els.languageSelect.addEventListener("change", () => {
  settings.language = els.languageSelect.value;
  applyI18n();
});

els.settingsModal.addEventListener("click", (event) => {
  if (event.target === els.settingsModal) closeSettings();
});

(async function init() {
  setDefaultDates();
  await loadSettings();
  syncSettingsForm();
  setDefaultTextsForLanguage();
  applyI18n();
})();
