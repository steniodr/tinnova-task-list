/*
    To test this code, pass the desired number as an argument.
    Example: node index.js 5
*/

let number = process.argv[2] || 1;

function divThreeOrFive(num) {
    if (num % 3 == 0 || num % 5 == 0)
        return true;
}

let resul = 0;
for(let i = 0; i < number; i++) {
    if (divThreeOrFive(i)) resul += i;
}

console.log(resul);
