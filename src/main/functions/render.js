
var {globalClassPath, SearchableClass} = require("classpath");
var PassThrough = require("stream").PassThrough

class RenderFunction extends SearchableClass{
  constructor(name, renderFunction){
    super("render:" + name);
    this.renderFunction = renderFunction;
  }

  execute(obsStream, ctx, params){
    var headers = {};
    var renderPipe = new PassThrough();

    this.renderFunction(ctx, params)(headers, renderPipe, obsStream, ctx);

    ctx.value = {headers, renderPipe};
    return ctx.value;
  }
}

module.exports = RenderFunction;
