var RenderFunction = require("../../functions/render");

class Text extends RenderFunction{
  constructor(){
    super("text", (context, params) => {
      return (headers, renderPipe, obsStream, ctx) => {
        headers["content-type"] = "text/plain";
        if(params.first === undefined || params.first === "false"){
          return obsStream.toArray().subscribe((data) => {
            if(params.flatten === "true"){
              for(var d of data){
                renderPipe.write(this.convertToText(d), "utf8");
              }
              renderPipe.end();
            } else {
              renderPipe.write(this.convertToText(data), "utf8");
              renderPipe.end();
            }

          }, () => {

          }, () => {

          });
        }
        else {
          var first = false;
          return obsStream.subscribe((data) => {
            if(!first){
              if(params.flatten === "true"){
                for(var d of data){
                  renderPipe.write(this.convertToText(d), "utf8");
                }
                renderPipe.end();
              } else {
                renderPipe.write(this.convertToText(data), "utf8");
                renderPipe.end();
              }

              first = true;
            }
          }, () => {

          }, () => {

          });
        }
      }
    })
  }

  convertToText(data){
    if(typeof(data) === "string"){
      return data;
    } else if(data instanceof Date){
      return data.toISOString();
    } else {
      return JSON.stringify(data);
    }
  }
}

new Text();
