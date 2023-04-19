import { type CellEnum } from '../enums';

export const bombQuantity = (
	percentage: number,
	currentGrid: CellEnum[][]
): number => Math.ceil(currentGrid.length * currentGrid.length * percentage);

export const booleanGridCreation = (size: number): boolean[][] => {
	const currentBooleanGrid = new Array(size);
	for (let i = 0; i < currentBooleanGrid.length; i++) {
		currentBooleanGrid[i] = new Array(size);
	}
	for (let i = 0; i < currentBooleanGrid.length; i++) {
		for (let j = 0; j < currentBooleanGrid.length; j++) {
			currentBooleanGrid[i][j] = false;
		}
	}
	return currentBooleanGrid;
};

export const bombPosition = (
	bombQ: number,
	currentBooleanGrid: boolean[][]
): boolean[][] => {
	let numerator = bombQ;
	let denominator = currentBooleanGrid.length * currentBooleanGrid.length;
	let bombActivation = false;
	for (let i = 0; i < currentBooleanGrid.length; i++) {
		for (let j = 0; j < currentBooleanGrid.length; j++) {
			bombActivation = !!(
				Math.random() <= numerator / denominator && numerator > 0
			);
			if (bombActivation) {
				numerator -= 1;
				denominator -= 1;
				currentBooleanGrid[i][j] = true;
			} else {
				denominator -= 1;
			}
			bombActivation = false;
		}
	}
	return currentBooleanGrid;
};

export const initialIterator = (index: number): number =>
	index > 0 ? index - 1 : 0;

export const lastIterator = (index: number, maxLength: number): number =>
	index === maxLength - 1 ? index : index + 1;

export const cellSelection = (
	rowPosition: number,
	columnPosition: number,
	currentBooleanGrid: boolean[][]
): number => {
	let cellImage: number = -10;
	if (currentBooleanGrid[rowPosition][columnPosition]) {
		cellImage = 11;
	} else {
		const rowInitiator = initialIterator(rowPosition);
		const rowStopper = lastIterator(rowPosition, currentBooleanGrid.length);
		const columnInitiator = initialIterator(columnPosition);
		const columnStopper = lastIterator(
			columnPosition,
			currentBooleanGrid.length
		);
		let bombCounter = 0;
		for (let i = rowInitiator; i <= rowStopper; i++) {
			for (let j = columnInitiator; j <= columnStopper; j++) {
				if (
					currentBooleanGrid[i][j] &&
					i < currentBooleanGrid.length &&
					j < currentBooleanGrid.length
				) {
					bombCounter += 1;
				}
			}
		}
		cellImage = bombCounter;
	}
	return cellImage;
};

export const getOpenCells = (grid: CellEnum[][]): number => {
	let openCells = 0;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] >= 0 && grid[i][j] !== 9) {
				openCells = openCells + 1;
			}
		}
	}
	return openCells;
};

export const calculateScore = (
	currentBooleanGrid: boolean[][],
	counter: number,
	bombQ: number
): number =>
	Math.ceil(
		(100 / (currentBooleanGrid.length * currentBooleanGrid.length - bombQ)) *
			counter
	);

export const allOfUsAreDead = (
	rowPosition: number,
	columnPosition: number,
	currentGrid: CellEnum[][],
	currentBooleanGrid: boolean[][]
): CellEnum[][] => {
	for (let i = 0; i < currentGrid.length; i++) {
		for (let j = 0; j < currentGrid.length; j++) {
			if (i !== rowPosition || j !== columnPosition) {
				if (currentBooleanGrid[i][j]) {
					currentGrid[i][j] = 10;
				}
			}
		}
	}
	return currentGrid;
};

export const flagFeature = (
	bombQ: number,
	currentBooleanGrid: boolean[][],
	currentGrid: CellEnum[][]
): boolean => {
	let counter: number = 0;
	let totalFlags: number = 0;
	for (let i = 0; i < currentGrid.length; i++) {
		for (let j = 0; j < currentGrid.length; j++) {
			if (currentBooleanGrid[i][j] && currentGrid[i][j] === 9) {
				counter += 1;
			}
			if (currentGrid[i][j] === 9) {
				totalFlags += 1;
			}
		}
	}
	return !!(counter === bombQ && totalFlags === counter);
};
