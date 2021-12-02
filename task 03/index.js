/*
    To test this code, pass the desired number as an argument.
    Example: node index.js 5
*/

let number = process.argv[2] || 1;
let resul = number;

if (number < 2) return console.log('Tente novamente com outro numero...');

for(let i = number - 1; i > 1; i-- ){
    resul *= i;
}

console.log(`${number}! = ${resul}`);