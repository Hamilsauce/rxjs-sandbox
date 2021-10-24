const { Observable, interval, of , timer, fromEvent, merge, empty, delay, from } = rxjs;
const { scan, takeWhile, tap, startWith, filter, map, mapTo } = rxjs.operators;

sendInvestorWithdrawal(reqid: string): Observable < string | string[] > => {
 
  // Finds active request for previously fetched firestore collection
  const activeRequest$ = this.getActiveRequest(reqid).pipe(map(_ => _.get('amount')));

  return this.geoLocationData.pipe(
    mergeMap(geolocation => {
  
      // Cust Monitor verifies user elligibility, 
      // returns observable of empty array or containing block reasons
      return this.gidxService.callCustomerMonitor(geolocation).pipe(
    
        // Cust Monitor fires twice for security 
        // call, thus take(1)
        take(1),
        switchMap(res => {
          return activeRequest$.pipe(
            mergeMap(amount => {
              return res.result.length === 0 ?
             
                // If Cust Monitor returned no block reasons, 
                // Create a transfer doc, start a pay processor session
                this.ngFireFunctions
                .httpsCallable('httpApis-addTransfer')({
                  clientGPS: geolocation.clientGPS,
                  transferAmount: amount,
                  transferType: 'WITHDRAWAL',
                })
                .pipe(map((_: any) => _.text)) :
              
                // Else, return block reasons
                of (res.result);
            })
          );
        })
      );
    })
  );
}