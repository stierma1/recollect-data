var {globalClassPath, SearchableClass} = require("classpath");
var {Observable} = require("rxjs");

class MapFunction extends SearchableClass{
  constructor(name, mapFunc){
    super("map:" + name);
    this.mapFunc = mapFunc;
  }

  execute(cursor, ctx, params){
    var outObs = new Observable(async (obs) => {
      var page = await cursor.nextPage();
      var mapF = this.mapFunc(ctx, params);
      while(page.length > 0){
        for(var doc of page){
          mapF(doc, obs, ctx);
        }
        page = await cursor.nextPage();
      }

      obs.complete();
    });

    ctx.value = outObs;
    return outObs;
  }
}

module.exports = MapFunction;
