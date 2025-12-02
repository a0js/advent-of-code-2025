const inputs = $0.innerText.split("\n").map(n => {
    let direction = n.slice(0,1) == "R" ? 1 : -1;
    return parseInt(n.slice(1)) * direction;
})

let current = 50;

let zero_count = 0;

function apply_input(input) {
    current = (((current + input) % 100) + 100) % 100
    if (current == 0) {
        zero_count += 1
    }
}

inputs.forEach(apply_input)

console.log(zero_count)