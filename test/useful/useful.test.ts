import {
	bombPosition,
	bombQuantity,
	booleanGridCreation,
} from '../../src/useful';
import { initializeGrid } from '../../src/const';

describe('Test on useful', () => {
	const size = 10;
	const percentage = 0.4;
	it('bombQuantity should return the correct number of bombs for a 10x10 grid with 40% bomb percentage', () => {
		const grid = initializeGrid();
		const result = bombQuantity(percentage, grid);
		expect(result).toBe(40);
	});
	it('should create a boolean grid of size 10x10 with all values set to false', () => {
		const grid = booleanGridCreation(size);
		expect(grid.length).toBe(size);
		expect(grid[0].length).toBe(size);
		expect(grid.every(row => row.every(value => value === false))).toBe(true);
	});
	it('should create a boolean grid of size 10x10 with 40 bombs activated', () => {
		const grid = bombPosition(
			bombQuantity(percentage, initializeGrid()),
			booleanGridCreation(size)
		);
		expect(grid.length).toBe(size);
		expect(grid[0].length).toBe(size);
		expect(grid.flat().filter(value => value).length).toBe(40);
	});
});
