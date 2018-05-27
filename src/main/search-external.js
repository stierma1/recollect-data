
var {globalClassPath, SearchableClass} = require("classpath");

class SearchableExternal extends SearchableClass{
  constructor(name){
    super(name);
    var [searchableConnection] = globalClassPath.getPattern("#SearchableConnection*");
    this.searchableConnection = searchableConnection.document;
  }

  async __search(pattern){
    if(super.__search(pattern).length > 0){
      var docs = super.__search(pattern);
      return docs;
    }

    var docs = await this.searchableConnection.search(pattern);
    if(!(docs && docs.length > 0)){
      throw new Error("No document found matching pattern: " + pattern);
    }
    return docs;
  }
}

module.exports = SearchableExternal;
