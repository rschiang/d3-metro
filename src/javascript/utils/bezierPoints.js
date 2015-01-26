/*
* Determine Bezier curve points
* D3 layout style function to implement anination for multiple bezier curves
*
* Beziér Curve Code originally from 
* http://13thparallel.com/archive/bezier-curves/example2.js
*/
define([
    'd3'

], function (
    d3

) {
    'use strict';
    
    function bz1(t) {
        return (t * t * t);
    }

    function bz2(t) {
        return (3 * t * t * (1 - t));
    }

    function bz3(t) {
        return (3 * t * (1 - t) * (1 - t));
    }
        
    function bz4(t) {
        return ((1 - t) * (1 - t) * (1 - t));
    }

    return function () {
        var bezier = {},
            dispatch = d3.dispatch('start', 'tick', 'end'),
            points = [],
            timer = -1;
        
        bezier.points = function (p) {
            if (!arguments.length) {
                return points;
            }
            
            points = p;

            return bezier;
        };

        bezier.start = function () {
            if (timer > 0) {
                return bezier;
            }

            timer = 1;

            d3.timer(bezier.tick);

            dispatch.tick({type: 'start', timer: timer});

            return bezier;
        };

        bezier.stop = function () {
            timer = 1;

            return bezier;
        };

        bezier.tick = function () {
            var i = -1,
                l = points.length;

            while (++i < l) {
                var o = points[i];
                o.x = o.p0.x * bz1(timer) + o.p1.x * bz2(timer) +
                        o.p2.x * bz3(timer) + o.p3.x * bz4(timer);
                o.y = o.p0.y * bz1(timer) + o.p1.y * bz2(timer) +
                        o.p2.y * bz3(timer) + o.p3.y * bz4(timer);
            }

            if ((timer -= 0.010) < 0) {
                dispatch.end({type: 'end', timer: timer = 0});
                return true;
            }

            dispatch.tick({type: 'tick', timer: timer});
        };

        return d3.rebind(bezier, dispatch, 'on');
    };
});