const { Observable,interval, of , timer, fromEvent, merge, empty, delay, from } = rxjs;
const { scan, takeWhile, tap, startWith, filter, map, mapTo } = rxjs.operators;

export class WithdrawalService {
	constructor(ngFireFunctions, ngFirestore, gidxService, store) {
		this.requestQuery$;
		this.activeRequest$;
	}

	get geoLocationData() {
		return (new Observable((observer) => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						observer.next({
							clientGPS: {
								//@ts-ignore
								radius: position.coords.radius || 10,
								altitude: position.coords.altitude || 0,
								speed: position.coords.speed || 0,
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								dateTime: new Date(position.timestamp).toUTCString(),
							},
						});
						observer.complete();
					},
					(error) => observer.error(error)
				);
			})
		);
	}

	getActiveRequest(reqid) {
		return this.store.select(fromRoot.selectProfile).pipe(
			take(1),
			switchMap((profile) => {
				return this.ngFirestore.collection('investorProfiles')
          .doc(profile?.profileId)
          .collection('payoutRequests')
          .doc(reqid)
          .get();
			})
		);
	}

	fetchPayoutRequestCollection() {
		return this.store.select(fromRoot.selectProfile).pipe(
			take(1),
switchMap(profile => {
        return this.ngFirestore
          .collection('investorProfiles')
          .doc(profile?.profileId)
          .collection('payoutRequests', ref => ref.orderBy('__modifiedTimestamp', 'desc'))
          .valueChanges();
      })
		);
	}
	
	// Takes 

  sendInvestorWithdrawal(reqid: string): Observable <string | string[]> {
  
    const activeRequest$ = this.getActiveRequest(reqid).pipe(map(_ => _.get('amount')));
    
    return this.geoLocationData.pipe(
      mergeMap(geolocation => {
        return this.gidxService.callCustomerMonitor(geolocation).pipe(
          take(1),
          switchMap(res => {
            return activeRequest$.pipe(
              mergeMap(amount => {
                return res.result.length === 0 ?
                  this.ngFireFunctions
                  .httpsCallable('httpApis-addTransfer')({
                    clientGPS: geolocation.clientGPS,
                    transferAmount: amount,
                    transferType: 'WITHDRAWAL',
                  })
                  .pipe(map((_: any) => _.text)) :
                  of (res.result);
              })
            );
          })
        );
      })
    );
  }
  
	initiateNewWithdrawal(transferAmount) {
		return this.geoLocationData.pipe(
			take(1),
			mergeMap((geolocation) => {
				return this.gidxService.callCustomerMonitor(geolocation).pipe(
					switchMap((res) => {
						return res.result.length === 0 ? this.createPayoutRequest(transferAmount) : of(res.result);
					})
				);
			})
		);
	}

	createPayoutRequest(amount) {
		const timeStamp = firebase.firestore.Timestamp.now();
		const id = this.ngFirestore.createId();
		return this.store.select(fromRoot.selectProfile).pipe(
			take(1),
			mergeMap((user) => {
				return from(
					this.ngFirestore
						.collection('investorProfiles')
						.doc(user?.profileId)
						.collection('payoutRequests')
						.doc(id)
						.set({
							amount,
							customerMonitorID: null,
							investorProfileId: user?.profileId,
							payoutRequestId: id,
							payoutType: 'Winnings',
							reasonForDenial: null,
							status: 'Under Review',
							/* eslint-disable @typescript-eslint/naming-convention */
							__createdBy: user?.profileId,
							__modifiedBy: user?.profileId,
							__createdTimestamp: timeStamp,
							__modifiedTimestamp: timeStamp,
							__isDeleted: false,
							__isActive: true,
							/* eslint-enable @typescript-eslint/naming-convention */
						})
						.then(() => id)
				);
			})
		);
	}
}
