let vetor = [5, 3, 2, 4, 7, 1, 0, 6];

function bubbleSort(items) {
    let length = items.length;  
    for (let i = 0; i < length; i++) { 
        for (let j = 0; j < (length - i - 1); j++) { 
            if(items[j] > items[j+1]) {
                let tmp = items[j]; 
                items[j] = items[j+1]; 
                items[j+1] = tmp; 
            }
        }        
    }
}

console.log(vetor);
bubbleSort(vetor);
console.log(vetor);