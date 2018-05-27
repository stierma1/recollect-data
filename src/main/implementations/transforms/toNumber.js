var TransformFunction = require("../../functions/transform");

class ToNumber extends TransformFunction{
  constructor(){
    super("toNumber", () => {
      return async (doc, idx) => {
        return new Number(doc);
      };
    })
  }
}

new ToNumber();
