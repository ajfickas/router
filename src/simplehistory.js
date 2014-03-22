// Aims to provide consistent popstate notification across all browsers supporting the history API.
window.simplehistory = new (function() {

  // Used to detect initial (useless) popstate.
  popstateFired = false;
  initialUrl = location.href;

  clazz = function() {
    $(window).on('popstate', function(_this) {
      return function(event) {
        // Ignore initial page load popstate event in Chrome/webkit
        if (!popstateFired) {
          popstateFired = true;
          if (location.href === initialUrl) {
            return;
          }
        }
        // trigger onpopstate callback if defined
        if (_this.onpopstate) {
          _this.onpopstate(event);
        }
      };
    }(this));
  };

  clazz.prototype.bindPopstate = function(callback) {
    this.onpopstate = callback;
  };

  return clazz;
}());
