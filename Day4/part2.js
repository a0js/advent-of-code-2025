let grid = $0.innerText.split("\n")
    .map(row => row.split(""));

let rows = grid.length;
let cols = grid[0].length;

let cellList = Array.from(
    {length: rows * cols},
    (_, i) => {
        return [Math.floor(i / cols), i % cols]
    }
)

function getCellListIndex(r,c) {
    return (r*cols) + c;
}

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
function getFilledNeighbors([i, j]) {
    return NEIGHBORS.reduce((acc, [deltaRow, deltaCol]) => {
        let cellRowIndex = i + deltaRow;
        let cellColIndex = j + deltaCol;

        let outOfBounds = cellRowIndex < 0 ||
            cellRowIndex >= grid.length ||
            cellColIndex < 0 ||
            cellColIndex >= grid[0].length

        if (
            grid[i][j] === "@" &&
            !outOfBounds &&
            grid[cellRowIndex][cellColIndex] === "@"
        ) {
            acc.add(getCellListIndex(cellRowIndex, cellColIndex))
        }
        return acc
    }, new Set())
}

let adjacentFilledNeighbors = cellList.map(getFilledNeighbors)

function getRemovable() {
   return adjacentFilledNeighbors.reduce((acc, value, index) => {
        let [r,c] = cellList[index];
        if (grid[r][c] === "@" && value.size < 4) {
            acc.push(index)
        }
        return acc;
    }, [])
}

let count = 0;
let stack = getRemovable();

while (stack.length) {
    let index = stack.pop();
    for (let neighborIndex of adjacentFilledNeighbors[index]) {
        let [r,c] = cellList[neighborIndex];
        adjacentFilledNeighbors[neighborIndex].delete(index)
        if (
            grid[r][c] === "@" &&
            adjacentFilledNeighbors[neighborIndex].size < 4 &&
            !stack.includes(neighborIndex)
        ) {
            stack.push(neighborIndex)
        }
    }
    adjacentFilledNeighbors[index].clear()
    count++
}

console.log(count)