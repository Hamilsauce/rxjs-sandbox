const { Observable,interval, of , timer, fromEvent, merge, empty, delay, from } = rxjs;
const { scan, takeWhile, tap, startWith, filter, map, mapTo } = rxjs.operators;


export const fireStore = {
	doc: () => ({
		//@ts-ignore
		collection: (collectionName) => {
			if (collectionName === 'orders') {
				return {
					valueChanges: () =>
						of([
							{
								fullName: 'order title 1',
								orderType: 'BID',
								orderId: '123',
								limitPrice: 10,
								shares: 5,
								playerId: 'player-id1',
								__modifiedTimestamp: {
									toDate: () => '01/01/2021',
									seconds: 1,
								},
							},
							{
								fullName: 'order title 2',
								orderType: 'ASK',
								orderId: '456',
								limitPrice: 400,
								shares: 1,
								playerId: 'player-id2',
								__modifiedTimestamp: {
									toDate: () => '01/01/2020',
									seconds: 2,
								},
							},
						]),
				};
			}
			if (collectionName === 'transfers') {
				return {
					valueChanges: () =>
						of([
							{
								transferAmount: 5,
								transferType: 'DEPOSIT',
								transferId: '123',
								gidxPaymentDetails: [
									{
										gidxPaymentMethodAccount: 'Paypal',
									},
								],
								__modifiedTimestamp: {
									toDate: () => '01/01/2019',
									seconds: 3,
								},
							},
							{
								transferAmount: 125,
								transferType: 'WITHDRAWAL',
								transferId: '456',
								gidxPaymentDetails: [],
								__modifiedTimestamp: {
									toDate: () => '01/01/2018',
									seconds: 4,
								},
							},
						]),
				};
			}
		},
	}),
};
