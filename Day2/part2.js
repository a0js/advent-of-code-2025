let inputs = $0.innerText.split(",").map(input => input.split("-"))

let foundRepeats = [];

function containsRepeats(num) {
    let str = `${num}`;
    let numLength = str.length;
    let halfLength = Math.floor(numLength/2);

    for (let repeatable_length = 1; repeatable_length <= halfLength; repeatable_length++) {
        if (numLength % repeatable_length == 0) {
            let subDigits = [];
            for (let index = 0; index < numLength; index += repeatable_length) {
                subDigits.push(str.substring(index, index + repeatable_length));
            }
            if (subDigits.every(val => val == subDigits[0])) {
                return true;
            }
        }
    }
    return false;
}

function process_inputs([start,end]) {
    let startNumber = parseInt(start);
    let endNumber = parseInt(end);

    for (let i = startNumber; i <= endNumber; i++) {
        if (containsRepeats(i)) {
            foundRepeats.push(i)
        }
    }
}


inputs.forEach(process_inputs)

let sumTotal = foundRepeats.reduce((acc, val) => val + acc, 0);

console.log(foundRepeats)
console.log(sumTotal)