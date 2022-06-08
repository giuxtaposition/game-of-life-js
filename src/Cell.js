class Cell {
    ALIVE_SYMBOL = "♥"
    DEAD_SYMBOL = "✚"

    constructor(alive) {
        this.alive = alive !== undefined ? alive : Math.random() > 0.5
    }

    die() {
        this.alive = false
    }

    revive() {
        this.alive = true
    }

    print() {
        return this.alive ? this.ALIVE_SYMBOL : this.DEAD_SYMBOL
    }

    isAlive() {
        return this.alive
    }
}

exports.aCell = function aCell(alive) {
    return new Cell(alive)
}
