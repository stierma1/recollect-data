var {globalClassPath, SearchableClass} = require("classpath");

class TransformFunction extends SearchableClass{
  constructor(name, transformFunction){
    super("transform:" + name);
    this.transformFunction = transformFunction;
  }

  execute(obsStream, ctx, params){
    var outObs = obsStream.concatMap(this.transformFunction(ctx, params));

    ctx.value = outObs;
    return outObs;
  }
}

module.exports = TransformFunction;
