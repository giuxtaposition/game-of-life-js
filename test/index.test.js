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
            const cell = Cell.aCell()

            ok([true, false].includes(cell.isAlive()))
        })
    })

    describe("grid", () => {
        it("has set size", () => {
            const grid = Grid.aGrid(3, 3)

            equal(grid.getGridSize(), 9)
        })

        it("is made of cells", () => {
            const grid = Grid.aGrid(1, 1)
            expectedGrid = [[Cell.aCell(true)]]

            grid.grid[0][0].revive()

            deepEqual(grid.grid, expectedGrid)
        })

        it("cells alive status is randomly generated", () => {
            const grid = Grid.aGrid(2, 2)

            notEqual(grid.getAliveCells(), 4)
            notEqual(grid.getDeadCells(), 4)
        })

        it("can get neighbours of a cell", () => {
            const grid = Grid.aGrid(3, 3)

            deepEqual(grid.getNeighbours(0, 0), [
                grid.grid[0][1],
                grid.grid[1][0],
            ])
        })

        it("Any live cell with fewer than two live neighbours dies", () => {
            const grid = Grid.aGrid(2, 2)

            grid.grid[0][0].die()
            grid.grid[0][1].die()
            grid.grid[1][0].revive()
            grid.grid[1][1].revive()

            grid.nextGeneration()

            equal(grid.grid[1][1].isAlive(), false)
        })

        it("Any live cell with more than three live neighbours dies", () => {
            const grid = Grid.aGrid(3, 3)

            grid.grid[0][0].revive()
            grid.grid[0][1].revive()
            grid.grid[1][0].revive()
            grid.grid[1][2].revive()
            grid.grid[1][1].revive()

            grid.nextGeneration()

            equal(grid.grid[1][1].isAlive(), false)
        })
    })
})
