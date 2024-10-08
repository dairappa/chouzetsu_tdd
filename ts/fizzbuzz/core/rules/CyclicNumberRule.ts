import type { ReplaceRuleInterface } from "../NumberConverter";

class CyclicNumberRule implements ReplaceRuleInterface {
	constructor(private readonly base: number, private readonly word: string) { }
	apply(carry: string, _number: number): string {
		return carry + this.word;
	}

	match(_carry: string, number: number): boolean {
		return number % this.base === 0;
	}
}

export { CyclicNumberRule };