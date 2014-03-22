describe("router", function() {
  beforeEach(function() {
    spyOn(history, "pushState");
    spyOn(history, "replaceState");
    spyOn(history, "back");
    spyOn(history, "forward");
    spyOn($, "ajax");
    this.success = function(){};
    this.error = function(){};
  });
  describe("#push", function() {
    describe("with a different url than the current page", function() {
      beforeEach(function() {
        console.log("DEBUG: Before pushing different url");
        var router = new Router(this.success, this.error);
        router.push("/some/url");
      });
      it("should navigate to a new page as expected", function() {
        console.log("DEBUG: Should navigate to different url");
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
        console.log("DEBUG: Before pushing same url")
        var router = new Router(this.success, this.error);
        this.currentUrl = window.location.href;
        router.push(this.currentUrl);
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
      console.log("DEBUG: Before replace");
      var router = new Router(this.success, this.error);
      router.replace("/some/url");
    });
    it("replace the current page as expected", function() {
      console.log("DEBUG: Should replace page");
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
  describe("when history.back() is called after navigating", function() {
    beforeEach(function() {
      console.log("DEBUG: Before history.back()");
      spyOn($, "ajax");
      this.initialUrl = window.location.href
      var router = new Router(this.success, this.error);
      router.push("/some/url");
      history.back();
    });
    it("should navigate back as expected", function() {
      console.log("DEBUG: Should navigate back");
      expect($.ajax.calls.count()).toEqual(2);
      expect($.ajax.calls.argsFor(1)).toEqual([{
        url: this.initialUrl,
        success: this.success,
        error: this.error,
        async: false
      }]);
    });
  });
  describe("when history.forward() is called after navigating and then going back", function() {
    beforeEach(function() {
      console.log("DEBUG: Before history.forward()");
      var router = new Router(this.success, this.error);
      router.push("/some/url");
      history.back();
      history.forward();
    });
    it("should navigate forward as expected", function() {
      console.log("DEBUG: Should navigate forward");
      expect($.ajax.calls.count()).toEqual(3);
      expect($.ajax.calls.argsFor(2)).toEqual([{
        url: "/some/url",
        success: this.success,
        error: this.error,
        async: false
      }]);
    });
  });
});
