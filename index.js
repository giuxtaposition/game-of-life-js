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

class Grid {
    constructor(row, column) {
        this.size = row * column
    }

    getGridSize() {
        return this.size
    }
}

exports.aGrid = function aGrid(row, column) {
    return new Grid(row, column)
}
