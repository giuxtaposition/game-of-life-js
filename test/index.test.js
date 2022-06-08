const { equal, deepEqual, notEqual, ok } = require("assert")
const Cell = require("../src/Cell")
const Grid = require("../src/Grid")

describe("game of life", () => {
    describe("cell", () => {
        it("can be alive", () => {
            const cell = Cell.aCell(true)

            equal(cell.isAlive(), true)
        })

        it("can be dead", () => {
            const cell = Cell.aCell(false)

            equal(cell.isAlive(), false)
        })

        it("can die", () => {
            const cell = Cell.aCell(true)
            cell.die()

            equal(cell.isAlive(), false)
        })

        it("can return to life", () => {
            const cell = Cell.aCell(false)
            cell.revive()

            equal(cell.isAlive(), true)
        })

        it("if alive status is not passed, it is randomly decided", () => {
            const cell1 = Cell.aCell().isAlive()
            const cell2 = Cell.aCell().isAlive()
            const cell3 = Cell.aCell().isAlive()

            ok(
                [cell1, cell2, cell3].includes(true) ||
                    [cell1, cell2, cell3].includes(false)
            )
        })

        it("print cell status", () => {
            const aliveCell = Cell.aCell(true)
            equal(aliveCell.print(), "♥")

            const deadCell = Cell.aCell(false)
            equal(deadCell.print(), "✚")
        })
    })

    describe("grid", () => {
        it("has set size", () => {
            const grid = Grid.aGrid(3, 3)

            equal(grid.grid.flat().length, 9)
        })

        it("is made of cells", () => {
            const grid = Grid.aGrid(1, 1)
            expectedGrid = [[Cell.aCell(true)]]

            grid.grid[0][0].revive()

            deepEqual(grid.grid, expectedGrid)
        })

        it("print grid", () => {
            const grid = Grid.aGrid(2, 2)
            grid.grid[0][0].revive()
            grid.grid[0][1].revive()
            grid.grid[1][0].die()
            grid.grid[1][1].die()

            equal(grid.print(), `[♥][♥]\n[✚][✚]`)
        })

        it("cells are randomly generated", () => {
            const grid1 = Grid.aGrid(2, 2)
            const grid2 = Grid.aGrid(2, 2)
            const grid3 = Grid.aGrid(2, 2)

            ok(grid1 !== grid2 || grid2 !== grid3 || grid3 !== grid1)
        })

        it("can get neighbours of a cell", () => {
            const grid = Grid.aGrid(3, 3)

            deepEqual(grid.getNeighbours(1, 0), [
                grid.grid[0][0],
                grid.grid[0][1],
                grid.grid[1][1],
                grid.grid[2][0],
                grid.grid[2][1],
            ])
        })

        it("Any live cell with fewer than two live neighbours dies", () => {
            const grid = Grid.aGrid(2, 2)

            grid.grid[0][0].die()
            grid.grid[0][1].die()
            grid.grid[1][1].revive()

            grid.nextGeneration()

            equal(grid.grid[1][1].isAlive(), false)
        })

        it("Any live cell with more than three live neighbours dies", () => {
            const grid = Grid.aGrid(3, 3)

            grid.grid[0][0].revive()
            grid.grid[0][1].revive()
            grid.grid[1][0].revive()
            grid.grid[1][1].revive()
            grid.grid[2][0].revive()
            grid.grid[2][1].revive()

            grid.nextGeneration()

            equal(grid.grid[1][0].isAlive(), false)
        })

        it("Any live cell with two or three live neighbours lives, unchanged, to the next generation", () => {
            const grid = Grid.aGrid(3, 3)
            grid.grid[0][1].die()
            grid.grid[0][2].revive()
            grid.grid[1][0].revive()
            grid.grid[1][1].revive()
            grid.grid[2][0].die()
            grid.grid[2][1].revive()

            grid.nextGeneration()

            equal(grid.grid[1][0].isAlive(), true)
        })

        it("Any dead cell with exactly three live neighbours becomes a live cell", () => {
            const grid = Grid.aGrid(3, 3)
            grid.grid[0][0].die()
            grid.grid[0][1].revive()
            grid.grid[1][0].revive()
            grid.grid[1][1].revive()

            grid.nextGeneration()

            equal(grid.grid[0][0].isAlive(), true)
        })
    })
})
