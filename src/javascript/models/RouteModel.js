/*global Promise */
define([
    './MetroModel',
    '../services/RoutePlanner',
    '../utils/Model'

], function (
    MetroModel,
    RoutePlanner,
    Model

) {
    'use strict';

    var ModelUtils = {
        initialize: function () {},

        trainPrediction: function (routePlan) {
            var _this = this;

            return Promise.resolve([]);
        }
    };

    ModelUtils.MAX_PREDICTIONS = 2;
    ModelUtils.FEET_PER_MINUTE = 1.46667 * 33 * 60; // @33 mph

    /*
    * Create model with default data
    */
    return Model.inherits({
        initialize: function (args) {

            ModelUtils.initialize(args);
            this.routePlanner = new RoutePlanner({model: MetroModel.routeMap});
            this.set({predictions: []});
            this.set({route: []});
        },

        loadRoute: function (request) {
            var _this = this, i, l,
                plan = [],
                result = [],
                regExp = /([A-Z]+)(\d+)/,
                fromCodes = [],
                toCodes = [];

            if (request && typeof request !== 'undefined') {
                fromCodes = request.from;
                toCodes = request.to;
            }

            fromCodes.forEach(function (sCode) {
                toCodes.forEach(function (tCode) {
                    var p = _this.routePlanner.planRoute(sCode, tCode);
                    if (plan) {
                        if (p.length && p.length < plan.length || plan.length === 0) {
                            plan = p;
                        }
                    } else {
                        plan = p;
                    }
                });
            });

            i = -1;
            l = plan.length;
            while (++i < l) {
                var e = plan[i],
                    m = regExp.exec(e.cde),
                    lne = [m[1]];

                if ((i + 1 < l) && MetroModel.nodes[e.id].nme ===
                    MetroModel.nodes[plan[i + 1].id].nme) {
                    e = plan[i + 1];
                    m = regExp.exec(e.cde);
                    lne.push(m[1]);
                    i += 1;
                }

                result.push({
                    cde: m[2],
                    lne: lne,
                    id: e.id,
                    dist: e.distance
                });
            }

            return this.set({route: result});
        }
    });
});
