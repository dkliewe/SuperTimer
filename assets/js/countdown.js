var Coutdown = function(elem, options) {

    var timer       = createTimer(),
        offset,
        clock,
        interval,
        audioA,
        audioB,
        played3 = false,
        played2 = false,
        played1 = false;
  
    // default options
    options = options || {};
    options.delay = options.delay || 1;
  
    // append elements     
    elem.appendChild(timer);
  
    // initialize
    reset();
  
    // private functions
    function createTimer() {
      return document.createElement("div");
    }
    
    function start() {
      if (!interval && clock != 0) {
        offset   = Date.now();
        interval = setInterval(update, options.delay);
      }
    }
  
    function stop() {
      if (interval && clock != 0) {
        clearInterval(interval);
        interval = null;
      }
    }
  
    function reset() {
      audioA = new Audio('assets/audio/soundA.mp3');
      audioB = new Audio('assets/audio/soundB.mp3');
      clock = options;
      played3 = false;
      played2 = false;
      played1 = false;
      render();
    }
  
    function update() {
      clock -= delta();
      render();

      //audio
      d = Number(clock);
      var ms = d % 1000;
      d = (d - ms) / 1000;
      var s = d % 60;
      if (s === 2 && played3 === false) {
        audioA.play();
        played3 = true;
      }else if (s === 1 && played2 === false) {
        audioA.play();
        played2 = true;
      }else if (s === 0 && played1 === false) {
        audioA.play();
        played1 = true;
      }
      //clock
      if (clock <= 0) {
        audioB.play();
        clock = 0;
        render();
        if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
    }
  
    function render() {
      d = Number(clock);
      var ms = d % 1000;
      d = (d - ms) / 1000;
      var s = d % 60;
      d = (d - s) / 60;
      var m = d % 60;
      var h = (d - m) / 60;
      ms = padLeft(ms,3);
      s = padLeft(s,2);
      m = padLeft(m,2);
      h = padLeft(h,2);
      timer.innerHTML = h+":"+m+":"+s+":"+ms; 
    }
  
    function delta() {
      var now = Date.now(),
          d   = now - offset;
  
      offset = now;
      return d;
    }

    function padLeft(a, b) {
        var l = (a + '').length;
        if (l >= b) {
            return a + '';
        } else {
            var arr = [];
            for (var i = 0; i < b - l ;i++) {
                arr.push('0');
            }
            arr.push(a);
            return arr.join('');
        }
    }

    function setTime(t) {
      options = t;
      reset();
    }
  
    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
    this.setTime = setTime;
  };

  var a = document.getElementById("a-timer");
  var aTimer = new Coutdown(a, 60000);

function setTime() {
  resetWatch();
  var time = setCountdown(document.getElementById("hours").value,document.getElementById("minutes").value,document.getElementById("seconds").value);
  aTimer.setTime(time);
}

function startWatch() {
  aTimer.start();
};

function stopWatch() {
  aTimer.stop();
};

function resetWatch() {
  aTimer.stop();
  aTimer.reset();
};

function setCountdown(h,m,s){
    return (h*3600000) + (m*60000) + (s*1000);
}