define([
    '../views/MetroView',
    '../views/RouteView',
    '../models/MapModel',
    '../models/RouteModel',
    '../utils/TimerPool',
    '../utils/Events'

], function (
    metroView,
    routeView,
    MapModel,
    RouteModel,
    TimerPool,
    events

) {
    'use strict';

    /*
    * Simple controller handling interactions between view and model
    */
    var MetrolController = {

        /*
        * Initialize controller internal components
        */
        initialize: function () {
            var container = document.getElementById('metroMap'),
                width = container.offsetWidth,
                height = container.offsetHeight;

            this.timerPool = new TimerPool();
            this.initializeEvents();
            this.initializeModels({
                width: width,
                height: height,
                container: container
            });

            this.partialPrediction = null;

            metroView.initialize({
                modelMap: this.mapModel,
                modelRoute: this.routeModel,
                width: width,
                height: height,
                container: container
            });

            container = document.getElementById('metroRoute');
            width = container.offsetWidth;
            height = container.offsetHeight;
            
            routeView.initialize({
                modelMap: this.mapModel,
                modelRoute: this.routeModel,
                width: width,
                height: height,
                container: container
            });

            metroView.render();
            routeView.render();
        },

        initializeModels: function (args) {
            this.mapModel = new MapModel(args);
            this.routeModel = new RouteModel(args);
        },

        /*
        * Subscribe to events published by view
        */
        initializeEvents: function () {
            events.on('map-route', function (route) {
                this.handleLoadRoutePlan(route);
            }.bind(this));
        },

        /*
        * Handle creation of route plan. Add entry to timer pool to 
        * obtain train prediction data for route. 
        */
        handleLoadRoutePlan: function (route) {
            if (this.partialPrediction) {
                this.timerPool.remove(this.partialPrediction);
                this.partialPrediction = null;

                this.routeModel.loadRoute(route);

                return;
            }

            this.routeModel.loadRoute(route);
            this.handleTrainPrediction({scope: this, route: this.routeModel.get('route')});

            this.partialPrediction = this.partial(this.handleTrainPrediction,
                {scope: this, route: this.routeModel.get('route')});

            this.timerPool.register(this.partialPrediction, MetrolController.PREDICTION_INTERVAL);
        },

        /*
        * Call train prediction
        */
        handleTrainPrediction: function (args) {
            args.scope.routeModel.loadPredictions(args.route);
        },

        /*
        * Return partial function
        */
        partial: function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            return function () {
                return fn.apply(this, args);
            };
        }
    };

    MetrolController.PREDICTION_INTERVAL = 1000 * 10;

    return {

        initialize: function () {
            MetrolController.initialize();
        },
    };
});