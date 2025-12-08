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

let coords = $0.innerText.split("\n")
    .map((coord, index) => new Coord(coord, index)
);

let NUM_CONNECTIONS = 1000;
let NUM_CIRCUITS = 3;

let connections = [];
let visitedConnectionIds = new Set()

for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length; j++) {
        if (i === j) continue;
        let connection = new Connection(coords[i], coords[j]);
        if (!visitedConnectionIds.has(connection.id)) {
            visitedConnectionIds.add(connection.id);
            let insertIndex = connections.findIndex(conn => connection.distance < conn.distance);
            if (insertIndex < 0) {
                connections.push(connection)
            } else {
                connections.splice(insertIndex,0, connection);
            }

            if (connections.length > NUM_CONNECTIONS) {
                connections.pop();
            }
        }
    }
}

for (let conn of connections) {
    coords[conn.coord1.index].connections.add(conn);
    coords[conn.coord2.index].connections.add(conn);
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

let visited = new Set();
let connectedNetworksDepths = coords.map(coord => getDepth(coord, visited)).sort((a,b) => b-a);
let circuits = connectedNetworksDepths.slice(0, NUM_CIRCUITS);

let answer = circuits.reduce((acc, val) => acc * val, 1);

console.log(answer);