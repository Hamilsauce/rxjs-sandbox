this.payoutCollectionSubscription = this.payoutRequests$.pipe(
    map(reqs => {
      this.tableData = reqs
        .map(req => {
          return {
            // date: req.__createdTimestamp ? .toDate(),
            status: req.status,
            amount: req.amount,
          };
        })
        
        (B && !A) || !(B || !A )
        
        .sort((a, b) => {
          return b.status.toUpperCase() === 'APPROVED' &&
            a.status.toUpperCase() !== 'APPROVED' ?
            1 :
            b.status.toUpperCase() !== 'APPROVED' && a.status.toUpperCase() === 'APPROVED' ?
            -1 :
            0;
        });
    })
  )
  .subscribe();