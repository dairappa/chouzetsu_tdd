export interface ReplaceRuleInterface {
	replace: (input: number) => string;
}

export class NumberConverter {
	constructor(private rules: ReplaceRuleInterface[]) {}

	convert(input: number): string {
		const result = this.rules.reduce((acc, rule) => {
			const replacement = rule.replace(input);
			return acc + replacement;
		}, "");
		return result;
	}
}
