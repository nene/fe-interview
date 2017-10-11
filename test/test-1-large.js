import {expect} from "chai";
import filterByBlacklist from "../filterByBlacklist"

const blacklist = [];
for (let i=0; i<500; i++) {
    blacklist.push("bl-"+i);
}

const SIZE = 10000;
const stacktrace = [];
for (let i=0; i<SIZE; i++) {
    stacktrace.push("method1", "method2", "method3", "method4", "method5");
    stacktrace.push(...blacklist);
}

describe("filterByBlacklist()", function() {
    it("handles large amount of data in reasonable time", function() {
        expect(filterByBlacklist(stacktrace, blacklist).length).to.equal(SIZE*5);
    });
});
