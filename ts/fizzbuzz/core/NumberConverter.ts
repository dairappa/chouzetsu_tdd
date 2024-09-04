export interface ReplaceRuleInterface {
	replace: (input: number) => string;
}

export class NumberConverter {
	constructor(private rules: ReplaceRuleInterface[]) {}

	convert(input: number): string {
		for (const rule of this.rules) {
			if (rule.replace(input)) {
				return rule.replace(input);
			}
		}

		return "";
	}
}
