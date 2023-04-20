export enum CellEnum {
	Hidden = -1,
	Cero = 0,
	One = 1,
	Two = 2,
	Three = 3,
	Four = 4,
	Five = 5,
	Six = 6,
	Seven = 7,
	Eight = 8,
	Flag = 9,
	Mine = 10,
	ClickedMine = 11,
}

export enum ActionGame {
	SET_GRID = 'grid',
	SET_SCORE = 'score',
	SET_FACE = 'face',
	SET_START_GAME = 'startGame',
	SET_GAME_OVER = 'gameOver',
	SET_END_GAME = 'endGame',
}

export enum FacesEnum {
	DEFAULT = 'default',
	DOUBTFUL = 'doubtful',
	LOST = 'lost',
	WON = 'won',
}
