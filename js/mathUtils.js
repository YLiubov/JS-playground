// Классическая функция
export function add(a, b) {
    return a + b;
}

// Arrow + implicit return
export const square = x => x * x; 

// Arrow + {} и return
export const calculateVat = price => {
    return price * 1.25;
}