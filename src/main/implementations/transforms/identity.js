var TransformFunction = require("../../functions/transform");

class Identity extends TransformFunction{
  constructor(){
    super("identity", () => {
      return async (doc, idx) => {
        return doc;
      };
    })
  }
}

new Identity();
