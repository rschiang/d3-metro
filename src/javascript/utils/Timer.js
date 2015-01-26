define([

], function (

) {
    'use strict';

    /*
    * Interval Timer wrapper object that executes a 'tick' function at specified interval
    * Allows for optinal onStart and onStop callbacks to be registered. 
    */
    var Timer = function (interval) {
		this.timer = null;
		this.isRunning = false;
		this.interval = interval;

		this.onStart = null;
		this.onStop = null;
	};

    /*
    * Called every interval. Should be overridden
    */
    Timer.prototype.tick = function () {
	};
		
    /*
    * Creates and starts interval time executing tick function
    */
    Timer.prototype.start = function () {
        if (typeof this.onStart === 'function') {
            this.onStart();
        }
        this.isRunning = true;
        this.timer = window.setInterval(
            (function (scope) {
                return function () {
                    return scope.tick.apply(scope, arguments);
                };
            }(this)), this.interval);
    };

    /*
    * Stops and clears timer
    */
    Timer.prototype.stop = function () {
        if (typeof this.onStop === 'function') {
            this.onStop();
        }
        this.isRunning = false;
        window.clearInterval(this.timer);
    };

	return Timer;
});
