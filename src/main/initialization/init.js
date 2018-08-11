var {globalClassPath} = require("classpath");
var ObjectDestination = require("../destinations/object");
var RawDestination = require("../destinations/raw");
var ObjectsSource = require("../sources/objects");
var RawSource = require("../sources/raw");
var ObservableSource = require("../sources/observable");
var Router = require("../router/router");
var SearchableConnection = require("../externals/searchable-connection");
var RecollectionContext = require("../recollection-context");
var {Observable} = require("rxjs");
require("../implementations/maps");
require("../implementations/reduces")
require("../implementations/renders")
require("../implementations/transforms")
require("../implementations/composites")

module.exports = new Promise(async (res, rej) => {
  globalClassPath.add("#Constructors:ObjectDestination", ObjectDestination);
  globalClassPath.add("#Constructors:RawDestination", RawDestination);
  globalClassPath.add("#Constructors:ObjectsSource", ObjectsSource);
  globalClassPath.add("#Constructors:ObservableSource", ObservableSource);
  globalClassPath.add("#Constructors:RawSource", RawSource);
  globalClassPath.add("#Constructors:RecollectionContext", RecollectionContext);

  var s = {a:"true"}
  if(globalClassPath.get("#SearchableConnection*").length === 0){
    new SearchableConnection();
  }

  var router = new Router();
  var v = await router.invoke(`/source/ObservableSource/map/identity/composite/identity;flatten=true/reduce/count/render/json;first=false/destination/ObjectDestination`, Observable.from([1,23,4]));
  console.log(v)
  var s = await router.invoke(`/source/ObservableSource/map/identity/composite/identity;flatten=true/render/text;first=false;flatten=true/destination/ObjectDestination`, Observable.from([5,1,23,4]));
  console.log(s)
  res();
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
