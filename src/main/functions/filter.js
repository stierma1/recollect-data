var {globalClassPath, SearchableClass} = require("classpath");

class FilterFunction extends SearchableClass{
  constructor(name, filterFunction){
    super("filter:" + name);
    this.filterFunction = filterFunction;
  }

  execute(obsStream, ctx, params){
    var outObs = obsStream.filter(this.filterFunction(ctx, params));

    ctx.value = outObs;
    return outObs;
  }
}

module.exports = FilterFunction;
