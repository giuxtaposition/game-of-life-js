const Cell = require("./Cell")

class Grid {
    constructor(row, column) {
        this.buildGrid(row, column)
    }

    getAliveCells() {
        return this.grid.flat().filter(cell => cell.isAlive()).length
    }

    getDeadCells() {
        return this.grid.flat().filter(cell => !cell.isAlive()).length
    }

    getGridSize() {
        return this.grid.flat().length
    }

    buildGrid(row, column) {
        this.grid = []
        for (let indexRow = 0; indexRow < row; indexRow++) {
            this.grid[indexRow] = []
            for (let indexColumn = 0; indexColumn < column; indexColumn++) {
                this.grid[indexRow][indexColumn] = Cell.aCell()
            }
        }
    }
}

exports.aGrid = function aGrid(row, column) {
    return new Grid(row, column)
}
