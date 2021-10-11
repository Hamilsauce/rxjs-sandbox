const { Observable,interval, of , timer, fromEvent, merge, empty, delay, from } = rxjs;
const { scan, takeWhile, tap, startWith, filter, map, mapTo } = rxjs.operators;

export const mockStore = {
	playerState: {
		holdingsPlayers: {
			players: [
				{
					playerId: '123',
					fullName: 'Sam Iam',
					currentPlayerPrice: 22,
					teamNameAbbrev: 'LS',
				},
			],
		},
	},
	profileState: {
		profile: {
			availableFunds: 69,
		},
	},
	userState: {
		user: {
			uid: 'mockUid',
		},
	},
};
