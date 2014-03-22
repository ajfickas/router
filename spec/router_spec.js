describe("router", function() {
  beforeEach(function() {
    spyOn(history, "pushState");
    spyOn(history, "replaceState");
    spyOn($, "ajax");
    this.success = function(){};
    this.error = function(){};
  });
  describe("#pushUrl", function() {
    describe("with a different url than the current page", function() {
      beforeEach(function() {
        var router = new Router(this.success, this.error);
        router.pushUrl("/some/url");
      });
      it("should navigate to a new page as expected", function() {
        expect(history.pushState.calls.count()).toEqual(1);
        expect(history.pushState).toHaveBeenCalledWith(null, null, "/some/url");
        expect($.ajax.calls.count()).toEqual(1);
        expect($.ajax).toHaveBeenCalledWith({
          url: "/some/url",
          success: this.success,
          error: this.error,
          async: false
        });
      });
    });
    describe("with the same url as the current page", function() {
      beforeEach(function() {
        var router = new Router(this.success, this.error);
        this.currentUrl = window.location.href;
        router.pushUrl(this.currentUrl);
      });
      it("should refresh the page as expected", function() {
        console.log("DEBUG: Should refresh page")
        expect(history.pushState.calls.count()).toEqual(1);
        expect(history.pushState).toHaveBeenCalledWith(null, null, this.currentUrl);
        expect($.ajax.calls.count()).toEqual(1);
        expect($.ajax).toHaveBeenCalledWith({
          url: this.currentUrl,
          success: this.success,
          error: this.error,
          async: false
        });
      });
    });
  });
  describe("#replace", function() {
    beforeEach(function() {
      var router = new Router(this.success, this.error);
      this.originalUrl = location.href;
      router.replaceUrl("/some/url");
    });
    it("replace the current page as expected", function() {
      expect(history.replaceState.calls.count()).toEqual(1);
      expect(history.replaceState).toHaveBeenCalledWith(null, null, "/some/url");
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax).toHaveBeenCalledWith({
        url: "/some/url",
        success: this.success,
        error: this.error,
        async: false
      });
    });
  });
  describe("when popstate is triggered", function() {
    beforeEach(function() {
      var popstateCallback = null;
      spyOn(simplehistory, 'bindPopstate').and.callFake(function(callback) {
        popstateCallback = callback;
      });
      new Router(this.success, this.error);
      popstateCallback();
    });
    it("should request current url", function() {
      expect($.ajax.calls.count()).toEqual(1);
      expect($.ajax.calls.argsFor(0)).toEqual([{
        url: location.href,
        success: this.success,
        error: this.error,
        async: false
      }]);
    });
  });
});
