define([
    './MetroModel',
    '../services/MetroServices',
    '../utils/Model'

], function (
    MetroModel,
    metroServices,
    Model

) {
    'use strict';

    var ModelUtils = {
        mapCenter: {x: 0, y: 0},
        mapHeight: 0,
        mapWidth: 0,

        initialize: function (args) {
            this.mapHeight = args.height;
            this.mapWidth = args.width;

            this.initMapCenter();
        },

        buildMap: function () {
            MetroModel.nodes.forEach(function (entry) {
                entry.x = this.convertLon(entry.lon);
                entry.y = this.convertLat(entry.lat);
            }.bind(this));

            return {'nodes': MetroModel.nodes, 'links': MetroModel.links};
        },

 
        initMapCenter: function () {
            this.mapCenter.x = (Math.floor(((180.0 + MetroModel.mapCenter.lon) / 360.0) *
                ModelUtils.MERCATOR_OFFSET));
            
            var latRads = MetroModel.mapCenter.lat * Math.PI / 180;
            this.mapCenter.y =
                (Math.floor(
                    (1 - Math.log(Math.tan(latRads) + 1 / Math.cos(latRads)) / Math.PI) /
                        2 * ModelUtils.MERCATOR_OFFSET));
        },

        convertLat: function (lat) {
            var latRads = lat * Math.PI / 180;
            var y = (Math.floor(
                (1 - Math.log(Math.tan(latRads) + 1 / Math.cos(latRads)) / Math.PI) /
                    2 * ModelUtils.MERCATOR_OFFSET));

            y = y - (this.mapCenter.y - (this.mapHeight / 2));
            return y;
        },
    
        convertLon: function (lon) {
            var x = (Math.floor(((180.0 + lon) / 360.0) * ModelUtils.MERCATOR_OFFSET));
            return x - (this.mapCenter.x - (this.mapWidth / 2));
        }
    };

    ModelUtils.ZOOM_LEVEL = 7;
    ModelUtils.MERCATOR_OFFSET = 268435456;
    ModelUtils.MERCATOR_OFFSET >>= ModelUtils.ZOOM_LEVEL;
    ModelUtils.RADIUS = ModelUtils.MERCATOR_OFFSET / Math.PI;

    ModelUtils.FEET_PER_MINUTE = 1.46667 * 33 * 60; // @33 mph

    return Model.inherits({
        initialize: function (args) {
            ModelUtils.initialize(args);
            this.set(ModelUtils.buildMap(args));
        }
    });
});