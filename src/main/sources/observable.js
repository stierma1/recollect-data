var {Observable} = require("rxjs");

class ObservableSource{
  constructor(params, rawDocs){
    this.docs = rawDocs || Observable.empty();
    this.complete = false;
    this.docsBuffer = [];
    this.dataSignal = null;
    this.readReady = null;
    this.buildReadReady();
    this.docs.subscribe((doc) => {
      this.docsBuffer.push(doc);
      if(this.dataSignal){
        this.dataSignal();
      }
    }, () => {

    }, () => {
      this.complete = true;
      if(this.dataSignal){
        this.dataSignal();
      }
    })
  }

  async init(){

  }

  buildReadReady(){
    this.readReady = new Promise((res, rej) => {
      this.dataSignal = res;
    });
  }

  async nextPage(){
    if(this.docsBuffer.length > 0 || this.complete){
      var buf = this.docsBuffer;
      this.docsBuffer = [];
      return buf;
    }
    return this.readReady.then(() => {
      var buf = this.docsBuffer;
      this.docsBuffer = [];
      this.buildReadReady();
      return buf;
    })
  }
}

module.exports = ObservableSource;
