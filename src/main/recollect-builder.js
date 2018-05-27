var {globalClassPath, SearchableClass} = require("classpath");
var ObjectDestination = require("./destinations/object");
var RawDestination = require("./destinations/raw");
var ObjectsSource = require("./sources/objects");
var RawSource = require("./sources/raw");
var ObservableSource = require("./sources/observable");
var Router = require("./router/router");
var SearchableConnection = require("./externals/searchable-connection");
var RecollectionContext = require("./recollection-context");
var {Observable} = require("rxjs");
require("./implementations/maps");
require("./implementations/reduces")
require("./implementations/renders")
require("./implementations/transforms")
require("./implementations/composites")

class RecollectBuilder{
  constructor(){
    globalClassPath.add("#Constructors:ObjectDestination", ObjectDestination);
    globalClassPath.add("#Constructors:RawDestination", RawDestination);
    globalClassPath.add("#Constructors:ObjectsSource", ObjectsSource);
    globalClassPath.add("#Constructors:ObservableSource", ObservableSource);
    globalClassPath.add("#Constructors:RawSource", RawSource);
    globalClassPath.add("#Constructors:RecollectionContext", RecollectionContext);
    this.recollection = null;
  }

  addConstructor(name, construct){
    globalClassPath.add("#Constructors:" + name, construct);
    return this;
  }

  replaceConstructor(name, newConstruct){
    globalClassPath.remove("#Constructors:" + name);
    return this.addConstructor(name, newConstruct);
  }

  addSearchableConnection(newSearchableConnection){
    globalClassPath.add("#SearchableConnection", newSearchableConnection)
    return this;
  }

  addSource(name, source){
    return this.addConstructor(name, source);
  }

  addDestination(name, source){
    return this.addConstructor(name, source);
  }

  replaceRecollectionContext(newRecollectionContext){
    return this.replaceConstructor("RecollectionContext", newRecollectionContext);
  }

  build(){
    if(this.recollection){
      return this.recollection;
    }
    if(globalClassPath.getPattern("#SearchableConnection*").length === 0){
      new SearchableConnection();
    }
    this.recollection = new Recollect(new Router());
    return this.recollection;
  }
}

class Recollect extends SearchableClass{
  constructor(router){
    super("Recollect");
    this.router = router;
  }

  invoke(invokationString, rawDocs){
    return this.router.invoke(invokationString, rawDocs);
  }

  addConstructor(name, construct){
    globalClassPath.add("#Constructors:" + name, construct);
    return this;
  }

  addSource(name, source){
    return this.addConstructor(name, source);
  }

  addDestination(name, source){
    return this.addConstructor(name, source);
  }
}

module.exports = new RecollectBuilder();
module.exports.Recollect = Recollect;
