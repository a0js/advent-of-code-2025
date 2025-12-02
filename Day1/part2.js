const inputs = $0.innerText.split("\n").map(n => {
    let direction = n.slice(0,1) == "R" ? 1 : -1;
    return [direction, parseInt(n.slice(1))];
})

let current = 50
let zero_count = 0

function apply_input([direction, distance]) {
    for (i=0; i < distance; i++) {
        if (current == 0) {
            zero_count += 1
            if (direction == -1) {
                current = 100
            }
        } else if (current == 99 && direction == 1) {
            current = -1
        }

        current += direction
    }
}

inputs.forEach(apply_input)

console.log(zero_count)