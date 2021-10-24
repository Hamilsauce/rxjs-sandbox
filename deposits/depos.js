// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable, Subscription } from 'rxjs';
// import { map, switchMap, take } from 'rxjs/operators';
// import * as fromRoot from '../../../common/state';
// import { TransfersService } from '../../services/transfers.service';

const { partition, Observable, of , iif, subscribe, fromEvent, merge, empty, from, timer } = rxjs;
const { fromFetch } = rxjs.fetch;
const { switchMap, scan, take, mergeMap, takeWhile, map, tap, startWith, takeUntil, filter, mapTo } = rxjs.operators;


export class DepositFundsViewComponent {
  // routeSubscription:b Subscription | undefined;
  // subscription: Subscription | undefined;
  // transferStatusSubscription: Subscription | undefined;
  // geoLocationData: any;
  // transferId | undefined;
  // isBlocked: boolean = false;

  /*
  1. Click Add Cash
  2. Route to deposits
  3. Call Cust Mon
  4a. If cust mon returns array,
      no route to payment, show sbar;
      END
  4b. ELSE cust mon returns string,
      Begin observing royte params
      

  5a. Put in URL, view will route to payment

  5b. Observe transfer doc for COMPLETE OR ERROR
      
  6. When Doc shows Complete, put status in URL ;
    view will route to success

  3 observables: 


  */


  constructor(
    router,
    activatedRoute,
    store,
    transfersService,
    snackBar,
  ) {}

  ngOnInit() {
    // const user$ = this.store.select(fromRoot.selectUser).pipe(map(_ => _?.uid));
    // this.transferStatusSubscription = 

    const [tid$, codes$] = partition(
      this.deposit$ = this.transfersService.sendInvestorDeposit().pipe(map(response => response)),
      res => typeof res === 'string'
    )
    // .subscribe();

    this.subscription
      .pipe(
        switchMap(user => {
          merge(
            this.activatedRoute.queryParams.pipe(
              filter(params => !params.tid),
              map(params => {
                this.routeToChild('payment', { tid: transfer.transferId });
                // this.mapChildRoute(hasParam(arg), (value: PredicateValue) => {
                //   this.doRoute(value.path, value.id, undefined);
                // });
                return params;
              }),
              mergeMap(args => this.trackTransferStatus(args))
            )
          );
        })
      )
      .subscribe();

    const noParams$ = this.activatedRoute.queryParams.pipe(
      filter(parms => parms.tid === undefined),
      tap(() => {
        this.doRoute('payment', undefined, undefined);
      })
    );

    /*

    this.subscription = user$
      .pipe(
        switchMap(user =>
          merge(
            this.activatedRoute.queryParams.pipe(
              filter(parms => parms.tid !== undefined),
              map(parms => {
                const arg = {
                  userId: user,
                  transferId: parms.tid,
                };
                this.mapChildRoute(hasParam(arg), (value: PredicateValue) => {
                  this.doRoute(value.path, value.id, undefined);
                });
                return arg;
              }),
              mergeMap(args => this.trackTransferStatus(args))
            )
            noParams$
          )
        )
      )
      .subscribe();
    */
  }

  ngOnDestroy() {
    // this.subscription?.unsubscribe();
    this.transferStatusSubscription.unsubscribe();
  }

  trackTransferStatus(transferId) {
    console.log('in trackTransferStatus start: ', transferId);

    return this.transfersService.fetchTransfer(transferId || '').pipe(
      map(transfer => {
        // this.isBlocked = params.tid === 'blocked'true : false;
        console.log('in track transfer, transfer: ', transfer);

        return transfer.transferStatus === 'COMPLETE' ?
          this.routeToChild('confirmation', { tid: transferId }, { transfer }) :
          this.routeToChild('payment', { tid: transfer.transferId });
      })
    );
  }

  routeToChild(
    routePath,
    params,
    state,
  ) {
    this.router.navigate([`./${routePath}/`], {
      queryParams: params ? { ...params } : {},
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
      state,
    });
  }

  sendInvestorDeposit() {}

  displayReasonCodes(response = []) {
    this.snackBar
      .open(
        response.reduce((outputMsg, curr) => {
          return [outputMsg, ` ${curr}`].join('\n\n');
        }, `We're unable to process your request due to the following:`),
        'Go to FAQs',
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['reasoncode-snackbar'],
        }
      )
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/user/faqs'));
  }
}