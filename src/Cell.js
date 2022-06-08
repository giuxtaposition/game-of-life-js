class Cell {
    constructor(alive) {
        this.alive = alive
    }

    isAlive() {
        return this.alive
    }
}

exports.aCell = function aCell(alive) {
    return new Cell(alive)
}
