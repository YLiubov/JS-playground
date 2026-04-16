// =========================
// GET HTML ELEMENTS
// =========================

const cookieBanner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");
const userChoice = document.getElementById("userChoice");

// =========================
// COOKIE FUNCTIONS
// =========================

// Create a cookie
// name = cookie name
// value = cookie value
// days = how many days the cookie should live
function setCookie(name, value, days = 2) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Read a cookie by name
// Returns the cookie value if it exists
// Returns null if it does not exist
function getCookie(name) {
  const foundCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(name + "="));

  if (foundCookie) {
    return foundCookie.split("=")[1];
  }

  return null;
}

// Delete a cookie
function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

// =========================
// UI FUNCTIONS
// =========================

// Show the cookie banner
function showBanner() {
  cookieBanner.classList.remove("hidden");
}

// Hide the cookie banner
function hideBanner() {
  cookieBanner.classList.add("hidden");
}

// Show the user's current choice on the page
function showUserChoice() {
  const consent = getCookie("cookieConsent");

  if (consent === "true") {
    userChoice.textContent = "Du har accepteret cookies.";
  } else if (consent === "false") {
    userChoice.textContent = "Du har afvist cookies.";
  } else {
    userChoice.textContent = "Du har ikke valgt endnu.";
  }
}

// =========================
// PAGE LOAD
// =========================

// Check if the cookie already exists when the page loads
const consent = getCookie("cookieConsent");

// If there is no cookie yet, show the banner
if (consent === null) {
  showBanner();
} else {
  hideBanner();
}

showUserChoice();

// =========================
// BUTTON EVENTS
// =========================

// Accept cookies
acceptBtn.addEventListener("click", () => {
  setCookie("cookieConsent", "true", 2);
  hideBanner();
  showUserChoice();

  console.log("Cookie accepteret");
});

// Reject cookies
rejectBtn.addEventListener("click", () => {
  setCookie("cookieConsent", "false", 2);
  hideBanner();
  showUserChoice();

  console.log("Cookie afvist");
});