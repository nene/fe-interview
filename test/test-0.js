import {expect} from "chai";
import sumEven from "../sumEven"

describe("sumEven()", function() {
    it("return 0 for empty array", function() {
        expect(sumEven([])).to.equal(0);
    });

    it("sums up even integers in array", function() {
        expect(sumEven([1,2,3,4,5])).to.equal(6);
    });

    it("sums up negative even numbers", function() {
        expect(sumEven([-5,-4,-3,-2,-1])).to.equal(-6);
    });

    it("returns 0 when only odd integers in array", function() {
        expect(sumEven([-1,3,9])).to.equal(0);
    });

    it("returns 0 when only non-integers in array", function() {
        expect(sumEven([2.1, 0.002, 10.6])).to.equal(0);
    });

    it("ignores arrays with additional member fields", function() {
        var array = [1,2,3,4,5];
        array.foo = 8;
        expect(sumEven(array)).to.equal(6);
    });
});
