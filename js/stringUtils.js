// Классическая функция (named export)
export function sayHello(name) {
    console.log('Hej ' + name);
}


// Дополнительно (default export)
export default function isAdult(age) {
  return age >= 18;
}