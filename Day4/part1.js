let grid = $0.innerText.split("\n")
    .map(row => row.split(""));

let NEIGHBORS = [
    [-1,-1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
]

function countFilledNeighbors(i, j) {
    return NEIGHBORS.reduce((acc, [deltaRow, deltaCol]) => {
        let cellRowIndex = i + deltaRow;
        let cellColIndex = j + deltaCol;

        let outOfBounds = cellRowIndex < 0 ||
            cellRowIndex >= grid.length ||
            cellColIndex < 0 ||
            cellColIndex >= grid[0].length

        if (
            !outOfBounds &&
            grid[cellRowIndex][cellColIndex] === "@"
        ) {
            acc++
        }
        return acc
    }, 0)
}

let count = 0;

for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === "@" && countFilledNeighbors(r,c) < 4) {
            count++
        }
    }
}

console.log(count)