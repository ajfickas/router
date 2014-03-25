describe("simplehistory", function() {
  beforeEach(function() {
    historyChangeSpy = jasmine.createSpy('historyChangeSpy');
    simplehistory.onhistorychange = historyChangeSpy;
  });
  describe("#push", function() {
    describe("with a new url", function() {
      beforeEach(function(done) {
        console.log("DEBUG: before different url")
        simplehistory.push("/new/url");
        setTimeout(done, 0);
      });
      it("should emit historychange once", function() {
        expect(historyChangeSpy.calls.count()).toEqual(1);
        expect(window.location.pathname).toEqual("/new/url");
      });
      afterEach(function() {
        console.log("DEBUG: after different url")
        history.back();
      });
    });
    describe("with the same url as the current page", function() {
      beforeEach(function() {
        console.log("DEBUG: Before pushing same url")
        this.pathname = location.pathname;
        simplehistory.push(this.pathname);
      });
      it("should emit historychange once", function() {
        expect(historyChangeSpy.calls.count()).toEqual(1);
        expect(window.location.pathname).toEqual(this.pathname);
      });
    });
  });
//  describe("#replace", function() {
//    beforeEach(function() {
//      console.log("DEBUG: Before replace");
//      this.originalUrl = location.href;
//      simplehistory.replace("/new/url");
//    });
//    it("should emit historychange once", function() {
//      expect(historyChangeSpy.calls.count()).toEqual(1);
//    });
//    it("should emit historychange with the new url", function() {
//      expect(historyChangeSpy).toHaveBeenCalledWith("new/url");
//    });
//    afterEach(function() {
//      simplehistory.replace(this.originalUrl);
//    });
//  });
//  describe("when history.back() is called after navigating", function() {
//    beforeEach(function() {
//      console.log("DEBUG: Before history.back()");
//      this.initialUrl = window.location.href;
//      simplehistory.push("/new/url");
//      history.back();
//    });
//    it("should emit historychange twice", function() {
//      expect(historyChangeSpy.calls.count()).toEqual(2);
//    });
//    it("should emit historychange first with the new url", function() {
//      expect(historyChangeSpy.calls.argsFor(0)).toEqual(["/new/url"]);
//    });
//    it("should emit historychange second with the initial url", function() {
//      expect(historyChangeSpy.calls.argsFor(1)).toEqual([this.currentUrl]);
//    });
//  });
//  describe("when history.forward() is called after navigating and then going back", function() {
//    beforeEach(function() {
//      console.log("DEBUG: Before history.forward()");
//      simplehistory.push("/new/url");
//      history.back();
//      history.forward();
//    });
//    it("should emit historychange thrice", function() {
//      expect(historyChangeSpy.calls.count()).toEqual(3);
//    });
//    it("should emit historychange first with the new url", function() {
//      expect(historyChangeSpy.calls.argsFor(0)).toEqual(["/new/url"]);
//    });
//    it("should emit historychange second with the initial url", function() {
//      expect(historyChangeSpy.calls.argsFor(1)).toEqual([this.currentUrl]);
//    });
//    it("should emit historychange third with the new url", function() {
//      expect(historyChangeSpy.calls.argsFor(0)).toEqual(["/new/url"]);
//    });
//    afterEach(function() {
//      history.back();
//    });
//  });
});
