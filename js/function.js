function add(a, b) {
  return a + b;
}
console.log(add(50, 0.32));

// ======================================

function sayHello(name) {
  console.log("Hej " + name);
}

sayHello("Trolala");

// ======================================

const square = x => x * x;

console.log(square(4))

// ======================================

const calculateVat = price => {
  return price * 1.25;
};
console.log(calculateVat(100));

// ======================================

function isAdult(age) {
  return age >= 18;
}

console.log(isAdult(14));
console.log(isAdult(18));
console.log(isAdult(23));