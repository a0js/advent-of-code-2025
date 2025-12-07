let grid = $0.innerText.split("\n").map(line => line.split(""));

let splits = 0;
let beamIndexes = new Set();

for (let i=0; i < grid.length; i++) {
    if (i === 0) {
        let startIndex = grid[i].findIndex(v => v === "S");
        beamIndexes.add(startIndex);
        continue;
    }

    for (let j = 0; j < grid[i].length; j++) {
        let cell = grid[i][j];
        if (cell === "^" && beamIndexes.has(j)) {
            beamIndexes.delete(j);
            splits += 1;
            beamIndexes.add(j-1);
            beamIndexes.add(j+1);
        }
    }
}

console.log(splits)