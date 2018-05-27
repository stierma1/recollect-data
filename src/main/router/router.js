var SearchableExternal = require('../search-external');
var matrixParser = require("matrix-parser")();
var NOOP = ()=>{};
var EMPTY_OBJECT = {};

class Router extends SearchableExternal{
  constructor(){
    super("Router");
  }

  async invoke(invokationString, rawDocs){
    var req = {url:invokationString};
    matrixParser(req, EMPTY_OBJECT, NOOP);
    var {matrix} = req;

    var pairs = this._groupPairs(matrix);

    var destination = pairs.pop();
    if(destination[0].segment !== "destination"){
      throw new Error("Destination was not provided");
    }

    pairs.reverse();

    var source = pairs.pop();
    if(source[0].segment !== "source"){
      throw new Error("Source was not provided");
    }

    pairs.reverse();

    var [CtxConstructor] = await this.__search("#Constructors:RecollectionContext*");
    CtxConstructor = CtxConstructor.document;

    var ctx = new CtxConstructor({
      sourceType: source[1].segment, params:source[1].matrix, rawDocs
    }, {
      destinationType: destination[1].segment, params:destination[1].matrix
    },
    invokationString,
    pairs);

    for(var i = 0; i < pairs.length; i++){
      await this._reduction(ctx, pairs[i]);
    }

    return ctx.destination.send(ctx.value);
  }

  _groupPairs(array){
    if(array.length %2 !== 0){
      throw new Error("Array length must be even");
    }
    var pairs = [];
    for(var i = 0; i < array.length; i+=2){
      pairs.push([array[i], array[i+1]]);
    }
    return pairs;
  }

  async _reduction(ctx, pair){
    var [segment1, segment2] = pair;
    var functionClass = segment1.segment;
    var functionName = segment2.segment;

    var [doc] = await this.__search("#" + functionClass + ":" + functionName + "*");
    var func = doc.document;
    ctx.value = await func.execute(ctx.value, ctx, segment2.matrix);
    return ctx;
  }
}


module.exports = Router;
