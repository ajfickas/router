window.Router = (function() {

  var clazz = function(success, error) {
    this.success = success;
    this.error = error;
    History.Adapter.bind(window,'statechange',function() {
      console.log("DEBUG: statechange, url: " + History.getState().url)
      $.ajax({
        url: History.getState().url,
        success: this.success,
        error: this.error,
        async: false
      });
    });
  };

  clazz.prototype.push = function(url) {
    History.pushState(null, null, url);
    $.ajax({
      url: url,
      success: this.success,
      error: this.error,
      async: false
    });
  };

  clazz.prototype.replace = function(url) {
    History.replaceState(null, null, url);
    $.ajax({
      url: url,
      success: this.success,
      error: this.error,
      async: false
    });
  };

  return clazz;
})();