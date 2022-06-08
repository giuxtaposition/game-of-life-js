const { equal, ok } = require("assert")
const Cell = require("../index")
const Grid = require("../index")

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
    })

    describe("grid", () => {
        it("exists", () => {
            ok(Grid.aGrid())
        })
    })
})
