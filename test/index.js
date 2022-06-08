const { ok } = require("assert")
const Cell = require("../index")

describe("game of life", () => {
    describe("cell", () => {
        it("can exist", () => {
            ok(Cell.aCell())
        })
    })
})
