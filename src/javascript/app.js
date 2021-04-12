/* global requirejs:true */
requirejs.config({
    baseUrl: '.',
    paths: {
        d3: '../../node_modules/d3/d3',
        d3fisheye: '../../node_modules/d3-fisheye/build/d3-fisheye'
    }
});

requirejs([
    'd3',
    'd3fisheye'
]);
