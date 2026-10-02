const TYPES = [
  { id: "normal", name: "Normal", color: "#A8A77A", dark: false, strong: [], weak: ["Roca", "Acero"], immune: ["Fantasma"] },
  { id: "fire", name: "Fuego", color: "#EE8130", dark: false, strong: ["Planta", "Hielo", "Bicho", "Acero"], weak: ["Fuego", "Agua", "Roca", "Dragón"], immune: [] },
  { id: "water", name: "Agua", color: "#6390F0", dark: false, strong: ["Fuego", "Tierra", "Roca"], weak: ["Agua", "Planta", "Dragón"], immune: [] },
  { id: "electric", name: "Eléctrico", color: "#F7D02C", dark: true, strong: ["Agua", "Volador"], weak: ["Eléctrico", "Planta", "Dragón"], immune: ["Tierra"] },
  { id: "grass", name: "Planta", color: "#7AC74C", dark: true, strong: ["Agua", "Tierra", "Roca"], weak: ["Fuego", "Planta", "Veneno", "Volador", "Bicho", "Dragón", "Acero"], immune: [] },
  { id: "ice", name: "Hielo", color: "#96D9D6", dark: true, strong: ["Planta", "Tierra", "Volador", "Dragón"], weak: ["Fuego", "Agua", "Hielo", "Acero"], immune: [] },
  { id: "fighting", name: "Lucha", color: "#C22E28", dark: false, strong: ["Normal", "Hielo", "Roca", "Siniestro", "Acero"], weak: ["Veneno", "Volador", "Psíquico", "Bicho", "Hada"], immune: ["Fantasma"] },
  { id: "poison", name: "Veneno", color: "#A33EA1", dark: false, strong: ["Planta", "Hada"], weak: ["Veneno", "Tierra", "Roca", "Fantasma"], immune: ["Acero"] },
  { id: "ground", name: "Tierra", color: "#E2BF65", dark: true, strong: ["Fuego", "Eléctrico", "Veneno", "Roca", "Acero"], weak: ["Planta", "Bicho"], immune: ["Volador"] },
  { id: "flying", name: "Volador", color: "#A98FF3", dark: false, strong: ["Planta", "Lucha", "Bicho"], weak: ["Eléctrico", "Roca", "Acero"], immune: [] },
  { id: "psychic", name: "Psíquico", color: "#F95587", dark: false, strong: ["Lucha", "Veneno"], weak: ["Psíquico", "Acero"], immune: ["Siniestro"] },
  { id: "bug", name: "Bicho", color: "#A6B91A", dark: true, strong: ["Planta", "Psíquico", "Siniestro"], weak: ["Fuego", "Lucha", "Veneno", "Volador", "Fantasma", "Acero", "Hada"], immune: [] },
  { id: "rock", name: "Roca", color: "#B6A136", dark: false, strong: ["Fuego", "Hielo", "Volador", "Bicho"], weak: ["Lucha", "Tierra", "Acero"], immune: [] },
  { id: "ghost", name: "Fantasma", color: "#735797", dark: false, strong: ["Psíquico", "Fantasma"], weak: ["Siniestro"], immune: ["Normal"] },
  { id: "dragon", name: "Dragón", color: "#6F35FC", dark: false, strong: ["Dragón"], weak: ["Acero"], immune: ["Hada"] },
  { id: "dark", name: "Siniestro", color: "#705746", dark: false, strong: ["Psíquico", "Fantasma"], weak: ["Lucha", "Siniestro", "Hada"], immune: [] },
  { id: "steel", name: "Acero", color: "#B7B7CE", dark: true, strong: ["Hielo", "Roca", "Hada"], weak: ["Fuego", "Agua", "Eléctrico", "Acero"], immune: [] },
  { id: "fairy", name: "Hada", color: "#D685AD", dark: false, strong: ["Lucha", "Dragón", "Siniestro"], weak: ["Fuego", "Veneno", "Acero"], immune: [] },
];

const TYPES_BY_NAME = new Map(TYPES.map((type) => [type.name, type]));
const grid = document.querySelector("#type-grid");
const selectedName = document.querySelector("#selected-name");
const selectedSwatch = document.querySelector("#selected-swatch");
const attackCaption = document.querySelector("#attack-caption");
const defenseCaption = document.querySelector("#defense-caption");
const attackGroups = document.querySelector("#attack-groups");
const defenseGroups = document.querySelector("#defense-groups");
const connectionState = document.querySelector("#connection-state");
let selectedId = "normal";
let deferredInstallPrompt;

