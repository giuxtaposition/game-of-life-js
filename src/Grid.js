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

        for (
            let indexRow = rowPosition - 1;
            indexRow <= rowPosition + 1;
            indexRow++
        ) {
            if (indexRow < 0 || indexRow >= this.grid.length) {
                continue
            }

            for (
                let indexColumn = columnPosition - 1;
                indexColumn <= columnPosition + 1;
                indexColumn++
            ) {
                if (
                    indexColumn < 0 ||
                    indexColumn >= this.grid[indexRow].length
                ) {
                    continue
                }

                if (
                    indexRow === rowPosition &&
                    indexColumn === columnPosition
                ) {
                    continue
                }

                neighbours.push(this.grid[indexRow][indexColumn])
            }
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

                if (aliveNeighbours.length < 2 || aliveNeighbours.length > 3) {
                    this.grid[indexRow][indexColumn].die()
                }

                if (aliveNeighbours.length === 3) {
                    this.grid[indexRow][indexColumn].revive()
                }
            }
        }
    }
}

exports.aGrid = function aGrid(row, column) {
    return new Grid(row, column)
}
