// Function to clean user data
function cleanUserData(input) {
  console.log("=== START ===");

  // Remove whitespace from start and end
  let cleaned = input.trim();

  // Convert to lowercase
  cleaned = cleaned.toLowerCase();

  // Split into parts
  const parts = cleaned.split(";");

  let name = "";
  let age = "";
  let email = "";
  let city = "";

  // Process each field
  for (let part of parts) {
    let field = part.trim();

    if (field.startsWith("navn:")) {
      name = field.replace("navn:", "").trim();
    } else if (field.startsWith("alder:")) {
      age = field.replace("alder:", "").trim();
    } else if (field.startsWith("email:")) {
      email = field.replace("email:", "").trim();
    } else if (field.startsWith("by:")) {
      city = field.replace("by:", "").trim();
    }
  }

  // Extract age using regex
  const ageMatch = age.match(/\d+/);
  const ageNumber = ageMatch ? ageMatch[0] : null;

  // Format age with padStart
  const formattedAge = ageNumber
    ? ageNumber.padStart(3, "0")
    : null;

  // Validate email
  const validEmail =
    email.includes("@") &&
    email.includes(".") &&
    email.endsWith(".com");

  // Create username
  const nameParts = name.split(" ");
  let username = "";

  if (nameParts.length >= 2) {
    username =
      nameParts[0].slice(0, 3) +
      nameParts[1].slice(0, 3);
  }

  // Return final object
  return {
    name,
    age: ageNumber,
    formattedAge,
    email,
    city,
    username,
    validEmail
  };
}


// ===== UI Logic =====

// Get elements
const inputField = document.getElementById("inputField");
const cleanBtn = document.getElementById("cleanBtn");
const output = document.getElementById("output");
const exampleButtons = document.querySelectorAll(".exampleBtn");

// Handle example button clicks
exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {

    // Get text from button
    const exampleText = button.getAttribute("data-value");

    // Insert into textarea
    inputField.value = exampleText;

  });
});

// Handle clean button click
cleanBtn.addEventListener("click", () => {
  const input = inputField.value;

  if (!input.trim()) {
    output.textContent = "Please enter some data.";
    return;
  }

  const result = cleanUserData(input);

  // Show result nicely formatted
  output.textContent = JSON.stringify(result, null, 2);
});