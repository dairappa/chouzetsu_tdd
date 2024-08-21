import { expect, test } from "bun:test";
import { MyMath } from "./math";

test("min max test", () => {
	const math = new MyMath();

	const minExpected = 1;
	const minResult = math.min(1, 2);
	expect(minResult).toBe(minExpected);

	const maxExpected = 2;
	const maxResult = math.max(1, 2);
	expect(maxResult).toBe(maxExpected);
});
