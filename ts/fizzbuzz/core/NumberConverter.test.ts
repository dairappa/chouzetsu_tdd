import { test, expect, spyOn } from "bun:test";
import { NumberConverter, type ReplaceRuleInterface } from "./NumberConverter";
import { CyclicNumberRule } from "./rules/CyclicNumberRule";
import { PassThroughRule } from "./rules/PassThroughRule";



function createMockRule(expectedNumber: number, expectedCarry: string, matchResult: boolean, replacement: string): ReplaceRuleInterface {
	class TestRule implements ReplaceRuleInterface {
		apply(_carry: string, _number: number): string {
			return "";
		}
		match(_carry: string, _number: number): boolean {
			return false;
		}
	}
	
	const rule = new TestRule();
	spyOn(rule, "apply").mockImplementation((carry, number) => {
		if (number === expectedNumber && carry === expectedCarry) {
			return replacement;
		}
		return "";
	});
	spyOn(rule, "match").mockImplementation((carry, number) => {
		if (number === expectedNumber && carry === expectedCarry) {
			return matchResult;
		}
		return false;
	});
	return rule;
}

test("empty rule", () => {
	const fizzbuzz = new NumberConverter([]);
	expect(fizzbuzz.convert(1)).toBe("");
});

test("single rule", () => {

	const rule = createMockRule(1, "", true, "Replaced");
	const fizzbuzz = new NumberConverter([rule]);
	expect(fizzbuzz.convert(1)).toBe("Replaced");
});

test("convert with multiple rules", () => {
	const fizzbuzz = new NumberConverter(
		[
			(createMockRule(1, "", true, "Fizz")),
			(createMockRule(1, "Fizz", true, "FizzBuzz")),
		]
	);

	expect(fizzbuzz.convert(1)).toBe("FizzBuzz");
	
});

test("convert with skip rule", () => {
	
	const fizzbuzz = new NumberConverter(
		[
			(createMockRule(1, "", false, "Fizz")),
			(createMockRule(1, "", false, "Buzz")),
			(createMockRule(1, "", true, "1")),
		]
	);

	expect(fizzbuzz.convert(1)).toBe("1");
});

test("convert with skip rule2", () => {
	
	const fizzbuzz = new NumberConverter(
		[
			(createMockRule(1, "", true, "Fizz")),
			(createMockRule(1, "", false, "Buzz")),
		]
	);

	expect(fizzbuzz.convert(1)).toBe("Fizz");
});

test("fizz buzz", () => {
	const fizzbuzz = new NumberConverter([
		new CyclicNumberRule(3, "Fizz"),
		new CyclicNumberRule(5, "Buzz"),
		new PassThroughRule(),
	]);
	expect(fizzbuzz.convert(1)).toBe("1");
	expect(fizzbuzz.convert(2)).toBe("2");
	expect(fizzbuzz.convert(3)).toBe("Fizz");
	expect(fizzbuzz.convert(4)).toBe("4");
	expect(fizzbuzz.convert(5)).toBe("Buzz");
	expect(fizzbuzz.convert(6)).toBe("Fizz");
	expect(fizzbuzz.convert(7)).toBe("7");
	expect(fizzbuzz.convert(8)).toBe("8");
	expect(fizzbuzz.convert(9)).toBe("Fizz");
	expect(fizzbuzz.convert(10)).toBe("Buzz");
	expect(fizzbuzz.convert(11)).toBe("11");
	expect(fizzbuzz.convert(12)).toBe("Fizz");
	expect(fizzbuzz.convert(13)).toBe("13");
	expect(fizzbuzz.convert(14)).toBe("14");
	expect(fizzbuzz.convert(15)).toBe("FizzBuzz");
});
