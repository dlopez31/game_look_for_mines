import { ActionGame } from '../enums';
import { type Action, type GameState } from '../interfaces';

export const gameReducer = (state: GameState, action: Action): GameState => {
	const { type, payload } = action;
	switch (type) {
		case ActionGame.SET_FACE:
			return {
				...state,
				face: payload,
			};
		case ActionGame.SET_GRID:
			return {
				...state,
				grid: payload.grid,
				mines: payload.mines,
			};
		case ActionGame.SET_SCORE:
			return {
				...state,
				score: payload.score,
				grid: payload.grid,
			};
		case ActionGame.SET_START_GAME:
			return {
				...state,
				grid: payload.grid,
				face: payload.face,
				bombsOnGrid: payload.bombsOnGrid,
				mines: payload.mines,
				score: payload.score,
				isOpen: payload.isOpen,
			};
		case ActionGame.SET_GAME_OVER:
			return {
				...state,
				grid: payload.grid,
			};
		case ActionGame.SET_END_GAME:
			return {
				...state,
				face: payload.face,
				score: payload.score,
				isOpen: payload.isOpen,
				title: payload.title,
				message: payload.message,
			};
		default:
			return state;
	}
};
