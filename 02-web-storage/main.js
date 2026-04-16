// Main parts of the page
const body = document.getElementById("body");
const card = document.getElementById("card");
const subtitle = document.getElementById("subtitle");
const sessionText = document.getElementById("sessionText");
const localText = document.getElementById("localText");

// Input and buttons
const noteInput = document.getElementById("noteInput");
const themeBtn = document.getElementById("themeBtn");
const addSessionBtn = document.getElementById("addSessionBtn");
const saveLocalBtn = document.getElementById("saveLocalBtn");
const deleteSessionBtn = document.getElementById("deleteSessionBtn");
const clearSessionBtn = document.getElementById("clearSessionBtn");
const deleteLocalBtn = document.getElementById("deleteLocalBtn");

// Status and lists
const status = document.getElementById("status");
const sessionList = document.getElementById("sessionList");
const localList = document.getElementById("localList");

// =========================
// SELECTED ITEM VARIABLES
// =========================

// These variables store which note is selected right now.
// null means nothing is selected.
let selectedSessionIndex = null;
let selectedLocalIndex = null;

// =========================
// STORAGE HELPERS
// =========================

// Get notes from sessionStorage.
// If there is nothing saved yet, return an empty array.
function getSessionNotes() {
  return JSON.parse(sessionStorage.getItem("sessionNotes")) || [];
}

// Save notes to sessionStorage.
function setSessionNotes(notes) {
  sessionStorage.setItem("sessionNotes", JSON.stringify(notes));
}

// Get notes from localStorage.
// If there is nothing saved yet, return an empty array.
function getLocalNotes() {
  return JSON.parse(localStorage.getItem("localNotes")) || [];
}

// Save notes to localStorage.
function setLocalNotes(notes) {
  localStorage.setItem("localNotes", JSON.stringify(notes));
}

// =========================
// STATUS MESSAGE
// =========================

// Show a message to the user.
function setStatus(message) {
  status.textContent = message;
}

// =========================
// THEME FUNCTIONS
// =========================

// This function changes the page colors.
// We use simple if/else so the logic is easy to understand.
function applyTheme(theme) {
  if (theme === "dark") {
    // Change body colors
    body.className =
      "min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300";

    // Change card colors
    card.className =
      "bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors duration-300";

    // Change input colors
    noteInput.className =
      "w-full rounded-xl border border-slate-600 px-4 py-3 bg-slate-700 text-white outline-none focus:ring-2 focus:ring-sky-400 transition-colors duration-300";

    // Change status box colors
    status.className =
      "rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 min-h-[52px] flex items-center transition-colors duration-300";

    // Change small text colors
    subtitle.className = "text-slate-400 mt-1";
    sessionText.className = "text-sm text-slate-400 mb-3";
    localText.className = "text-sm text-slate-400 mb-3";

    // Change theme button text and style
    themeBtn.textContent = "☀️ Light Mode";
    themeBtn.className =
      "rounded-xl bg-yellow-400 text-slate-900 px-4 py-3 hover:bg-yellow-500 transition";
  } else {
    // Light theme colors
    body.className =
      "min-h-screen bg-slate-100 text-slate-800 transition-colors duration-300";

    card.className =
      "bg-white rounded-2xl shadow-lg p-8 transition-colors duration-300";

    noteInput.className =
      "w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-sky-400 transition-colors duration-300";

    status.className =
      "rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 min-h-[52px] flex items-center transition-colors duration-300";

    subtitle.className = "text-slate-500 mt-1";
    sessionText.className = "text-sm text-slate-500 mb-3";
    localText.className = "text-sm text-slate-500 mb-3";

    themeBtn.textContent = "🌙 Dark Mode";
    themeBtn.className =
      "rounded-xl bg-slate-800 text-white px-4 py-3 hover:bg-slate-900 transition";
  }

  // Re-render lists so selected items also get correct colors
  renderSessionList();
  renderLocalList();
}

// =========================
// RENDER SESSION LIST
// =========================

// This function draws all notes from sessionStorage on the page.
function renderSessionList() {
  const notes = getSessionNotes();
  const theme = localStorage.getItem("theme") || "light";

  // Clear old list before drawing again
  sessionList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    // Different styles for dark and light theme
    if (theme === "dark") {
      if (selectedSessionIndex === index) {
        li.className =
          "cursor-pointer rounded-xl border border-amber-500 bg-amber-900 text-white px-4 py-3 shadow-sm transition";
      } else {
        li.className =
          "cursor-pointer rounded-xl border border-slate-600 bg-slate-700 text-slate-100 px-4 py-3 shadow-sm hover:bg-slate-600 transition";
      }
    } else {
      if (selectedSessionIndex === index) {
        li.className =
          "cursor-pointer rounded-xl border border-amber-500 bg-amber-100 text-slate-900 px-4 py-3 shadow-sm transition";
      } else {
        li.className =
          "cursor-pointer rounded-xl border border-slate-200 bg-slate-50 text-slate-800 px-4 py-3 shadow-sm hover:bg-slate-100 transition";
      }
    }

    // When the user clicks on a session note:
    // 1. select this note
    // 2. remove local selection
    // 3. update both lists
    li.addEventListener("click", () => {
      selectedSessionIndex = index;
      selectedLocalIndex = null;

      renderSessionList();
      renderLocalList();

      setStatus(`Selected session note: ${note}`);
    });

    sessionList.appendChild(li);
  });
}

// =========================
// RENDER LOCAL LIST
// =========================

