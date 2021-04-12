/*global Promise */
define([
    "../services/MetroServices",
    "../services/RoutePlanner",
    "../utils/Events"

], function (
    metroServices,
    RoutePlanner,
    events

) {
    "use strict";

    var ModelHandler = {
        mapCenter: {x: 0, y: 0},
        mapHeight: 0,
        mapWidth: 0,

        initialize: function (args) {
            var _this = this;
            this.mapHeight = args.height;
            this.mapWidth = args.width;
            this.model = args.model;

            this.routePlanner = new RoutePlanner({model: this.model.routeMap});

            this.initMapCenter();

            events.on("map-route-prediction", function (event) {
                _this.predictTrain(event.pdata);
            });
        },

        buildGraph: function () {
            this.model.nodes.forEach(function (entry) {
                entry.x = this.convertLon(entry.lon);
                entry.y = this.convertLat(entry.lat);
            }.bind(this));

            return {"nodes": this.model.nodes, "links": this.model.links};
        },

        buildRoute: function (request) {
            var _this = this,
                plan = null,
                result = [],
                regExp = /([A-Z]+)(\d+)/,
                fromCodes = request.from,
                toCodes = request.to;

            fromCodes.forEach(function (sCode) {
                toCodes.forEach(function (tCode) {
                    var p = _this.routePlanner.planRoute(sCode, tCode);
                    if (plan) {
                        if (p.length < plan.length) {
                            plan = p;
                        }
                    } else {
                        plan = p;
                    }
                });
            });

            plan.forEach(function (entry) {
                var m = regExp.exec(entry.cde);
                result.push({
                    cde: m[2],
                    lne: m[1],
                    id: entry.id,
                    dist: entry.distance
                });
            });

            return result;
        },

        trainPrediction: function (routePlan) {
            var _this = this,
                predictions = this.loadPredictions(routePlan[0].cde);

            return new Promise(function (resolve) {

                predictions.then(function (prediction) {
                    var result = [],
                        direction = (routePlan[0].id > routePlan[1].id) ? 'decrement' : 'increment';

                    prediction.forEach(function (entry) {
                        if (entry.lne === routePlan[0].lne) {
                            if ((direction === 'decrement' && routePlan[0].id >= entry.id) ||
                                (direction === 'increment' && routePlan[0].id <= entry.id)) {
                                result.push(_this.locateTrain(
                                    entry,
                                    entry.lne,
                                    entry.cde,
                                    direction));
                            }
                        }
                    });
                    resolve(result);
                });
            });
        },

        initMapCenter: function () {
            this.mapCenter.x = (Math.floor(((180.0 + this.model.mapCenter.lon) / 360.0) *
                ModelHandler.MERCATOR_OFFSET));

            var latRads = this.model.mapCenter.lat * Math.PI / 180;
            this.mapCenter.y =
                (Math.floor(
                    (1 - Math.log(Math.tan(latRads) + 1 / Math.cos(latRads)) / Math.PI) /
                        2 * ModelHandler.MERCATOR_OFFSET));
        },

        convertLat: function (lat) {
            var latRads = lat * Math.PI / 180;
            var y = (Math.floor(
                (1 - Math.log(Math.tan(latRads) + 1 / Math.cos(latRads)) / Math.PI) /
                    2 * ModelHandler.MERCATOR_OFFSET));

            y = y - (this.mapCenter.y - (this.mapHeight / 2));
            return y;
        },

        convertLon: function (lon) {
            var x = (Math.floor(((180.0 + lon) / 360.0) * ModelHandler.MERCATOR_OFFSET));
            return x - (this.mapCenter.x - (this.mapWidth / 2));
        },

        loadPredictions: function (stationCode) {
            var _this = this;
            return metroServices.predict(stationCode)
            .then(function (response) {
                var result = [];
                response.Trains.forEach(function (entry) {
                    if (entry.Line === 'No' ||
                        entry.Destination === 'No Passenger' ||
                        entry.Destination === 'Train') {
                        return true;
                    }

                    result.push({
                        cde: entry.LocationCode,
                        lne: entry.Line,
                        id: _this.model.routeMap[entry.Line + "-" + entry.LocationCode].id,
                        distance: isNaN(entry.Min) ? 0 : entry.Min * ModelHandler.FEET_PER_MINUTE,
                        min: entry.Min
                    });
                });

                return result;
            }, function (error) {
                console.log('Error loading station predict:', error);
            });
        },

        locateTrain: function (prediction, lne, cde, direction) {
            var curr = this.model.routeMap[lne + cde],
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
                next = this.model.routeMap[nextKey];
                totlDistance += lastDistance = curr.paths[nextKey];
                prev = curr;
                curr = next;
                prediction.distance -= ModelHandler.FEET_PER_MINUTE / 2;
            }

            return {
                min: prediction.min,
                cde: cde,
                lne: lne,
                fromStation: lastDistance - ((totlDistance > 0) ? 0 : totlDistance - prediction.distance),
                nextStation: lastDistance,
                curr: curr,
                prev: prev
            };
        }
    };

    ModelHandler.ZOOM_LEVEL = 7;
    ModelHandler.MERCATOR_OFFSET = 268435456;
    ModelHandler.MERCATOR_OFFSET >>= ModelHandler.ZOOM_LEVEL;
    ModelHandler.RADIUS = ModelHandler.MERCATOR_OFFSET / Math.PI;

    ModelHandler.FEET_PER_MINUTE = 1.46667 * 33 * 60; // @33 mph

    return {
        initialize: function (args) {
            ModelHandler.initialize(args);
        },

        buildGraph: function () {
            return ModelHandler.buildGraph();
        },

        buildRoute: function (args) {
            return ModelHandler.buildRoute(args);
        },

        trainPrediction: function (args) {
            return ModelHandler.trainPrediction(args);
        },
    };
});
