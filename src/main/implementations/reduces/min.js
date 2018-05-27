var ReduceFunction = require("../../functions/reduce");

class Min extends ReduceFunction{
  constructor(){
    super("min", () => {
      var reduction = (acc, doc, idx) => {
        return doc < acc ? doc : acc;
      };

      return [reduction, Number.MAX_VALUE];
    })
  }
}

new Min();
