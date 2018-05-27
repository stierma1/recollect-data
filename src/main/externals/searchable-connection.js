var {SearchableClass} = require("classpath");

class SearchableConnection extends SearchableClass{
  constructor(){
    super("SearchableConnection");
  }

  search(){
    return [];
  }
}

module.exports = SearchableConnection;
