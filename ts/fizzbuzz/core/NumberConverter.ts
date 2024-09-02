export interface ReplaceRuleInterface {
	replace: (input: number) => string;
}

export class NumberConverter {
	constructor(rules: ReplaceRuleInterface[]) {}

	convert(input: number): string {
		return "";
	}
}
