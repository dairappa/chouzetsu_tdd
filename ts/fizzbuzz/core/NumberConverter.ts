export interface ReplaceRuleInterface {
	apply: (carry: string, input: number) => string;
	match: (carry: string, input: number) => boolean;
}

export class NumberConverter {
	constructor(private rules: ReplaceRuleInterface[]) {}

	convert(input: number): string {
		const result = this.rules.reduce((acc, rule) => {
			const replacement = rule.match(acc, input) ? rule.apply(acc, input) : "";
			return replacement;
		}, "");
		return result;
	}
}
