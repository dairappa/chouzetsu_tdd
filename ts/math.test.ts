import { expect, test } from "bun:test";
import { MyMath } from "./math";

test("min test", () => {
	const math = new MyMath();

	expect(math.min(0, 1)).toBe(0);
	expect(math.min(1, 0)).toBe(0);
	expect(math.min(0, -1)).toBe(-1);
	expect(math.min(-1, 0)).toBe(-1);
	expect(math.min(0, 0)).toBe(0);
	expect(math.min(0, Number.MAX_SAFE_INTEGER)).toBe(0);
	expect(math.min(Number.MIN_SAFE_INTEGER, 0)).toBe(Number.MIN_SAFE_INTEGER);
});

test("max test", () => {
	const math = new MyMath();

	expect(math.max(0, 1)).toBe(1);
	expect(math.max(1, 0)).toBe(1);
	expect(math.max(0, -1)).toBe(0);
	expect(math.max(-1, 0)).toBe(0);
	expect(math.max(0, 0)).toBe(0);
	expect(math.max(0, Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
	expect(math.max(Number.MIN_SAFE_INTEGER, 0)).toBe(0);
});
