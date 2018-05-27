var MapFunction = require("../../functions/map");

class Identity extends MapFunction{
  constructor(){
    super("identity", () => {
      return (doc, obs, ctx) => {
        obs.next(doc);
      }
    })
  }
}

new Identity();
