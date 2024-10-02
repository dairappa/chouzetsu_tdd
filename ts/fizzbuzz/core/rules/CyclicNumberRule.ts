import type { ReplaceRuleInterface } from "../NumberConverter";

class CyclicNumberRule implements ReplaceRuleInterface {
	constructor(private readonly number: number, private readonly word: string) { }
	replace(number: number): string {
		return number % this.number === 0 ? this.word : "";
	}
}

export { CyclicNumberRule };