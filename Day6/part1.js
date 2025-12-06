let rows = $0.innerText.split("\n")
    .map(row => row
        .trim()
        .replaceAll(/\s+/g, " ")
        .split(" ")
    ).filter(arr => arr.length > 1);

let [operators] = rows.splice(-1, 1);

let total = 0;
for (let i = 0; i < rows[0].length; i++) {
    let val = 0;
    if (operators[i] === "*") {
        val = 1;
        for (let operand of rows) {
            val *= parseInt(operand[i]);
        }
    } else if (operators[i] === "+") {
        for (let operand of rows) {
            val += parseInt(operand[i]);
        }
    }
    total += val
}

console.log(total)