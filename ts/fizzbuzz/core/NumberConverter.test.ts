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



	const fizzRule = createMockRule(1, "", true, "Fizz");
		
	const BuzzRule = createMockRule(1, "Fizz", true, "FizzBuzz");
	
	const fizzbuzz = new NumberConverter(
		[
			fizzRule,
			BuzzRule,
		]
	);

	expect(fizzbuzz.convert(1)).toBe("FizzBuzz");
	
});

