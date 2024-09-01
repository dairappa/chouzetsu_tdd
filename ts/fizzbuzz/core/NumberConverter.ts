export class NumberConverter {
	convert(input: number): string {
		if (input % 3 === 0) {
			return "Fizz";
		}
		return input.toString();
	}
}
