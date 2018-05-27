var CompositeFunction = require("../../functions/composite");

class Identity extends CompositeFunction{
  constructor(){
    super("identity", "/map/identity/transform/identity/render/json")
  }
}

new Identity();
