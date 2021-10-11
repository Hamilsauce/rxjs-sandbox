// Avoid unecessary API calls

// If a component uses immutable data from an API call, I have often seen the data being loaded every time the component is rendered. Immutable data only needs to be loaded once, so we can reduce the number of API calls being performed.
// Assuming you are using a “loading” boolean (which is currently the default generated pattern by angular-cli or ngx-reduxor), then you can handle this in the effect that kicks off the load. Use withLatestFrom to get the latest state in the effect, and select the state being loaded and the loading (using a feature selectors!). Only kick off the API call if there is no state and loading is false.
@Effect() loadSomeData$ Observable;constructor(private actions$: Actions, private store$: Store) {this.loadSomeData$: Observable = this.actions$
.ofType(actions.LOAD_DATA)
.withLatestFrom(this.store$)
.switchMap(([action, state]) => {
const currentState = selectors.selectSomeState(state);
const loading = selectors.selectLoading(state); if (currentState || loading) {
// We either already have the state in the store,
// or are already loading, so there is no need to
// kick off another API call
return empty();
} return doApiCall()
.map((response: LoadDataResponse) => {
return new actions.Success(response);
})
.catch(() => of(new actions.Failed()));
});