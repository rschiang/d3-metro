/* global requirejs:true */
requirejs.config({
    baseUrl: '.',
    paths: {
        d3: '../../bower_components/d3/d3',
        d3fisheye: '../../bower_components/d3.fisheye/fisheye/fisheye'
    }
});

requirejs([
    'd3',
    'd3fisheye'
]);
