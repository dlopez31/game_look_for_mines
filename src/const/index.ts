import { CellEnum, FacesEnum } from '../enums';
import { type GameState } from '../interfaces';

const size = 10;

export const initializeGrid = (): CellEnum[][] => {
	return Array.from({ length: size }, (_, i) => {
		return Array.from({ length: size }, (_, j) => {
			return CellEnum.Hidden;
		});
	});
};

export const initialize: GameState = {
	grid: initializeGrid(),
	face: FacesEnum.DEFAULT,
	score: 0,
	mines: 0,
	bombsOnGrid: 0,
	currentMineRate: 0.2,
	currentGridSize: size,
	isOpen: false,
	message: '',
	title: '',
};

export const MESSAGE_LOST = 'You lost try again';
export const MESSAGE_WON = 'Congratulations you have won';
export const TITLE_LOST = 'YOU LOST';
export const TITLE_WON = 'YOU WIN';
