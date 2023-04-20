import { type CellEnum } from '../enums';

export type FaceType = 'default' | 'doubtful' | 'lost' | 'won';

export interface GameState {
	grid: CellEnum[][];
	face: FaceType;
	score: number;
	mines: number;
	bombsOnGrid: number;
	currentMineRate: number;
	currentGridSize: number;
	isOpen: boolean;
	message: string;
	title: string;
}

export interface ICell {
	position: [number, number];
	cell: CellEnum;
}

export interface Action {
	type: string;
	payload: any;
}
export interface UseGame {
	onFaceClick: () => void;
	handleOnclick: (position: [number, number]) => void;
	handleOnMouseDown: () => void;
	handleOnMouseUp: () => void;
	handleOnContextMenu: (position: [number, number]) => void;
	mines: number;
	score: number;
	face: string;
	grid: CellEnum[][];
	isOpen: boolean;
	message: string;
	title: string;
}

export interface Positions {
	rowInit: number;
	rowEnd: number;
	columnInit: number;
	columnEnd: number;
}

export interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}
