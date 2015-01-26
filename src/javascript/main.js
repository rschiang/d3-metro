define([
    './controllers/MetroController'

], function (
    MetroController
) {
    'use strict';

    var domReady = function () {
		MetroController.initialize();
    };

    if (document.readyState !== 'loading') {
		domReady();
		return;
	}

	document.addEventListener('DOMContentLoaded', function () {
		domReady();
		document.removeEventListener('DOMContentLoaded', this, false);
	}, false);
});