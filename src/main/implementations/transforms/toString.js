var TransformFunction = require("../../functions/transform");

class ToString extends TransformFunction{
  constructor(){
    super("toString", () => {
      return async (doc, idx) => {
        return doc.toString();
      };
    })
  }
}

new ToString();
