define([
    '../utils/bezierPoints',
    '../utils/svgUtils',
    'd3'

], function (
    bezier,
    d3Metro,
    d3

) {
    'use strict';

    var RouteView = {
        alpha: 1,
        width: 0,
        height: 0,

        /*
        * Initialize sidebar to display route prediction data.
        * Registor for route model updates.
        */
        initialize: function (args) {
            this.width = args.width;
            this.height = args.height;
            this.modelMap = args.modelMap;
            this.modelRoute = args.modelRoute;
            this.container = args.container;
            this.lastPrediction = [];

            this.offset = this.width - (this.width / 100) * RouteView.config.VIEW_OFFSET;

            this.line = d3.svg.line()
                    .x(function (d) {
                        return d.x;
                    })
                    .y(function (d) {
                        return d.y;
                    });

            this.modelRoute.on('update', this.handleUpdate, this);
            this.modelRoute.on('update:route', this.renderRoutePlan, this);
        },

        /*
        * Create main dom elements
        */
        render: function () {
            this.svg = d3.select('#metroRoute')
                .append('svg')
                .classed('metro-route-view-svg', true)
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', '0 0 ' + this.width + ' ' + this.height);

            this.svg.append('g')
                .classed('metro-route-plan', true);

            this.sideBar = this.svg.append('g')
                .style('opacity', 0)
                .classed('metro-route-sidebar', true);

            this.ordinalY = d3.scale.ordinal()
                .domain(d3.range(RouteView.config.MAX_PREDICTIONS + 2))
                .rangePoints([RouteView.config.PADDING_TOP,
                    (25 * (RouteView.config.MAX_PREDICTIONS))]);

            this.sideBar.append('g')
                .classed('metro-route-predictions', true)
                .call(this.heading.bind(this),
                    {y: this.ordinalY(0),
                    text: 'Departing: ',
                    className: 'heading-predictions'});

            this.sideBar.append('g')
                .classed('metro-route-plan-heading', true)
                .call(this.heading.bind(this),
                    {y: this.ordinalY(RouteView.config.MAX_PREDICTIONS + 1) + RouteView.config.PADDING_TOP,
                    text: 'Route',
                    className: 'heading-route'});

            this.sideBar.transition()
                .duration(1)
                .attr('transform', 'translate(' + [this.width, RouteView.config.PADDING_TOP] + ')')
                .each('end', function () {
                    d3.select(this)
                        .style('opacity', 1);
                });
        },

        handleUpdate: function () {
            this.sideBar.transition()
                .duration(250)
                .attr('transform', 'translate(' +
                    [(((this.modelRoute.get('route')) ? this.modelRoute.get('route').length : 0) ?
                        this.offset : this.width), RouteView.config.PADDING_TOP] + ')');

            this.renderPredictions();
        },

       /*
        * Display prediction data in sidebar
        */
        renderPredictions: function () {
            var _this = this,
                predictions = _this.modelRoute.get('predictions'),
                data = (predictions.data) ? predictions.data.splice(0, RouteView.config.MAX_PREDICTIONS) : [],
                elem;

            if (predictions.status !== 'success' && typeof _this.lastPrediction !== 'undefined') {
                return;
            }

            elem = _this.svg.select('.metro-route-predictions')
                .selectAll('.metro-route-prediction')
                .data(data);

            elem.enter()
                .append('g')
                .classed('metro-route-prediction', true);

            elem.each(function (d, idx) {
                    var node = d3.select(this),
                        last = _this.lastPrediction[idx],
                        y = _this.ordinalY(idx + 1);

                    if (!last || last.lne !== d.lne) {
                        node.append('circle')
                            .attr('r', RouteView.config.RADIUS)
                            .attr('class', function (d) {
                                return 'line ' + d.lne;
                            })
                            .attr('cx', RouteView.config.RADIUS)
                            .attr('cy', y);
                    }

                    if (!last || last.min !== d.min) {
                        node.call(_this.handleTextUpdate.bind(_this), {
                            x: RouteView.config.RADIUS + RouteView.config.PADDING * 2,
                            y: y + RouteView.config.RADIUS,
                            text:  (isNaN(d.min) ? d.min : d.min + ' min(s)'),
                            className: 'arrival'
                        });
                    }

                    if (!last ||
                        _this.modelMap.get('nodes')[last.id].nme !==
                        _this.modelMap.get('nodes')[d.id].nme) {
                        node.call(_this.handleTextUpdate.bind(_this), {
                            x: 60,
                            y: y + RouteView.config.RADIUS,
                            text: _this.modelMap.get('nodes')[d.id].nme,
                            className: 'destination'
                        });
                    }
                });

            elem.call(_this.remove);
            _this.lastPrediction = data;
        },

        /*
        * Display stations in route plan
        */
        renderRoutePlan: function () {
            var _this = this,
                bz = bezier().on('tick', _this.tick.bind(this)),
                y = d3.scale.ordinal(),
                h = (_this.modelRoute.get('route').length * RouteView.config.ELEMENT_HEIGHT) +
                    _this.ordinalY(RouteView.config.MAX_PREDICTIONS) + RouteView.config.PADDING_TOP * 2;

            _this.svg.select('.heading-predictions')
                .text(function () {
                    var id = (_this.modelRoute.get('route')[0]) ? _this.modelRoute.get('route')[0].id : null;
                    return 'Departing: ' + ((id) ? _this.modelMap.get('nodes')[id].nme : '');
                });

            h = (h > _this.height) ? _this.height : h;
            y.domain(d3.range(_this.modelRoute.get('route').length))
                .rangePoints([_this.ordinalY(RouteView.config.MAX_PREDICTIONS) +
                    RouteView.config.PADDING_TOP * 2, h], 1);

            _this.generateRouteLinks();
            _this.routeLinks = _this.svg.select('.metro-route-plan')
                .selectAll('.link')
                .data(_this.routeLinks);

            _this.routeLinks
                .enter()
                .append('line')
                .classed('link', true);

            _this.routeNodes = _this.svg.select('.metro-route-plan')
                .selectAll('.entry')
                .data(_this.modelRoute.get('route'));

            _this.routeNodes
                .enter()
                .append('g')
                .classed('entry', true);

            _this.routeNodes.each(function (d, idx) {
                    var node = d3.select(this);

                    d.p0 = {x: d.x, y: d.y};
                    d.p1 = {x: d.x, y: d.y};
                    d.p2 = {x: _this.offset, y: _this.height * 1.1};
                    d.p3 = {x: _this.offset  + RouteView.config.RADIUS, y: y(idx)};

                    d.lne.forEach(function (lne, idx) {
                        node.append('circle')
                            .attr('class', 'entry ' + lne)
                            .attr('r', RouteView.config.RADIUS)
                            .attr('class', function () {
                                return 'line ' + lne;
                            })
                            .attr('cx', function () {
                                if (d.lne.length === 1) {
                                    return 0;
                                }
                                var x = (RouteView.config.RADIUS / 3) * 2;
                                return (idx === 1) ? -1 * x : x;
                            });
                    });

                    node.append('text')
                        .text(function (d) {
                            return _this.modelMap.get('nodes')[d.id].nme;
                        })
                        .attr('dx', RouteView.config.RADIUS + RouteView.config.PADDING)
                        .attr('dy', RouteView.config.RADIUS / 2);
                });

            bz.points(_this.modelRoute.get('route'));
            bz.start();

            _this.routeNodes.call(_this.remove);
            _this.routeLinks.call(_this.remove);
        },

        /*
        * Create links connecting route points.
        * Set the initial x,y position of station based on current map position
        */
        generateRouteLinks: function () {
            var i = -1,
                r = this.modelRoute.get('route'),
                m = this.modelMap.get('nodes'),
                l = r.length;

            this.routeLinks = [];
            while (++i < l) {
                r[i].x = m[r[i].id].x;
                r[i].y = m[r[i].id].y;
                if (i < l - 1) {
                    this.routeLinks.push({'source': r[i], 'target': r[i + 1]});
                }
            }
        },

        /*
        * transition callback for route plan
        */
        tick: function () {
            this.routeLinks
                .attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; });

            this.routeNodes
                .transition()
                .duration(1)
                .attr('transform', function (d) {
                    return 'translate(' + [d.x, d.y] + ')';
                });
        },

        heading: function (node, args) {
            node.append('text')
                .text(args.text)
                .classed(args.className, true)
                .attr('y', args.y)
                .attr('text-decoration', 'underline');
        },

        appendText: function (node) {
            node.append('text')
                .text(function (d) {
                    return d.msg;
                })
                .classed('metro-text', true)
                .transition()
                .duration(2000)
                .style('opacity', '1')
                .attr('x', function (d) {
                    return d.x;
                })
                .attr('y', function (d) {
                    return d.y;
                });
        },

        transitionShape: function (node) {
            node.transition()
                .duration(2000)
                .style('fill-opacity', '1')
                .attrTween('stroke-dasharray', function () {
                    var l = node.node().getTotalLength(),
                        i = d3.interpolateString('0,' + l, l + ',' + l);
                    return function (t) {
                        return i(t);
                    };
                });
        },

        getCharPositions: function (node, args) {
            var pos,
                result = [],
                i = -1,
                l = 0,
                text;

            text = node.append('text')
                    .text(args.text)
                    .classed(args.className, true)
                    .attr('x', args.x)
                    .attr('y', args.y)
                    .style('opacity', '0');

            l = text.node().getNumberOfChars();

            while (++i < l) {
                pos = text.node().getStartPositionOfChar(i);
                result.push({x: pos.x, y: pos.y, c: i});
            }

            text.remove();

            return result;
        },

        /*
        * Convieniance cleanup function
        */
        remove: function () {
            this.exit()
                .transition()
                .duration(250)
                .style('opacity', 0)
                .remove();
        },

       /*
        * Remove any existing text by class before creating new text elements
        *
        * Break down text to seperate text elements, allowing transitions to
        * be performed for each character in string.
        */
        handleTextUpdate: function (node, args) {
            var scale = 10,
                charPos;

            node.selectAll('.' + args.className)
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .attr('transform', function (d) {
                    return 'scale(' + (-1 * (1 / scale)) + ', 1) ' +
                        'translate(' + (-1 * (d.x * scale)) + ',' + d.y + ')';
                })
                .each('end', function () {
                    this.remove();
                });

            charPos = this.getCharPositions(node, args);
            node.selectAll('g')
                .data(charPos, function (d, i) {
                    if (!d) {
                        return d;
                    }
                    d.c = args.text[i];
                    return d.c + i;
                })
                .enter()
                .append('text')
                .text(function (d) {
                    return d.c;
                })
                .attr('class', args.className)
                .attr('transform', function (d) {
                    return 'scale(' + (-1 * (1 / scale)) + ', 1) translate(' + (-1 * (d.x * scale)) + ',' + d.y + ')';
                })
                .style('opacity', 0)
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .style('opacity', 1)
                .attr('transform', function (d) {
                    return 'scale(1, 1) translate(' + d.x + ', ' + d.y + ') scale(1, 1)';
                });
        }
    };

    RouteView.config = {
        'VIEW_OFFSET': 20,
        'RADIUS': 7,
        'PADDING_LEFT': 0,
        'PADDING_RIGHT': 14,
        'PADDING': 7,
        'PADDING_TOP': 7,
        'ELEMENT_HEIGHT': 35,
        'MAX_PREDICTIONS' : 3
    };

    return {
        initialize: function (args) {
            RouteView.initialize(args);
        },
        render: function () {
            RouteView.render();
        }
    };
});
