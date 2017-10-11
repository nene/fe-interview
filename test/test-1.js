import {expect} from "chai";
import filterByBlacklist from "../filterByBlacklist"

describe("filterByBlacklist()", function() {
    it("works with basic test data", function() {
        const stacktrace = [
            "java.lang.Object.toString",
            "com.mongodb.OutMsg.add",
            "com.mongodb.OutMsg.remove",
            "java.lang.NullpointerException",
            "com.mydomain.MyClass.foo",
        ];
        const blacklist = [
            "java.lang.Object.toString",
            "java.lang.NullpointerException",
        ];
        expect(filterByBlacklist(stacktrace, blacklist)).to.deep.equal([
            "com.mongodb.OutMsg.add",
            "com.mongodb.OutMsg.remove",
            "com.mydomain.MyClass.foo",
        ]);
    });

    it("returns empty array when empty stacktrace given", function() {
        const stacktrace = [];
        const blacklist = ["foo", "bar"];
        expect(filterByBlacklist(stacktrace, blacklist)).to.deep.equal([]);
    });

    it("returns stacktrace unchanged when blacklist is empty", function() {
        const stacktrace = ["foo", "bar", "baz"];
        const blacklist = [];
        expect(filterByBlacklist(stacktrace, blacklist)).to.deep.equal(["foo", "bar", "baz"]);
    });

    it("returns empty array when everything in stacktrace has a match in blacklist", function() {
        const stacktrace = ["foo", "bar", "baz"];
        const blacklist = ["bar", "baz", "foo"];
        expect(filterByBlacklist(stacktrace, blacklist)).to.deep.equal([]);
    });
});
