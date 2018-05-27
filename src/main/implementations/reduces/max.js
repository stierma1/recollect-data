var ReduceFunction = require("../../functions/reduce");

class Max extends ReduceFunction{
  constructor(){
    super("max", () => {
      var reduction = (acc, doc, idx) => {
        return doc > acc ? doc : acc;
      };

      return [reduction, Number.MIN_VALUE];
    })
  }
}

new Max();
