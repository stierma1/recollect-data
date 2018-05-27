
class ObjectDestination{
  constructor(headers, renderPipe){
    this.headers = headers;
    this.renderPipe = renderPipe;
  }

  async toObject(){
    return new Promise((res, rej) => {
      var bufferStr = "";
      var buffer = Buffer.from("", "utf8");

      this.renderPipe.on("data", (d) => {
        bufferStr += d.toString("utf8");
        buffer = Buffer.concat([buffer, d], buffer.length + d.length);
      });

      this.renderPipe.on("end", () => {
        if(this.headers["Content-Type"] === "application/json" || this.headers["content-type"] === "application/json"){
          return res(JSON.parse(bufferStr));
        }
        if(this.headers["Content-Type"].indexOf("text") > -1 || this.headers["content-type"].indexOf("text") > -1){
          return res(bufferStr)
        }
        res(buffer);
      });
    });
  }
}

module.exports = ObjectDestination;
