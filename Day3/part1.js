let inputs = $0.innerText.split("\n");

let joltages = [];

let getDigitLocations = (target) => (acc, val, i) => {
    if (val == target) {
        acc.push(i)
    }
    return acc;
}

function getMaxJoltageFromBank(bank) {
    let cells = bank.split("").map(n => parseInt(n));
    let largestDigit = cells.reduce(
        (acc, val) => val > acc ? val: acc,
        0
    );
    let secondLargestDigit = cells.reduce(
        (acc, val) => {
            if (val > acc && val < largestDigit) {
                return val
            } else {
                return acc
            }
        },
        0
    );
    let largestDigitLocations = cells.reduce(getDigitLocations(largestDigit),[])
    let secondLargetsDigitLocations = cells.reduce(getDigitLocations(secondLargestDigit),[])
    if (largestDigitLocations.length >= 2) {
        return parseInt(`${largestDigit}${largestDigit}`);
    } else if (largestDigitLocations.some(li => secondLargetsDigitLocations.some(si => li < si))) {
        return parseInt(`${largestDigit}${secondLargestDigit}`);
    } else if (largestDigitLocations[0] == bank.length - 1){
        return parseInt(`${secondLargestDigit}${largestDigit}`)
    } else {
        let largestDigitAfterLastLargest = cells.slice(largestDigitLocations[0] + 1)
            .reduce((acc, val) => val > acc ? val: acc, 0)
        return parseInt(`${largestDigit}${largestDigitAfterLastLargest}`)
    }
}

inputs.forEach(bank => {
    joltages.push(getMaxJoltageFromBank(bank));
})

let maxJoltage = joltages.reduce((acc, val) => acc + val, 0);
console.log(maxJoltage);