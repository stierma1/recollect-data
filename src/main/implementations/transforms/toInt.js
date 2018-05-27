var TransformFunction = require("../../functions/transform");

class ToInt extends TransformFunction{
  constructor(){
    super("toInt", () => {
      return async (doc, idx) => {
        return parseInt(doc);
      };
    })
  }
}

new ToInt();
