
class ObjectsSource{
  constructor(params){
    this.docs = (params.docs && JSON.parse(params.docs)) || [];
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

module.exports = ObjectsSource;
