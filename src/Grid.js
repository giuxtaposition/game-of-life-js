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
