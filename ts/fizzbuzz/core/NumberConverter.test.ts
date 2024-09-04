import { test, expect, spyOn } from "bun:test";
import { NumberConverter, type ReplaceRuleInterface } from "./NumberConverter";

test("empty rule", () => {
	const fizzbuzz = new NumberConverter([]);
	expect(fizzbuzz.convert(1)).toBe("");
});

test("single rule", () => {
	class TestRule implements ReplaceRuleInterface {
		replace(number: number): string {
			return "";
		}
	}

	const rule = new TestRule();
	spyOn(rule, "replace").mockImplementation((i) => "replaced");
	const fizzbuzz = new NumberConverter([rule]);
	expect(fizzbuzz.convert(1)).toBe("replaced");
});
