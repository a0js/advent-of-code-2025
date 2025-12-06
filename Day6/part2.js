let grid = $0.innerText.split("\n")
    .map(row => row.split(""))
    .filter(arr => arr.length > 1)

let operandsStrings = Array(grid[0].length).fill("");
let operators = [];
for (let i = 0; i < grid.length; i++) {
    for (let j = grid[0].length - 1; j >= 0; j--) {
        if(grid[i][j] === "*" || grid[i][j] === "+") {
            operators.unshift(grid[i][j]);
        } else {
            operandsStrings[j] = `${operandsStrings[j]}${grid[i][j]}`;
        }
    }
}

let operandCursor = operators.length -1;
let operands = Array(operators.length);
for (let i = operandsStrings.length - 1; i >= 0; i--){
    let operand = parseInt(operandsStrings[i]);
    if (isNaN(operand)) {
        operandCursor--;
    } else if (Array.isArray(operands[operandCursor])) {
        operands[operandCursor].push(operand);
    } else {
        operands[operandCursor] = [operand];
    }
}


let total = 0;
for (let i = 0; i < operators.length; i++) {
    let val = 0;
    if (operators[i] === "*") {
        val = 1;
        for (let operand of operands[i]) {
            val *= operand;
        }
    } else if (operators[i] === "+") {
        for (let operand of operands[i]) {
            val += operand;
        }
    }
    total += val
}

console.log(total)