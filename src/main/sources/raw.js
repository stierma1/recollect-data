
class RawSource{
  constructor(params, rawDocs){
    this.docs = rawDocs || [];
    this.complete = false;
  }

  async init(){

  }

  nextPage(){
    if(this.complete){
      return [];
    }
    this.complete = true;
    return this.docs;
  }
}

module.exports = RawSource;
