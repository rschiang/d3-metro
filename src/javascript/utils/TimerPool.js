define([
	"./Timer",

], function (
    Timer

) {
    "use strict";
    
    /*
    * Timer wrapper object that manages a pool of timer objects
    * Objects maybe registered or removed
    */
    var TimerPool = function () {
        
        if (TimerPool.prototype._singleton) {
            return TimerPool.prototype._singleton;
        }

        TimerPool.prototype._singleton = this;

        var registered = [];

        var stopRegistered = function () {
            var i = registered.length;
            while (i--) {
                registered[i].stop();
            }
        };

        var shutdown = function () {
            var i = registered.length;
            while (i--) {
                registered[i].stop();
                registered.splice(i, 1);
            }
        };

        return {
        
            /*
            * Stop all registered entries
            */
            stop: function () {
                stopRegistered();
            },

            /*
            * Stop and remove all registered entries
            */
            shutdown: function () {
                shutdown();
            },

            /*
            * Register and start new Timer
            * @param: function to execute
            * @param: interval between function execution
            */
            register: function (fn, interval) {
                if (typeof fn !== 'function') {
                    return;
                }
            
                var t = new Timer(interval);
                t.tick = fn;
                registered.push(t);
                t.start();
            },

            /*
            * Stop and remove Timer
            * @param: executing function 
            */
            remove: function (fn) {
                if (typeof fn !== 'function') {
                    return;
                }
                var i = registered.length;
                while (i--) {
                    if (registered[i].tick === fn) {
                        registered[i].stop();
                        registered.splice(i, 1);
                    }
                }
            }
        };
    };

    return TimerPool;
});