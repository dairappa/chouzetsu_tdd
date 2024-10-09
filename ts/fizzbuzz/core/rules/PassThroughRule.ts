import type { ReplaceRuleInterface } from "../NumberConverter";

class PassThroughRule implements ReplaceRuleInterface {
	
	apply(carry: string, number: number): string {
		return number.toString();
	}

	match(carry: string, number: number): boolean {
		return carry === "";
	}
}

export { PassThroughRule };
