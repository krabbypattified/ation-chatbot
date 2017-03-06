// Fire something once for many listeners and destroy them
Element.prototype.listen_once = function(events, _func, capture) {

    var func = _func;
    capture = typeof capture === 'undefined' ? true : capture;

    var prop = 'listen_once' + (0|Math.random()*9e6).toString(36);
    var eArray = events.split(" ");


    func = (function () {
      var _f = func;
      return function () {
          var result;

          if (!this.hasOwnProperty(prop)) {
            this[prop] = true;
            result = _f.apply(this, arguments);
            // console.log('this will fire once');
          }
          // console.log('this will fire multiple times');
          return result;
      };
    })();

    for (var i=0; i < eArray.length; i++){
        this.addEventListener(eArray[i], func, {capture: capture, once: true});
    }


};
