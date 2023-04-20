import { useReducer, useEffect } from 'react';
import { gameReducer } from '../reducer/gameReducer';
import { ActionGame, CellEnum } from '../enums';
import { type UseGame, type GameState } from '../interfaces';
import {
	FACE_LOST,
	FACE_WON,
	MESSAGE_LOST,
	MESSAGE_WON,
	TITLE_LOST,
	TITLE_WON,
	initialize,
	initializeGrid,
} from '../const';
import {
	bombQuantity,
	bombPosition,
	booleanGridCreation,
	cellSelection,
	calculateScore,
	allOfUsAreDead,
	flagFeature,
	getOpenCells,
	getIndexIterator,
} from '../useful';

let booleanGrid: boolean[][];
export const useGame = (): UseGame => {
	const [state, dispatch] = useReducer(gameReducer, initialize);

	const {
		bombsOnGrid,
		currentMineRate,
		currentGridSize,
		grid,
		mines,
		score,
		face,
		isOpen,
		message,
		title,
	}: GameState = state;

	useEffect(() => {
		onFaceClick();
	}, []);

	useEffect(() => {
		if (score >= 100) {
			endGame(true);
		}
	}, [score]);

	const onFaceClick = (): void => {
		booleanGrid = bombPosition(
			bombQuantity(currentMineRate, initializeGrid()),
			booleanGridCreation(currentGridSize)
		);
		dispatch({
			type: ActionGame.SET_START_GAME,
			payload: {
				grid: initializeGrid(),
				face: 'default',
				bombsOnGrid: bombQuantity(currentMineRate, initializeGrid()),
				mines: bombQuantity(currentMineRate, initializeGrid()),
				score: 0,
				isOpen: false,
			},
		});
	};

	const handleOnclick = (position: [number, number]): void => {
		const gridCopy = openCells(position);
		const openCell = getOpenCells(gridCopy);
		const currentScore = calculateScore(booleanGrid, openCell, bombsOnGrid);

		dispatch({
			type: ActionGame.SET_SCORE,
			payload: {
				score: currentScore,
				grid: gridCopy,
			},
		});
		if (booleanGrid[position[0]][position[1]]) {
			endGame(false);
		}
	};

	const openCells = (position: [number, number]): number[][] => {
		const gridCopy = [...grid];
		gridCopy[position[0]][position[1]] = cellSelection(
			position[0],
			position[1],
			booleanGrid
		);
		if (gridCopy[position[0]][position[1]] === 11) {
			return allOfUsAreDead(position[0], position[1], gridCopy, booleanGrid);
		}
		if (gridCopy[position[0]][position[1]] === 0) {
			const { rowInit, rowEnd, columnInit, columnEnd } = getIndexIterator(
				position[0],
				position[1],
				booleanGrid.length
			);
			for (let i = rowInit; i <= rowEnd; i++) {
				for (let j = columnInit; j <= columnEnd; j++) {
					if (gridCopy[i][j] < 0) {
						gridCopy[i][j] = cellSelection(i, j, booleanGrid);
						if (grid[i][j] === 0) {
							openCells([i, j]);
						}
					}
				}
			}
		}
		return gridCopy;
	};

	const handleOnMouseDown = (): void => {
		dispatch({ type: ActionGame.SET_FACE, payload: 'doubtful' });
	};

	const handleOnMouseUp = (): void => {
		dispatch({ type: ActionGame.SET_FACE, payload: 'default' });
	};

	const handleOnContextMenu = (position: [number, number]): void => {
		let counterBom = mines;
		const gridCopy = [...grid];

		if (gridCopy[position[0]][position[1]] === -1 && counterBom > 0) {
			gridCopy[position[0]][position[1]] = CellEnum.Flag;
			counterBom--;
		} else {
			if (gridCopy[position[0]][position[1]] === 9) {
				gridCopy[position[0]][position[1]] = CellEnum.Hidden;
				counterBom = counterBom >= 0 ? counterBom + 1 : 0;
			}
		}

		dispatch({
			type: ActionGame.SET_GRID,
			payload: {
				grid: gridCopy,
				mines: counterBom,
			},
		});
		const flagWinner = !!flagFeature(bombsOnGrid, booleanGrid, gridCopy);
		if (flagWinner) {
			endGame(true);
		}
	};

	const endGame = (status: boolean): void => {
		dispatch({
			type: ActionGame.SET_END_GAME,
			payload: {
				face: status ? FACE_WON : FACE_LOST,
				title: status ? TITLE_WON : TITLE_LOST,
				score,
				message: status ? MESSAGE_WON : MESSAGE_LOST,
				isOpen: true,
			},
		});
	};

	return {
		onFaceClick,
		handleOnclick,
		handleOnMouseDown,
		handleOnMouseUp,
		handleOnContextMenu,
		mines,
		score,
		face,
		grid,
		isOpen,
		message,
		title,
	};
};
