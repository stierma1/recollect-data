
class ObjectDestination{
  constructor(params){

  }

  async toObject(headers, renderPipe){
    return new Promise((res, rej) => {
      var bufferStr = "";
      var buffer = Buffer.from("", "utf8");

      renderPipe.on("data", (d) => {
        bufferStr += d.toString("utf8");
        buffer = Buffer.concat([buffer, d], buffer.length + d.length);
      });

      renderPipe.on("end", () => {
        if(headers["Content-Type"] === "application/json" || headers["content-type"] === "application/json"){
          return res(JSON.parse(bufferStr));
        }
        if(headers["Content-Type"].indexOf("text") > -1 || headers["content-type"].indexOf("text") > -1){
          return res(bufferStr);
        }
        res(buffer);
      });
    });
  }

  async send({headers, renderPipe}){
    return this.toObject(headers, renderPipe);
  }
}

module.exports = ObjectDestination;
