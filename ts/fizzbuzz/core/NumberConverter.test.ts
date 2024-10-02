import { test, expect, spyOn } from "bun:test";
import { NumberConverter, type ReplaceRuleInterface } from "./NumberConverter";
import { CyclicNumberRule } from "./rules/CyclicNumberRule";
import { PassThroughRule } from "./rules/PassThroughRule";

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
	const fizzbuzz = new NumberConverter(
		[
			new CyclicNumberRule(3, "Fizz"), 
			new CyclicNumberRule(5, "buzz"), 
			new PassThroughRule()
		]
	);

	expect(fizzbuzz.convert(3)).toBe("Fizz");
	expect(fizzbuzz.convert(5)).toBe("buzz");
	expect(fizzbuzz.convert(15)).toBe("fizzbuzz");
	expect(fizzbuzz.convert(1)).toBe("1");
});
