import {expect} from "chai";
import filterByBlacklist from "../filterByBlacklist"

describe("filterByBlacklist()", function() {
    it("works with basic test data", function() {
        const trace = {
            name: "com.MyClass.init",
            children: [
                {
                    name: "java.lang.Object.toString",
                    children: [
                        {
                            name: "java.lang.NullpointerException",
                            children: [
                                {
                                    name: "com.MyClass.foo",
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "com.mongodb.OutMsg.remove",
                    children: [],
                },
            ],
        };
        const blacklist = [
            "java.lang.Object.toString",
            "java.lang.NullpointerException",
        ];
        expect(filterByBlacklist(trace, blacklist)).to.deep.equal({
            name: "com.MyClass.init",
            children: [
                {
                    name: "com.MyClass.foo",
                    children: [],
                },
                {
                    name: "com.mongodb.OutMsg.remove",
                    children: [],
                },
            ],
        });
    });

    it("removes all children when all of them are blacklisted", function() {
        const trace = {
            name: "com.MyClass.init",
            children: [
                {
                    name: "foo",
                    children: [
                        {
                            name: "foo",
                            children: [
                                {
                                    name: "foo",
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const blacklist = ["foo"];
        expect(filterByBlacklist(trace, blacklist)).to.deep.equal({
            name: "com.MyClass.init",
            children: [],
        });
    });

    it("changes nothing when nothing is blacklisted", function() {
        const trace = {
            name: "foo",
            children: [
                {
                    name: "bar",
                    children: [],
                },
            ],
        };
        const blacklist = [];
        expect(filterByBlacklist(trace, blacklist)).to.deep.equal({
            name: "foo",
            children: [
                {
                    name: "bar",
                    children: [],
                },
            ],
        });
    });

    it("always preserves the root trace, even when it's blacklisted", function() {
        const trace = {
            name: "foo",
            children: [
                {
                    name: "foo",
                    children: [],
                },
            ],
        };
        const blacklist = ["foo"];
        expect(filterByBlacklist(trace, blacklist)).to.deep.equal({
            name: "foo",
            children: [],
        });
    });
});
