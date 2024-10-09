import { test, expect } from "bun:test";
import { PassThroughRule } from "./PassThroughRule";

test("apply", () => {
	const rule = new PassThroughRule();
	expect(rule.apply("", 1)).toBe("1");
    expect(rule.apply("", 2)).toBe("2");
    expect(rule.apply("Fizz", 3)).toBe("3");
});

test("match", () => {
	const rule = new PassThroughRule();
	expect(rule.match("", 1)).toBe(true);
    expect(rule.match("Fizz", 1)).toBe(false);
});
