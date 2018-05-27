
class RawDestination{
  constructor(params){

  }

  async send({headers, renderPipe}){
    return {headers, renderPipe};
  }
}

module.exports = RawDestination;
