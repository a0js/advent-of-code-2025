let grid = $0.innerText.split("\n").map(line => line.split(""));

let paths = Array(grid[0].length).fill(0);

for (let i=0; i < grid.length; i++) {
    if (i === 0) {
        let startIndex = grid[i].findIndex(v => v === "S");
        paths[startIndex] = 1
        continue;
    }

    for (let j = 0; j < grid[i].length; j++) {
        let cell = grid[i][j];
        if (cell === "^" && paths[j] > 0) {
            let currentPaths = paths[j];
            paths[j] = 0;
            paths[j-1] += currentPaths;
            paths[j+1] += currentPaths;
        }
    }
}

let totalPaths = paths.reduce((acc, val) => acc + val, 0);

console.log(totalPaths)