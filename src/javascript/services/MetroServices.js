/*
* Wrapper Module for interacting with WMATA API's. Currently just making calls for 
* train predictions.
*/
define([
    '../utils/Ajax'

], function (
    ajax

) {
    'use strict';

    var MetroServices = {};

    MetroServices.WMATA_KEY = 'jv48qqz457nwk2xrh8fffzjz';
    MetroServices.WMATA_URL = 'https://api.wmata.com';
    MetroServices.WMATA_STATIONS = MetroServices.WMATA_URL + '/Rail.svc/json/JStations';
    MetroServices.WMATA_LINES = MetroServices.WMATA_URL + '/Rail.svc/json/JLines';
    MetroServices.WMATA_PREDICT = MetroServices.WMATA_URL + '/StationPrediction.svc/json/GetPrediction/';
    MetroServices.WMATA_ROUTE = MetroServices.WMATA_URL + '/Rail.svc/json/jPath';

    MetroServices.KEY_STATIONS = 'wmata.stations';

    return {
		predict: function (stationCode) {
			return ajax.request({
				url: MetroServices.WMATA_PREDICT + stationCode + '?api_key=' + MetroServices.WMATA_KEY,
				dataType: 'jsonp'
			});
		}
    };
});