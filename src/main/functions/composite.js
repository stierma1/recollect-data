
var {globalClassPath, SearchableClass} = require("classpath");
var {Observable} = require("rxjs");

class CompositeFunction extends SearchableClass{
  constructor(name, compositeString){
    super("composite:" + name);
    if(compositeString.indexOf("/map/") === -1){
      throw new Error("Composite must contain a map operation");
    }
    if(compositeString.indexOf("/render/") === -1){
      throw new Error("Composite must contain a render operation");
    }
    this.compositeString = "/source/ObservableSource" + compositeString + "/destination/ObjectDestination";
  }

  execute(obsStream, ctx, params){
    var outObs = new Observable((obs) => {
      var [doc] = this.__search("#Router*");
      var router = doc.document;

      router.invoke(this.compositeString, obsStream)
        .then((val) => {
          obs.next(val);
          obs.complete();
        })
        .catch((err) => {
          obs.error(err);
          obs.complete();
        });

    }).flatMap((x) => {
      if(params.flatten === "true"){
        return x;
      } else {
        return [x];
      }
    });

    ctx.value = outObs;
    return outObs;
  }
}

module.exports = CompositeFunction;
