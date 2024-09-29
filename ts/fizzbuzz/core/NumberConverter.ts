export interface ReplaceRuleInterface {
	replace: (input: number) => string;
}

export class NumberConverter {
	constructor(private rules: ReplaceRuleInterface[]) {}

	convert(input: number): string {
		const result = this.rules.find(rule => rule.replace(input));
		return result ? result.replace(input) : "";
	}
}
