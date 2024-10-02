import type { ReplaceRuleInterface } from "../NumberConverter";

class PassThroughRule implements ReplaceRuleInterface {
	replace(number: number): string {
		return number.toString();
	}
}

export { PassThroughRule };
