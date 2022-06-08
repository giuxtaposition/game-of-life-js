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

    getNeighbours(rowPosition, columnPosition) {
        let neighbours = []

        if (columnPosition > 0) {
            neighbours.push(this.grid[rowPosition][columnPosition - 1])
        }

        if (columnPosition < this.grid[rowPosition].length - 1) {
            neighbours.push(this.grid[rowPosition][columnPosition + 1])
        }

        if (rowPosition > 0) {
            neighbours.push(this.grid[rowPosition - 1][columnPosition])
        }

        if (rowPosition < this.grid.length - 1) {
            neighbours.push(this.grid[rowPosition + 1][columnPosition])
        }

        return neighbours
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

    nextGeneration() {
        for (let indexRow = 0; indexRow < this.grid.length; indexRow++) {
            for (
                let indexColumn = 0;
                indexColumn < this.grid[indexRow].length;
                indexColumn++
            ) {
                const neighbours = this.getNeighbours(indexRow, indexColumn)
                const aliveNeighbours = neighbours.filter(cell =>
                    cell.isAlive()
                )

                if (aliveNeighbours.length < 2) {
                    this.grid[indexRow][indexColumn].die()
                }
            }
        }
    }
}

exports.aGrid = function aGrid(row, column) {
    return new Grid(row, column)
}
