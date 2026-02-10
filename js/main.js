// named imports из mathUtils.js
import { add, square, calculateVat } from "./mathUtils.js";

// default + named import из stringUtils.js
import isAdult, { sayHello } from "./stringUtils.js";

// тесты в консоли
console.log(add(2, 3));
console.log(square(4));
console.log(calculateVat(100));
sayHello("Anna");
console.log(isAdult(20));
console.log(isAdult(15));
