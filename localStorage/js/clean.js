// clean.js

export function cleanUserData(input) {
  console.log("=== START ===");

  let cleaned = input.trim();
  cleaned = cleaned.toLowerCase();

  const parts = cleaned.split(";");

  let name = "";
  let age = "";
  let email = "";
  let city = "";

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

  const ageMatch = age.match(/\d+/);
  const ageNumber = ageMatch ? ageMatch[0] : null;

  const formattedAge = ageNumber
    ? ageNumber.padStart(3, "0")
    : null;

  const validEmail =
    email.includes("@") &&
    email.includes(".") &&
    email.endsWith(".com");

  const nameParts = name.split(" ");
  let username = "";

  if (nameParts.length >= 2) {
    username =
      nameParts[0].slice(0, 3) +
      nameParts[1].slice(0, 3);
  } else {
    username = name.slice(0, 3);
  }

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