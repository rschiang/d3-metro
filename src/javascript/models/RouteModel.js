/*global Promise */
define([
    './MetroModel',
    '../services/MetroServices',
    '../services/RoutePlanner',
    '../utils/Model'

], function (
    MetroModel,
    metroServices,
    RoutePlanner,
    Model

) {
    'use strict';

    var ModelUtils = {
        initialize: function () {},

        trainPrediction: function (routePlan) {
            var _this = this,
                predictions;

            if (!routePlan ||
                typeof routePlan === 'undefined' ||
                !routePlan.length) {

                return Promise.resolve([]);
            }

            predictions = this.loadPredictions(routePlan[0].cde);

            return new Promise(function (resolve, reject) {

                predictions.then(function (result) {
                    var p = [],
                        direction = (routePlan[0].id > routePlan[1].id) ? 'decrement' : 'increment';

                    if (result.status !== 'success') {
                        reject(result);
                        return;
                    }

                    result.data.forEach(function (entry) {
                        if (entry.lne === routePlan[0].lne[0]) {
                            if ((direction === 'decrement' && routePlan[0].id >= entry.id) ||
                                (direction === 'increment' && routePlan[0].id <= entry.id)) {

                                p.push(_this.locateTrain(
                                    entry,
                                    direction));
                            }
                        }
                    });

                    result.data = p;
                    resolve(result);
                });
            });
        },

        loadPredictions: function (stationCode) {

            return metroServices.predict(stationCode)
                .then(function (response) {
                    var p = [];
                    response.Trains.forEach(function (entry) {
                        if (entry.Line === 'No' ||
                            entry.Destination === 'No Passenger' ||
                            entry.Destination === 'Train') {
                            return true;
                        }

                        p.push({
                            cde: entry.LocationCode,
                            lne: entry.Line,
                            id: MetroModel.routeMap[entry.Line + "-" + entry.DestinationCode].id,
                            distance: isNaN(entry.Min) ? 0 : entry.Min * ModelUtils.FEET_PER_MINUTE,
                            min: entry.Min
                        });
                    });

                    return {status: 'success', data: p};
                }, function (error) {
                    console.log('Error loading station predict:', error);
                    return {status: 'error', data: []};
                });
        },

        locateTrain: function (prediction, direction) {
            var curr = MetroModel.routeMap[prediction.lne + "-" + prediction.cde],
                next = null,
                nextKey = null,
                prev = null,
                totlDistance = 0,
                lastDistance = 0;

            while (totlDistance < prediction.distance) {
                nextKey = Object.keys(curr.paths)[(direction === 'increment') ? 0 : 1];
                if (!nextKey || typeof nextKey === 'undefined') {
                    break;
                }
                next = MetroModel.routeMap[nextKey];
                totlDistance += lastDistance = curr.paths[nextKey];
                prev = curr;
                curr = next;
                prediction.distance -= ModelUtils.FEET_PER_MINUTE / 2;
            }

            return {
                min: prediction.min,
                id: prediction.id,
                cde: prediction.cde,
                lne: prediction.lne,
                fromStation: lastDistance - ((totlDistance > 0) ? 0 : totlDistance - prediction.distance),
                nextStation: lastDistance,
                curr: curr,
                prev: prev
            };
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
        },

        loadPredictions: function (request) {
            var _this = this,
                prediction = ModelUtils.trainPrediction(request);
            prediction.then(function (result) {
                _this.set({predictions: result});
            }, function (result) {
                _this.set({predictions: result});
            });
        }
    });
});
