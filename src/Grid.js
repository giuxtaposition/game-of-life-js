const Cell = require("./Cell")

class Grid {
    constructor(row, column) {
        this.init(row, column)
    }

    getAliveCells() {
        return this.grid.flat().filter(cell => cell.isAlive()).length
    }

    getNeighbours(rowPosition, columnPosition) {
        let neighbours = []

        for (
            let indexRow = rowPosition - 1;
            indexRow <= rowPosition + 1;
            indexRow++
        ) {
            if (rowIsOutsideGrid(indexRow, this.grid)) {
                continue
            }

            for (
                let indexColumn = columnPosition - 1;
                indexColumn <= columnPosition + 1;
                indexColumn++
            ) {
                if (
                    columnIsOutsideGrid(indexColumn, indexRow, this.grid) ||
                    isSelectedCell(indexRow, indexColumn)
                ) {
                    continue
                }

                neighbours.push(this.grid[indexRow][indexColumn])
            }
        }

        return neighbours

        function columnIsOutsideGrid(indexColumn, indexRow, grid) {
            return indexColumn < 0 || indexColumn >= grid[indexRow].length
        }

        function rowIsOutsideGrid(indexRow, grid) {
            return indexRow < 0 || indexRow >= grid.length
        }

        function isSelectedCell(indexRow, indexColumn) {
            return indexRow === rowPosition && indexColumn === columnPosition
        }
    }

    getAliveNeighbours(row, column) {
        return this.getNeighbours(row, column).filter(cell => cell.isAlive())
    }

    init(row, column) {
        this.grid = []
        for (let indexRow = 0; indexRow < row; indexRow++) {
            this.grid[indexRow] = []
            for (let indexColumn = 0; indexColumn < column; indexColumn++) {
                this.grid[indexRow][indexColumn] = Cell.aCell()
            }
        }
    }

    print() {
        return this.grid
            .map(row => row.map(cell => "[" + cell.print() + "]").join(""))
            .join("\n")
    }

    nextGeneration() {
        for (let indexRow = 0; indexRow < this.grid.length; indexRow++) {
            for (
                let indexColumn = 0;
                indexColumn < this.grid[indexRow].length;
                indexColumn++
            ) {
                const aliveNeighbours = this.getAliveNeighbours(
                    indexRow,
                    indexColumn
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
