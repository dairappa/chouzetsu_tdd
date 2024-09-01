export class NumberConverter {
	convert(input: number): string {
		const isDivisibleBy3 = input % 3 === 0;
		const isDivisibleBy5 = input % 5 === 0;

		if (isDivisibleBy3 && isDivisibleBy5) {
			return "FizzBuzz";
		}
		if (isDivisibleBy3) {
			return "Fizz";
		}
		if (isDivisibleBy5) {
			return "Buzz";
		}

		return input.toString();
	}
}
