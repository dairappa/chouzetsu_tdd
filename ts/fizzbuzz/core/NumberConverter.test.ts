import { test, expect } from "bun:test";
import { NumberConverter } from "./NumberConverter";

test("test", () => {
	const fizzbuzz = new NumberConverter();
	expect(fizzbuzz.convert(1)).toBe("1");
	expect(fizzbuzz.convert(2)).toBe("2");
	expect(fizzbuzz.convert(3)).toBe("Fizz");
});
