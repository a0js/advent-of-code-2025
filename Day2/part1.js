let inputs = $0.innerText.split(",").map(input => input.split("-"))

let foundDoublets = [];

function containsDoublet(num) {
    let str = `${num}`
    let numLength = str.length;
    if (numLength % 2 == 0 && numLength > 0) {
        let firstHalf = str.substring(0,numLength/2);
        let secondHalf = str.substring(numLength/2);
        return firstHalf == secondHalf;
    } else {
        return false;
    }
}

function process_inputs([start,end]) {
    let startNumber = parseInt(start);
    let endNumber = parseInt(end);

    for (i = startNumber; i <= endNumber; i++) {
        if (containsDoublet(i)) {
            foundDoublets.push(i)
        }
    }
}


inputs.forEach(process_inputs)

let sumTotal = foundDoublets.reduce((acc, val) => val + acc, 0);

console.log(foundDoublets)
console.log(sumTotal)