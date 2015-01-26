define([
    '../utils/svgUtils',
    'd3'
    
], function (
    svgUtils,
    d3

) {
    'use strict';

    return {

        initialize: function () {
            this.svg = d3.select('.metro-map-view-svg');

            var node = this.svg.append('g')
                .classed('menu-options', true)
                .on('click', this.click);

            var y = 0;
            var rect = svgUtils()
                    .x(8)
                    .y(y)
                    .width(25)
                    .height(3)
                    .radius(1.5);

            for (var i = 0; i < 3; i += 1) {
                node.append('path')
                    .attr('d', rect.y(y += 6)())
                    .style('fill', 'none')
                    .style('stroke', 'black')
                    .style('stroke-width', 0.5)
                    .call(this.transitionShape, this);
            }

            d3.select('.metro-map-detail .close')
                .on('click', this.click);
        },

        click: function () {
            var d = d3.select('.metro-map-detail');
            d.classed('active', d3.select('.metro-map-detail.active').empty());
        },

        transitionShape: function (node) {
            node.transition()
                .style('fill-opacity', '0')
                .duration(500)
                .attrTween('stroke-dasharray', function () {
                    var l = node.node().getTotalLength(),
                        i = d3.interpolateString('0,' + l, l + ',' + l);
                    return function (t) {
                        return i(t);
                    };
                })
                .each('end', function () {
                    node.transition()
                        .duration(1500)
                        .style('fill', 'black')
                        .style('fill-opacity', '1');
                });
        }
    };
});