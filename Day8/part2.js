// This takes a long long time to calculate. I need to come up with a better way.

class Coord {
    constructor(id, index) {
        let [x, y, z] = id.split(",").map(val => parseInt(val));
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        this.index = index;
        this.connections = new Set();
    }

    isEqual(coord) {
        return this.id === coord.id
    }

    [Symbol.toPrimitive]() {
        return this.id;
    }
}

class Connection {
    constructor(coord1, coord2) {
        if (coord1.id < coord2.id) {
            this.coord1 = coord1;
            this.coord2 = coord2;
        } else {
            this.coord2 = coord1;
            this.coord1 = coord2;
        }
        this.id = `${this.coord1}<->${this.coord2}`;
        this.distance = Connection.findDistance(coord1, coord2);
    }

    [Symbol.toPrimitive]() {
        return this.id;
    }

    static findDistance(coord1, coord2) {
        return Math.sqrt(
            Math.pow(coord2.x - coord1.x, 2) +
            Math.pow( coord2.y - coord1.y, 2) +
            Math.pow(coord2.z - coord1.z, 2)
        )
    }

    isEqual(connection) {
        return (this.coord1.isEqual(connection.coord1) && this.coord2.isEqual(connection.coord2)) ||
            (this.coord1.isEqual(connection.coord2) && this.coord2.isEqual(connection.coord1))
    }

    activate() {
        this.activated = true;
    }
}

let coords = $0.innerText.split("\n").filter(str => str.length > 0)
    .map((coord, index) => new Coord(coord, index)
);

let connections = [];
let visitedConnectionIds = new Set()

for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length; j++) {
        if (i === j) continue;
        let connection = new Connection(coords[i], coords[j]);
        if (!visitedConnectionIds.has(connection.id)) {
            visitedConnectionIds.add(connection.id);
            connections.push(connection)
        }
    }
}

connections.sort((a,b) => a.distance - b.distance);

let answer = 0;
for (let conn of connections) {
    coords[conn.coord1.index].connections.add(conn);
    coords[conn.coord2.index].connections.add(conn);

    let visited = new Set();
    let depth = getDepth(coords[conn.coord1.index], visited);
    if (depth === coords.length) {
        console.log(conn)
        answer = conn.coord1.x * conn.coord2.x;
        break;
    }
}

function getDepth(coord, visited) {
    if (visited.has(coord)) return 0;
    visited.add(coord)
    let depth = 1;
    for (let conn of coord.connections) {
        let connectedCoord = conn.coord1 == coord ? conn.coord2 : conn.coord1;

        depth += getDepth(connectedCoord, visited)
    }

    return depth;
}

console.log(answer);