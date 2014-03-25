window.simplehistory = new ((function() {

  var clazz = function() {
    _this = this;
    this.historyIndex = 0;
    window.onpopstate = function(event) {
      if (history.state !== null && history.state.historyIndex != _this.historyIndex) {
        _this.emitHistoryChange();
      }
    };
  };

  clazz.prototype.push = function(url) {
    console.log("DEBUG: push, url: " + url);
    historyIndex =
    history.pushState({historyIndex: 1}, null, url);
    _this.emitHistoryChange();
  };

  clazz.prototype.replace = function(url) {
    console.log("DEBUG: replace, url: " + url);
    history.replaceState(null, null, url);
    _this.emitHistoryChange();
  };

  clazz.prototype.emitHistoryChange = function() {
    console.log("DEBUG: onhistorychange, history.state: " + history.state);
    if (_this.onhistorychange) {
      _this.onhistorychange(history.state);
    }
  }

  return clazz;
})());