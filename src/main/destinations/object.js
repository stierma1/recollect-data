
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
        var contentType = headers["Content-Type"] || headers["content-type"] || "";
        if(contentType === "application/json"){
          return res(JSON.parse(bufferStr));
        }
        if(contentType.indexOf("text/") > -1){
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
