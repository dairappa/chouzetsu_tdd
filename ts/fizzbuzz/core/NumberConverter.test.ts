import { test, expect, spyOn } from "bun:test";
import { NumberConverter, type ReplaceRuleInterface } from "./NumberConverter";

class TestRule implements ReplaceRuleInterface {
	replace(number: number): string {
		return "";
	}
}

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

test("convert with multiple rules", () => {



	const fizzRule = new TestRule();
	spyOn(fizzRule, "replace").mockImplementation((i) => i === 1 ? "fizz" : "");
	
	const BuzzRule = new TestRule();
	spyOn(BuzzRule, "replace").mockImplementation((i) => i === 1 ? "buzz" : "");
	const fizzbuzz = new NumberConverter(
		[
			fizzRule,
			BuzzRule,
		]
	);

	expect(fizzbuzz.convert(1)).toBe("fizzbuzz");
	
});

test("fizz buzz rule", () => {
	const fizzRule = new TestRule();
	spyOn(fizzRule, "replace").mockImplementation((i) => i === 3 ? "fizz" : "");

	const buzzRule = new TestRule();
	spyOn(buzzRule, "replace").mockImplementation((i) => i === 5 ? "buzz" : "");

	const passThroughRule = new TestRule();
	spyOn(passThroughRule, "replace").mockImplementation((i) => i.toString());

	const fizzbuzz = new NumberConverter([fizzRule, buzzRule, passThroughRule]);

	expect(fizzbuzz.convert(3)).toBe("fizz");
	expect(fizzbuzz.convert(5)).toBe("buzz");
	expect(fizzbuzz.convert(15)).toBe("fizzbuzz");
	expect(fizzbuzz.convert(1)).toBe("1");
});
