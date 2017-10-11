import assert from "assert";
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
        assert.equal(filterByBlacklist(stacktrace, blacklist), [
            "com.mongodb.OutMsg.add",
            "com.mongodb.OutMsg.remove",
            "com.mydomain.MyClass.foo",
        ]);
    });
});
