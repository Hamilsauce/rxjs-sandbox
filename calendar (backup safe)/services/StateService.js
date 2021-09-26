/*  StateService  */

export default class {
  constructor(url = './data/calendar-data.json', fileType = 'json') {
    this.url = url;
    this.fileType = fileType;
    this._data;
    this.init(url, fileType);
    setTimeout(() => console.log('this state s', this), 300)

  }


  async fetchData(url, fileType = 'json') {
    const fType = fileType.trim().toLowerCase();
    const res = await fetch(url);
    this.data = await res.json();

    // Dispatch 'dataloaded' event
    document.querySelector('.app').dispatchEvent(new CustomEvent('dataloaded', { bubbles: false, detail: { data: this.data } }))
    return this.data;
  }

  init(url, fileType) { this.fetchData(url, fileType) }

  // mapData(incomingData) { return incomingData.map(_ => { return { ..._ } }) }

  get data() { return this._data }
  set data(incomingData) { this._data = incomingData}
}