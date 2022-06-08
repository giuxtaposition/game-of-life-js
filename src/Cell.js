class Cell {
    constructor(alive) {
        this.alive = alive !== undefined ? alive : Math.random() > 0.5
    }

    die() {
        this.alive = false
    }

    revive() {
        this.alive = true
    }

    isAlive() {
        return this.alive
    }
}

exports.aCell = function aCell(alive) {
    return new Cell(alive)
}
