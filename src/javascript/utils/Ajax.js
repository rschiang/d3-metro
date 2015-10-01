/*
* Provide support for http requests
*/
/*global Promise */
define([

], function (

) {
    'use strict';

    var Ajax = {

        /*
        * Simple Ajax support...
        */
        request: function (request) {
            
            request.t = Ajax.config.TIMEOUT;
            request.id = Math.round(100000 * Math.random());
            request.cb = 'cbFn' + request.id;

            return this.promiseRace(new Promise(function (resolve, reject) {
                if (request.dataType === 'jsonp') {
                    this.jsonp(resolve, reject, request);
                } else {
                    this.http(resolve, reject, request);
                }
            }.bind(this)), request);
        },

        /*
        * Looks like WMATA API's are a little buggy and do not always return the expected callback function
        * name. As a result, need a bunch of cleanup code to cleanup script elements
        */
        promiseRace: function (promise, request) {
            function promiseDelayed(request) {
                return new Promise(function (resolve, reject) {
                    setTimeout(reject, request.t);
                });
            }

            return Promise.race([promise, promiseDelayed(request).then(function () {
                // Should never be called
                throw new Error('Request timed out');
            }, function () {
                if (window[request.cb]) {
                    window[request.cb]({error: 'timeout'}, true);
                }
            })]);
        },

        /*
        * JSONP call
        */
        jsonp: function (resolve, reject, request) {
            var doc = window.document,
                elem;

            window[request.cb] = function (response, isError) {
                delete window[request.cb];
                document.head.removeChild(elem);
                return (isError) ? reject(response) : resolve(response);
            };

            elem = doc.createElement('script');

            elem.type = 'text/javascript';
            elem.src = request.url + (request.url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + request.cb;
            elem.id = request.id;
            elem.async = true;
            elem.charset = 'utf-8';

            doc.getElementsByTagName('head')[0].appendChild(elem);
        },

        http: function (resolve, reject, request) {
            var req = new XMLHttpRequest();

            req.timeout = Ajax.config.TIMEOUT;
            req.ontimeout = function() {
                reject('Request timed out');
            }

            req.onreadystatechange = function () {
                if (req.readyState == XMLHttpRequest.DONE) {
                    if (req.status == 200) {
                        try {
                            resolve(JSON.parse(req.responseText));
                        } catch(error) {
                            reject(error);
                        }
                    } else {
                        reject('Invalid response');
                    }
                }
            }

            req.open('GET', request.url, true);
            req.send();
        }
    };

    Ajax.config = {
        'TIMEOUT': 3000
    };

    return {
        request: function (request) {
            return Ajax.request(request);
        }
    };
});