var {globalClassPath, SearchableClass} = require("classpath");

class ReduceFunction extends SearchableClass{
  constructor(name, reduceFunction){
    super("reduce:" + name);
    this.reduceFunction = reduceFunction;
  }

  execute(obsStream, ctx, params){
    var outObs = obsStream.reduce.apply(obsStream, this.reduceFunction(ctx, params));

    ctx.value = outObs;
    return outObs;
  }
}

module.exports = ReduceFunction;
