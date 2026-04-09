import { cleanUserData } from "./clean";

const nameInput = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const deleteBtn = document.getElementById("deleteBtn");
const sessionBtn = document.getElementById("sessionBtn");
const deleteSessionBtn = document.getElementById("deleteSessionBtn");
const addListBtn = document.getElementById("addListBtn");
const result = document.getElementById("result");
const nameList = document.getElementById("nameList");
const localDisplay = document.getElementById("localDisplay");
const sessionDisplay = document.getElementById("sessionDisplay");

const rawInput = document.getElementById("rawInput");
const cleanBtn = document.getElementById("cleanBtn");
const cleanResult = document.getElementById("cleanResult");

// Run clean function
cleanBtn.addEventListener("click", () => {
  const input = rawInput.value;

  if (!input.trim()) {
    cleanResult.textContent = "Please enter data";
    return;
  }

  const result = cleanUserData(input);

  cleanResult.textContent = JSON.stringify(result, null, 2);
});

// Save one name in localStorage
saveBtn.addEventListener("click", () => {
  const value = nameInput.value.trim();

  if (value === "") {
    result.textContent = "Please enter a name.";
    return;
  }

  localStorage.setItem("username", value);
  result.textContent = `Name saved in localStorage: ${value}`;
  updateDisplays();
});

// Load one name from localStorage
loadBtn.addEventListener("click", () => {
  const savedName = localStorage.getItem("username");

  if (savedName) {
    result.textContent = `Saved name from localStorage: ${savedName}`;
  } else {
    result.textContent = "No name has been saved in localStorage.";
  }

  updateDisplays();
});

// Delete one name from localStorage
deleteBtn.addEventListener("click", () => {
  localStorage.removeItem("username");
  result.textContent = "Name deleted from localStorage.";
  updateDisplays();
});

// Save one name in sessionStorage
sessionBtn.addEventListener("click", () => {
  const value = nameInput.value.trim();

  if (value === "") {
    result.textContent = "Please enter a name.";
    return;
  }

  sessionStorage.setItem("tempName", value);
  result.textContent = `Name saved in sessionStorage: ${value}`;
  updateDisplays();
});

// Delete one name from sessionStorage
deleteSessionBtn.addEventListener("click", () => {
  sessionStorage.removeItem("tempName");
  result.textContent = "Name deleted from sessionStorage.";
  updateDisplays();
});

// Add names to array in localStorage
addListBtn.addEventListener("click", () => {
  const value = nameInput.value.trim();

  if (value === "") {
    result.textContent = "Please enter a name.";
    return;
  }

  const data = JSON.parse(localStorage.getItem("names")) || [];
  data.push(value);

  localStorage.setItem("names", JSON.stringify(data));
  result.textContent = `${value} added to the localStorage list.`;

  renderList();
  updateDisplays();
  nameInput.value = "";
});

// Render the list from localStorage
function renderList() {
  const data = JSON.parse(localStorage.getItem("names")) || [];

  nameList.innerHTML = "";

  data.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    li.className =
      "rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm";
    nameList.appendChild(li);
  });
}

// Update storage info on the page
function updateDisplays() {
  const localName = localStorage.getItem("username");
  const sessionName = sessionStorage.getItem("tempName");

  if (localName) {
    localDisplay.textContent = `LocalStorage: ${localName}`;
  } else {
    localDisplay.textContent = "LocalStorage: empty";
  }

  if (sessionName) {
    sessionDisplay.textContent = `SessionStorage: ${sessionName}`;
  } else {
    sessionDisplay.textContent = "SessionStorage: empty";
  }
}

// Show saved data when page loads
renderList();
updateDisplays();