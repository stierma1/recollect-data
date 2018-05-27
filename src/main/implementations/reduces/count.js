var ReduceFunction = require("../../functions/reduce");

class Count extends ReduceFunction{
  constructor(){
    super("count", () => {
      var reduction = (acc, doc, idx) => {
        if(idx === 0){
          return 1;
        }
        return acc + 1;
      };

      return [reduction, 0];
    })
  }
}

new Count();
