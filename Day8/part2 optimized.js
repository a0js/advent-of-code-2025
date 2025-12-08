// This version runs much better.

class Coord {
    constructor(id, index) {
        let [x, y, z] = id.split(",").map(val => parseInt(val));
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        this.index = index;
        this.network = null;
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

let networks = [];
let answer = 0;
let count = 0;
for (let conn of connections) {
    while (typeof networks[conn.coord1.network] === "number") {
        conn.coord1.network = networks[conn.coord1.network];
    }

    while (typeof networks[conn.coord2.network] === "number") {
        conn.coord2.network = networks[conn.coord2.network];
    }

    if (conn.coord1.network === null && conn.coord2.network === null) {
        let newIndex = networks.length;
        conn.coord1.network = newIndex;
        conn.coord2.network = newIndex;
        let newNetwork = new Set([conn.coord1, conn.coord2]);
        networks.push(newNetwork);
    } else if (conn.coord1.network === null) {
        networks[conn.coord2.network].add(conn.coord1);
        conn.coord1.network = conn.coord2.network;
    } else if (conn.coord2.network === null) {
        networks[conn.coord1.network].add(conn.coord2);
        conn.coord2.network = conn.coord1.network;
    } else if (conn.coord1.network !== conn.coord2.network) {
        let mergedIndex = Math.min(conn.coord1.network, conn.coord2.network);
        let mergingIndex = Math.max(conn.coord1.network, conn.coord2.network);
        networks[mergedIndex] = new Set([...networks[mergedIndex],...networks[mergingIndex]]);
        networks[mergingIndex] = mergedIndex;
        conn.coord1.network = mergedIndex;
        conn.coord2.network = mergedIndex;
    }

    if (networks[0].size === coords.length) {
        console.log(conn)
        answer = conn.coord1.x * conn.coord2.x;
        break;
    }
    count++;
}

console.log(answer);