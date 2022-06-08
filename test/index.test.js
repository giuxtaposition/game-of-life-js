const { equal, deepEqual } = require("assert")
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
    })

    describe("grid", () => {
        it("has set size", () => {
            const grid = Grid.aGrid(3, 3)

            equal(grid.getGridSize(), 9)
        })

        it("is made of cells", () => {
            const grid = Grid.aGrid(1, 1)
            expectedGrid = [[Cell.aCell(false)]]

            deepEqual(grid.grid, expectedGrid)
        })
    })
})
