window.Router = (function() {

  var clazz = function(success, error) {
    this.success = success;
    this.error = error;
    simplehistory.bindPopstate(function(_this) {
      return function(event) {
        $.ajax({
          url: location.href,
          success: _this.success,
          error: _this.error,
          async: false
        });
      }
    }(this));
  };

  clazz.prototype.pushUrl = function(url) {
    history.pushState(null, null, url);
    $.ajax({
      url: url,
      success: this.success,
      error: this.error,
      async: false
    });
  };

  clazz.prototype.replaceUrl = function(url) {
    history.replaceState(null, null, url);
    $.ajax({
      url: url,
      success: this.success,
      error: this.error,
      async: false
    });
  };

  return clazz;
})();