var {globalClassPath} = require("classpath");

class RecollectionContext{
  constructor(source, destination, invokationString, pairs){
    var [doc] = globalClassPath.getPattern("#Constructors:" + source.sourceType + "*");
    if(doc === undefined){
      throw new Error("No source of type: " + source.sourceType);
    }
    var SourceConstructor = doc.document;
    this.source = new SourceConstructor(source.params, source.rawDocs);

    var [docD] = globalClassPath.getPattern("#Constructors:" + destination.destinationType + "*");
    if(docD === undefined){
      throw new Error("No destination of type: " + destination.destinationType);
    }
    var DestinationConstructor = docD.document;
    this.destination = new DestinationConstructor(destination.params);

    this.value = this.source;
    this.invokationString = invokationString;
    this.pairs = pairs;
  }

}

globalClassPath.add("#Constructors:RecollectionContext", RecollectionContext);

module.exports = RecollectionContext;
