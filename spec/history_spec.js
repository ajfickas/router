// Written to understand the expected behavior of the history api
describe("history", function() {
  beforeEach(function(done) {    // workaround to ensure any initial popstate clears
    _this = this;
    this.onpopstateCallback = function() {
      console.log("DEBUG: onpopstate called, history.state: " + history.state);
    };
    window.onpopstate = this.onpopstateCallback;
    console.log("DEBUG: <<< Waiting for any initial popstate");
    setTimeout(function() {
      console.log("DEBUG: >>> done waiting for any initial popstate");
      spyOn(history, "pushState").and.callThrough();
      spyOn(_this, 'onpopstateCallback').and.callThrough();
      done();
    }, 100);
  });
//  describe("#pushState", function() {
//    describe("with a new path", function() {
//      beforeEach(function(done) {
//        console.log("DEBUG: <<< pushing different url");
//        history.pushState("some state", null, "/new/url");
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for pushState");
//          done();
//        }, 100);
//      });
//      it("should update history without emitting popchange event", function() {
//        expect(this.onpopstateCallback.calls.count()).toEqual(0);
//        expect(location.pathname).toEqual("/new/url");
//        expect(history.state).toEqual("some state");
//      });
//      afterEach(function(done) {
//        console.log("DEBUG: <<< history.back()");
//        history.back();
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for history.back()");
//          done();
//        }, 100);
//      });
//    });
//    describe("with the same path as the current url", function() {
//      beforeEach(function(done) {
//        this.pathname = location.pathname;
//        console.log("DEBUG: <<< pushing same path")
//        history.pushState("some state", null, this.pathname);
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for pushState")
//          done();
//        }, 100);
//      });
//      it("should update history without emitting popchange event", function() {
//        expect(this.onpopstateCallback.calls.count()).toEqual(0);
//        expect(window.location.pathname).toEqual(this.pathname);
//        expect(history.state).toEqual("some state");
//      });
//      afterEach(function(done) {
//        console.log("DEBUG: <<< history.back()");
//        history.back();
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for history.back()");
//          done();
//        }, 100);
//      });
//    });
//  });
//  describe("#replaceState", function() {
//    describe("with a new path", function() {
//      beforeEach(function(done) {
//        console.log("DEBUG: <<< pushing different url");
//        this.originalUrl = location.href;
//        history.replaceState("some state", null, "/new/url");
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for replaceState");
//          done();
//        }, 100);
//      });
//      it("should update history without emitting popchange event", function() {
//        expect(this.onpopstateCallback.calls.count()).toEqual(0);
//        expect(location.pathname).toEqual("/new/url");
//        expect(history.state).toEqual("some state");
//      });
//      afterEach(function(done) {
//        console.log("DEBUG: <<< replaceState(this.originalUrl);");
//        history.replaceState(null, null, this.originalUrl);
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for replaceState(this.originalUrl);");
//          done();
//        }, 100);
//      });
//    });
//    describe("with the same path as the current url", function() {
//      beforeEach(function(done) {
//        this.pathname = location.pathname;
//        console.log("DEBUG: <<< pushing same path")
//        history.replaceState("some state", null, this.pathname);
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for replaceState")
//          done();
//        }, 100);
//      });
//      it("should update history without emitting popchange event", function() {
//        expect(this.onpopstateCallback.calls.count()).toEqual(0);
//        expect(window.location.pathname).toEqual(this.pathname);
//        expect(history.state).toEqual("some state");
//      });
//    });
//  });
//  describe("using history.back()", function() {
//    describe("after pushing state", function() {
//      beforeEach(function(done) {
//        this.originalUrl = location.href;
//        console.log("DEBUG: <<< pushState and history.back()");
//        history.pushState("some state", null, "/new/url");
//        history.back();
//        setTimeout(function() {
//          console.log("DEBUG: >>> done waiting for pushState and history.back()");
//          done();
//        }, 100);
//      });
//      it("should be where we started and emit popchange event once", function() {
//        console.log("DEBUG: testing...");
//        expect(this.onpopstateCallback.calls.count()).toEqual(1);
//        expect(location.href).toEqual(this.originalUrl);
//        expect(history.state).toEqual(null);
//      });
//    });
//  });
  describe("using history.forward()", function() {
    describe("after pushing state and going back", function() {
      beforeEach(function(done) {
        this.originalUrl = location.href;
        console.log("DEBUG: <<< pushState");
        history.pushState("some state", null, "/new/url");
        // TODO: nest navigation in setTimeouts to ensure they are all evaluated individually!
        setTimeout(function() {
          console.log("DEBUG: >>> done waiting for pushState");
          console.log("DEBUG: <<< history.back()");
          history.back();
          setTimeout(function() {
            console.log("DEBUG: >>> done waiting for history.back()");
            console.log("DEBUG: <<< history.forward()");
            history.forward();
            setTimeout(function() {
              console.log("DEBUG: >>> done waiting for history.forward()");
              done();
            }, 100);
          }, 100);
        }, 100);
      });
      it("should be at the new url and emit popchange event twice", function() {
        console.log("DEBUG: testing...");
        expect(this.onpopstateCallback.calls.count()).toEqual(2);
        expect(location.pathname).toEqual("/new/url");
        expect(history.state).toEqual("some state");
      });
      afterEach(function(done) {
        console.log("DEBUG: <<< history.back()");
        history.back();
        setTimeout(function() {
          console.log("DEBUG: >>> done waiting for history.back()");
          done();
        }, 100);
      });
    });
  });
});
