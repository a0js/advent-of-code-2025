let raw_input = $0.innerText.split("\n");

let ranges = [];
let checks = [];

for (let val of raw_input) {
    if (val.includes("-")) {
        let range = val.split("-").map(v => parseInt(v));
        ranges.push(range);
    } else if (val != "") {
        checks.push(parseInt(val));
    }
}

let count = 0;
outer: for (let check of checks) {
    for (let range of ranges) {
        if (check >= range[0] && check <= range[1]) {
            count++;
            continue outer;
        }
    }
}

console.log(count);