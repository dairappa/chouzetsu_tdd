import { test, expect } from "bun:test";
import { CyclicNumberRule } from "./CyclicNumberRule";

test("apply", () => {
	const rule = new CyclicNumberRule(3, "Buzz");
	expect(rule.apply("", 3)).toBe("Buzz");
    expect(rule.apply("Fizz", 3)).toBe("FizzBuzz");
});

test("match", () => {
	const rule = new CyclicNumberRule(3, "Fizz");
	expect(rule.match("", 1)).toBe(false);
    expect(rule.match("", 3)).toBe(true);
    expect(rule.match("", 6)).toBe(true);
});
