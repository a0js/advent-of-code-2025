let inputs = $0.innerText.split("\n");

let NUM_CELLS = 12;

let joltages = [];

function getMaxJoltageFromBank(bank) {
    let cells = bank.split("").map(n => parseInt(n));
    let current = Array.from({length:NUM_CELLS}, () => 0);

    function clearCurrent(startIndex) {
        for (let i = startIndex; i < NUM_CELLS; i++) {
            current[i] = 0;
        }
    }

    outer: for (let i = 0; i < cells.length; i++) {
        let remaining = cells.length - i;
        let cell = cells[i];
        let startIndex = Math.max(NUM_CELLS - remaining, 0);
        for (let j = startIndex; j < NUM_CELLS; j++) {
            if (cell > current[j]) {
                current[j] = cell;
                clearCurrent(j + 1);
                continue outer;
            }
        }
    }

    return parseInt(current.reduce((acc, val) => `${acc}${val}`,""))
}

inputs.forEach(bank => {
    joltages.push(getMaxJoltageFromBank(bank));
})

let maxJoltage = joltages.reduce((acc, val) => acc + val, 0);
console.log(maxJoltage);