define([

], function (

) {
    'use strict';

    function move(p, t, r) {
        var w = (t.x - p.x),
        h = (t.y - p.y),
        f = Math.min(1, (r > 0) ? r / Math.sqrt(w * w + h * h) : 0);
        return moveFraction(p, t, f);
    }

    function moveFraction(p, t, f) {
        return {
            x: p.x + (t.x - p.x) * f,
            y: p.y + (t.y - p.y) * f
        };
    }

    function curve(current, previous, next, r) {
        var cStart = move(current, previous, r),
            cEnd = move(current, next, r),
            sCtrl = moveFraction(cStart, current, 0.5),
            eCtrl = moveFraction(current, cEnd, 0.5);

        return ' L' + cStart.x + ',' + cStart.y + ' ' +
            ' C' + sCtrl.x + ' ' + sCtrl.y + ' ' + eCtrl.x + ' ' + eCtrl.y + ' ' + cEnd.x + ' ' + cEnd.y;
    }

    /*
    * Generate rectangle svg paths, paths is split into left and right sides
    * to support animate effect.
    */
    return function () {
        //var rect = {},
        var width = 40,
            height = 10,
            radius = 0,
            x = 0,
            y = 0;

        function rect() {
            return build(true) + ' ' + build(false);
        }

        function build(isLeft) {
            var str = 'M' + (x + (width / 2)) + ',' + y,
                lb = {x: x + (width / 2), y: y + height};

            str += (isLeft) ? left(lb) : right(lb);
            str += ' L' + (lb.x) + ' ' + lb.y;

            return str;
        }

        function left(lb) {
            var str = null,
                lt = {x: x, y: y},
                ll = {x: x, y: y + height};

            str = curve(lt, {x: x + radius, y: y}, ll, radius);
            str += curve(ll, lt, lb, radius);

            return str;
        }

        function right(lb) {
            var str = null,
                lt = {x: (x + width), y: y},
                lr = {x: x + width, y: y + height};

            str = curve(lt, {x: x + radius, y: y}, lr, radius);
            str += curve(lr, lt, lb, radius);

            return str;
        }

        rect.width = function (value) {
            if (!arguments.length) {
                return width;
            }
            width = value;
            return rect;
        };

        rect.height = function (value) {
            if (!arguments.length) {
                return height;
            }
            height = value;
            return rect;
        };

        rect.radius = function (value) {
            if (!arguments.length) {
                return radius;
            }
            radius = value;
            return rect;
        };

        rect.x = function (value) {
            if (!arguments.length) {
                return x;
            }
            x = value;
            return rect;
        };

        rect.y = function (value) {
            if (!arguments.length) {
                return y;
            }
            y = value;
            return rect;
        };

        return rect;
    };
});