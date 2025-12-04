let grid = $0.innerText.split("\n");

let rows = grid.length;
let cols = grid[0].length;

function isCellFilled(r,c) {
    return grid[r][c] === "@";
}
function getNeighbors(index) {
    let r = Math.floor(index / cols);
    let c = index % cols

    if (!isCellFilled(r,c)) {
        return null
    }

    let neighbors = new Set();
    for (let rd = -1; rd <= 1; rd++) {
        for (let cd = -1; cd <= 1; cd++) {
            let nr = r + rd;
            let nc = c + cd;

            let isValidNeighbor = 0 <= nr &&
                nr < rows &&
                0 <= nc &&
                nc < cols &&
                !(nr === r && nc === c);

            if (isValidNeighbor && isCellFilled(nr, nc)) {
                neighbors.add(nr * cols + nc)
            }
        }
    }
    if (neighbors.size < 4) {
        stack.push(index)
    }
    return neighbors;
}

let stack = [];
let adjacentFilledNeighbors = Array.from(
        {length: rows * cols},
        (_,i) => getNeighbors(i)
);

let count = 0;
let visited = new Set(stack);

while (stack.length) {
    let index = stack.pop();
    for (let neighborIndex of adjacentFilledNeighbors[index] ?? []) {
        adjacentFilledNeighbors[neighborIndex]?.delete(index)
        if (
            adjacentFilledNeighbors[neighborIndex] &&
            adjacentFilledNeighbors[neighborIndex].size < 4 &&
            !visited.has(neighborIndex)
        ) {
            stack.push(neighborIndex)
            visited.add(neighborIndex)
        }
    }
    adjacentFilledNeighbors[index] = null
    count++
}

console.log(count)