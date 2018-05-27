var ReduceFunction = require("../../functions/reduce");

class Sum extends ReduceFunction{
  constructor(){
    super("sum", () => {
      var reduction = (acc, doc, idx) => {
        return acc + doc;
      };

      return [reduction, 0];
    })
  }
}

new Sum();
