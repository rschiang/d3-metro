define([
    '../views/MetroView',
    '../views/RouteView',
    '../models/MapModel',
    '../models/RouteModel',
    '../utils/Events'

], function (
    metroView,
    routeView,
    MapModel,
    RouteModel,
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

            this.initializeEvents();
            this.initializeModels({
                width: width,
                height: height,
                container: container
            });

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
        * Handle creation of route plan.
        */
        handleLoadRoutePlan: function (route) {
            this.routeModel.loadRoute(route);
        },
    };

    return {

        initialize: function () {
            MetrolController.initialize();
        },
    };
});