function matchup(attackerName, defenderName) {
  const attacker = TYPES_BY_NAME.get(attackerName);
  if (attacker.immune.includes(defenderName)) return "immune";
  if (attacker.strong.includes(defenderName)) return "double";
  if (attacker.weak.includes(defenderName)) return "half";
  return "neutral";
}

function typeStyle(type) {
  return `--type-color:${type.color};--type-text:${type.dark ? "#292621" : "#ffffff"}`;
}

function createTile(type) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "type-tile";
  button.dataset.type = type.id;
  button.setAttribute("aria-pressed", "false");
  button.style.cssText = typeStyle(type);
  button.textContent = type.name;
  return button;
}

function renderGroup(title, color, names) {
  const group = document.createElement("article");
  group.className = "effect-group";

  const label = document.createElement("h4");
  label.className = "effect-label";
  label.style.color = color;
  label.textContent = title;
  group.append(label);

  if (names.length === 0) {
    const empty = document.createElement("span");
    empty.className = "empty-result";
    empty.textContent = "Ninguno";
    group.append(empty);
    return group;
  }

  const chips = document.createElement("div");
  chips.className = "effect-types";
  for (const name of names) {
    const type = TYPES_BY_NAME.get(name);
    const chip = document.createElement("span");
    chip.className = "type-chip";
    chip.style.cssText = typeStyle(type);
    chip.textContent = type.name;
    chips.append(chip);
  }
  group.append(chips);
  return group;
}

function buildGroups(container, selectedType, view) {
  const groups = view === "attack"
    ? [
        ["Súper eficaz · x2", "#23845a", "double"],
        ["Poco eficaz · x½", "#a96413", "half"],
        ["Sin efecto · x0", "#70697a", "immune"],
      ]
    : [
        ["Débil · recibe x2", "#c14a48", "double"],
        ["Resiste · recibe x½", "#23845a", "half"],
        ["Inmune · recibe x0", "#70697a", "immune"],
      ];

  container.replaceChildren(...groups.map(([title, color, effect]) => {
    const names = TYPES.filter((type) => {
      const result = view === "attack"
        ? matchup(selectedType.name, type.name)
        : matchup(type.name, selectedType.name);
      return result === effect;
    }).map((type) => type.name);
    return renderGroup(title, color, names);
  }));
}

function render() {
  const selectedType = TYPES.find((type) => type.id === selectedId) ?? TYPES[0];
  selectedName.textContent = selectedType.name;
  selectedSwatch.style.backgroundColor = selectedType.color;
  attackCaption.textContent = `Movimientos de tipo ${selectedType.name.toLowerCase()}`;
  defenseCaption.textContent = `Daño recibido por un Pokémon de tipo ${selectedType.name.toLowerCase()}`;
  grid.querySelectorAll(".type-tile").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.type === selectedType.id));
  });
  buildGroups(attackGroups, selectedType, "attack");
  buildGroups(defenseGroups, selectedType, "defense");
}

grid.replaceChildren(...TYPES.map(createTile));
grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-type]");
  if (!button) return;
  selectedId = button.dataset.type;
  render();
});

function updateConnectionState() {
  if (!navigator.onLine) {
    connectionState.textContent = "Sin conexión";
  } else if (location.protocol === "file:") {
    connectionState.textContent = "Vista local";
  } else if (navigator.serviceWorker?.controller) {
    connectionState.textContent = "Lista sin conexión";
  } else {
    connectionState.textContent = "Primera visita";
  }
}
window.addEventListener("online", updateConnectionState);
window.addEventListener("offline", updateConnectionState);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", updateConnectionState);
}
function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("poketipos-theme", next);
  const lightBtn = document.querySelector("#theme-light");
  const darkBtn = document.querySelector("#theme-dark");
  lightBtn.setAttribute("aria-pressed", String(next === "light"));
  darkBtn.setAttribute("aria-pressed", String(next === "dark"));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = next === "dark" ? "#1c1828" : "#f4eef8";
}

applyTheme(localStorage.getItem("poketipos-theme") || "light");
document.querySelector("#theme-light").addEventListener("click", () => applyTheme("light"));
document.querySelector("#theme-dark").addEventListener("click", () => applyTheme("dark"));

updateConnectionState();
render();

const installButton = document.querySelector("#install-button");
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});
installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = undefined;
  installButton.hidden = true;
});
window.addEventListener("appinstalled", () => {
  installButton.hidden = true;
  deferredInstallPrompt = undefined;
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then(updateConnectionState)
      .catch(() => { connectionState.textContent = "Con conexión"; });
  });
}
