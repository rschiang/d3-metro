/*
* Event listener
*/
define([

], function (

) {
    'use strict';

    return {
        cache: {},

        on: function (name, fn, scope) {
            var events = this.cache[name] || (this.cache[name] = []);
            events.push({fn: fn, scope: scope || this});

            return this;
        },

        emit: function (name) {
            if (!this.cache) {
                return this;
            }

            var e,
                i = -1,
                l = 0,
                args = Array.prototype.slice.call(arguments, 1),
                events = this.cache[name];

            if (events) {
                l = events.length;
                while (++i < l) {
                    (e = events[i]).fn.apply(e.scope, args);
                }
            }
        }
    };
});