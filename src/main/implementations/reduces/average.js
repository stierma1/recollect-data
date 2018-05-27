var ReduceFunction = require("../../functions/reduce");

class Average extends ReduceFunction{
  constructor(){
    super("sum", () => {

      var reduction = (acc, doc, idx) => {
        if(idx === 0){
          return doc;
        } else {
          return (acc * idx + doc) / (idx + 1)
        }
      };

      return [reduction, 0];
    })
  }
}

new Average();
