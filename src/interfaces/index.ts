import { type CellEnum } from '../enums';

export type FaceType = 'default' | 'doubtful' | 'lost' | 'won';

export interface GameState {
	grid: CellEnum[][];
	face: FaceType;
	score: number;
	mines: number;
	booleanGrid: boolean[][];
	bombsOnGrid: number;
	currentMineRate: number;
	currentGridSize: number;
	lostStatus: boolean;
	isOpen: boolean;
	message: string;
	title: string;
}

export interface ICell {
	position: [number, number];
	cell: CellEnum;
	handleClickLeft: (position: [number, number]) => void;
	handleClickRight: (position: [number, number]) => void;
	handleOnMouseDown: () => void;
}

export interface Action {
	type: string;
	payload: any;
}

export interface AlertModalProps {
	title: string;
	message: string;
	onDismiss: () => void;
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
