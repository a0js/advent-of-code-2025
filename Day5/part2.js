//let raw_input = $0.innerText.split("\n");
//
//let ranges = [];
//
//
//let freshIds = new Set();
//
//for (let val of raw_input) {
//    if (val.includes("-")) {
//        let [start, end] = val.split("-").map(v => parseInt(v));
//        for (let i = start; i <= end; i++) {
//            freshIds.add(i)
//        }
//    }
//}
//
//console.log(freshIds.size);

// ^ Set maximum size exceeded

let raw_input = $0.innerText.split("\n");

let ranges = [];

for (let val of raw_input) {
    if (val.includes("-")) {
        let range = val.split("-").map(v => parseInt(v));
        ranges.push(range);
    }
}

ranges.sort((a, b) => a[0] - b[0])

let final_ranges_cursor = 0;
let final_ranges = [];
for (let i = 0; i < ranges.length; i++) {
    if (i === 0) {
        final_ranges.push([...ranges[i]]);
        continue;
    }

    let [, current_end] = final_ranges[final_ranges_cursor];
    let [start, end] = ranges[i];
    if (start > current_end) {
        final_ranges.push([...ranges[i]]);
        final_ranges_cursor++;
    } else if (end > current_end) {
        final_ranges[final_ranges_cursor][1] = end;
    }
}

// add 1 to the end to account for inclusivity
let count = final_ranges.reduce((acc, [start, end]) => acc + ((end + 1) - start),0);
console.log(count);