// This function draws all notes from localStorage on the page.
function renderLocalList() {
  const notes = getLocalNotes();
  const theme = localStorage.getItem("theme") || "light";

  // Clear old list before drawing again
  localList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    // Different styles for dark and light theme
    if (theme === "dark") {
      if (selectedLocalIndex === index) {
        li.className =
          "cursor-pointer rounded-xl border border-sky-500 bg-sky-900 text-white px-4 py-3 shadow-sm transition";
      } else {
        li.className =
          "cursor-pointer rounded-xl border border-slate-600 bg-slate-700 text-slate-100 px-4 py-3 shadow-sm hover:bg-slate-600 transition";
      }
    } else {
      if (selectedLocalIndex === index) {
        li.className =
          "cursor-pointer rounded-xl border border-sky-500 bg-sky-100 text-slate-900 px-4 py-3 shadow-sm transition";
      } else {
        li.className =
          "cursor-pointer rounded-xl border border-slate-200 bg-slate-50 text-slate-800 px-4 py-3 shadow-sm hover:bg-slate-100 transition";
      }
    }

    // When the user clicks on a local note:
    // 1. select this note
    // 2. remove session selection
    // 3. update both lists
    li.addEventListener("click", () => {
      selectedLocalIndex = index;
      selectedSessionIndex = null;

      renderLocalList();
      renderSessionList();

      setStatus(`Selected local note: ${note}`);
    });

    localList.appendChild(li);
  });
}

// =========================
// ADD TO SESSION
// =========================

// Add the current textarea value to sessionStorage
function addNoteToSession() {
  const value = noteInput.value.trim();

  // Do not save empty text
  if (value === "") {
    setStatus("Please write a note first.");
    return;
  }

  // Get current session notes
  const notes = getSessionNotes();

  // Add new note
  notes.push(value);

  // Save updated array back to sessionStorage
  setSessionNotes(notes);

  // Clear input field
  noteInput.value = "";

  // Update session list
  renderSessionList();

  setStatus(`Added to session: ${value}`);
}

// Add note when button is clicked
addSessionBtn.addEventListener("click", () => {
  addNoteToSession();
});

// Add note when Enter is pressed
noteInput.addEventListener("keydown", (event) => {
  // Enter saves the note, Shift + Enter creates a new line
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    addNoteToSession();
  }
});

// =========================
// SAVE SELECTED TO LOCAL
// =========================

// Save one selected session note into localStorage.
saveLocalBtn.addEventListener("click", () => {
  const sessionNotes = getSessionNotes();

  // User must select one session item first
  if (selectedSessionIndex === null) {
    setStatus("Please select a session note first.");
    return;
  }

  // Get the selected note
  const selectedNote = sessionNotes[selectedSessionIndex];

  // Get current local notes
  const localNotes = getLocalNotes();

  // Add selected note to local notes
  localNotes.push(selectedNote);

  // Save updated local notes
  setLocalNotes(localNotes);

  // Update local list
  renderLocalList();

  setStatus(`Saved to local: ${selectedNote}`);
});

// =========================
// DELETE SELECTED SESSION ITEM
// =========================

// Delete one selected note from sessionStorage.
deleteSessionBtn.addEventListener("click", () => {
  const sessionNotes = getSessionNotes();

  // User must select one session item first
  if (selectedSessionIndex === null) {
    setStatus("Please select a session note to delete.");
    return;
  }

  // Save note text before deleting it
  const deletedNote = sessionNotes[selectedSessionIndex];

  // Remove one item from array
  sessionNotes.splice(selectedSessionIndex, 1);

  // Save updated session notes
  setSessionNotes(sessionNotes);

  // Reset selection
  selectedSessionIndex = null;

  // Update session list
  renderSessionList();

  setStatus(`Deleted from session: ${deletedNote}`);
});

// =========================
// CLEAR SESSION
// =========================

// Delete all notes from sessionStorage.
clearSessionBtn.addEventListener("click", () => {
  sessionStorage.removeItem("sessionNotes");

  // Reset selection
  selectedSessionIndex = null;

  // Update session list
  renderSessionList();

  setStatus("All session notes cleared.");
});

// =========================
// DELETE SELECTED LOCAL ITEM
// =========================

// Delete one selected note from localStorage.
deleteLocalBtn.addEventListener("click", () => {
  const localNotes = getLocalNotes();

  // User must select one local item first
  if (selectedLocalIndex === null) {
    setStatus("Please select a local note to delete.");
    return;
  }

  // Save note text before deleting
  const deletedNote = localNotes[selectedLocalIndex];

  // Remove one item from array
  localNotes.splice(selectedLocalIndex, 1);

  // Save updated local notes
  setLocalNotes(localNotes);

  // Reset selection
  selectedLocalIndex = null;

  // Update local list
  renderLocalList();

  setStatus(`Deleted from local: ${deletedNote}`);
});

// =========================
// TOGGLE THEME
// =========================

// Change theme and save it in localStorage.
themeBtn.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light";

  let newTheme = "light";

  if (currentTheme === "light") {
    newTheme = "dark";
  } else {
    newTheme = "light";
  }

  // Save theme in localStorage
  localStorage.setItem("theme", newTheme);

  // Apply theme immediately
  applyTheme(newTheme);

  setStatus(`Theme changed to ${newTheme}.`);
});

// =========================
// INITIAL LOAD
// =========================

// When the page opens:
// 1. get saved theme
// 2. apply it
// 3. render both lists
const savedTheme = localStorage.getItem("theme") || "light";

applyTheme(savedTheme);