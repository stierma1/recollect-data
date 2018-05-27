
var RenderFunction = require("../../functions/render");

class Json extends RenderFunction{
  constructor(){
    super("json", (context, params) => {
      return (headers, renderPipe, obsStream, ctx) => {
        headers["content-type"] = "application/json";
        if(params.first === undefined || params.first === "false"){
          return obsStream.toArray().subscribe((data) => {
            renderPipe.write(JSON.stringify(data), "utf8");
            renderPipe.end();
          }, () => {

          }, () => {

          });
        }

        if(params.first){
          var first = false;
          return obsStream.subscribe((data) => {
            if(!first){
              renderPipe.write(JSON.stringify(data), "utf8");
              renderPipe.end();
              first = true;
            }
          }, () => {

          }, () => {

          });
        }
      }
    })
  }
}

new Json();
