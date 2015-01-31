define([
    './MetroMenu',
    '../utils/Events',
    'd3',
    'd3fisheye'
    
], function (
    MetroMenu,
    events,
    d3

) {
    'use strict';
    
    var MetroView = {
        svg: null,
        links: null,
        nodes: null,
        linkedByIndex: {},

        initialize: function (args) {
            var width = args.width,
                height = args.height;

            this.model = args.modelMap;
            this.modelRoute = args.modelRoute;
            this.w = width;
            this.h = height;

            try {
                this.svg = d3.select(args.container)
                    .append('svg')
                    .classed('metro-map-view-svg', true)
                    .attr('width', '100%')
                    .attr('height', '100%')
                    .attr('preserveAspectRatio', 'xMinYMin meet')
                    .attr('viewBox', '0 0 ' + width + ' ' + (height - 10));

                MetroMenu.initialize();

                this.fisheye = d3.fisheye.circular()
                    .radius(75)
                    .distortion(3);

                var _this = this;
                this.force = d3.layout.force()
                    .size([width, height])
                    .charge(function (d) {
                        return (d.tc === 'm') ? -20 : -20;
                    })
                    .linkStrength(function (d) {
                        return (d.source.tc === 'e' || d.target.tc === '2') ? 1 : 1;
                    })
                    .linkDistance(function (d) {
                        return (d.source.tc === 'm' || d.target.tc === 'm') ?
                            40 : MetroView.config.LINK_DISTANCE;
                    })
                    .gravity(0.02)
                    .on('tick', this.tick.bind(this))
                    .on('end', function () {
                        _this.labels
                            .transition()
                            .duration(1000)
                            .attr('dx', function (d) { return d.dx; })
                            .attr('dy', function (d) { return d.dy; });
                    });

                this.svg.on('mousemove', this.handleMouseMove.bind(this));
                this.modelRoute.on('update:route', this.renderRoutePlan, this);
                this.modelRoute.on('update:predictions', this.renderPredictions, this);

            } catch (err) {
                console.log('error', err);
            }
        },

        render: function () {
            var _this = this;

            this.linkedByIndex = {};

            this.force.nodes(this.model.get('nodes'))
                .links(this.model.get('links'));

            this.links = this.svg.selectAll('.link')
                .data(this.model.get('links'))
                .enter()
                .append('line')
                .attr('class', 'metro-line');

            this.model.get('links').forEach(function (d, idx) {
                _this.linkedByIndex[d.source + ',' + d.target] = idx;
            });
            
            this.nodes = this.svg.selectAll('.node')
                .data(this.model.get('nodes'))
                .enter()
                .append('g')
                .classed('metro-station', true)
                .on('click', this.handleClick())
                .classed('fixed', function (d) {
                    d.fixed = false;
                });

            this.addStations();
            
            this.labels = this.svg.selectAll('.station-name');

            this.force.start();
        },

        renderRoutePlan: function () {
            var plan = this.modelRoute.get('route');

            plan.forEach(function (entry, idx) {
                this.activateNode(entry.id);
                if ((idx + 1) > plan.length - 1) {
                    return false;
                }
                
                var lIdx = this.getLinkIndex(entry, plan[idx + 1]);

                if (lIdx > -1) {
                    this.activateLink(lIdx, entry.lne);
                }
            }.bind(this));
        },

        addStations: function () {
            var _this = this;
            this.nodes.each(function (d) {
                var node = d3.select(this),
                    stationPos = 360 / d.cds.length;

                node.append('circle')
                        .attr('r', 6)
                        .attr('class', 'container');

                d.cds.forEach(function (codes, idx) {
                    var lne = codes.split('-')[0],
                        angle = (stationPos * idx) * Math.PI / 180;
                    node.append('circle')
                        .attr('class', 'entry ' + lne)
                        .attr('r', MetroView.config.RADIUS)
                        .attr('cx', function () {
                            if (d.cds.length === 1) {
                                return 0;
                            }
                            if (d.cds.length < 4) {
                                return (MetroView.config.RADIUS - 2) * Math.cos(angle);
                            }
                            return MetroView.config.RADIUS * Math.cos(angle);
                        })
                        .attr('cy', function () {
                            if (d.cds.length === 1) {
                                return 0;
                            }
                            return MetroView.config.RADIUS * Math.sin(angle);
                        });
                });
                
                node.append('text')
                    .text(function (d) {
                        return d.nme;
                    })
                    .attr('class', function (d) {
                        if (d.tc === 'm' || d.tc === 'e') {
                            return 'station-name main';
                        }
                        return 'station-name';
                    });

                d.isActive = false;
                d.height = this.getBBox().height;
                d.width = this.getBBox().width;
                d.dx = 0;
                d.dy = 0;

                _this.labelPosition(d);
            });
        },

        tick: function () {
            this.links
                .attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; });

            this.nodes
                .attr('transform', function (d) {
                    return 'translate(' + [d.x, d.y] + ')';
                });

            this.labels
                .each(this.collide())
                .each(function () {
                    if (this.className.baseVal.indexOf('active') < 0) {
                        d3.select(this)
                            .transition()
                            .each('start', function () {
                                d3.select(this).classed({active: true});
                            })
                            .each('end', function () {
                                d3.select(this).classed({active: false});
                            })
                            .duration(1000)
                            .attr('a', function (d) { return d.angle; })
                            .attr('dx', function (d) {
                                return d.dx;
                            })
                            .attr('dy', function (d) { return d.dy; });
                    }
                });
        },

        /*
        * Mouse click handler. Sets station to an active/inactive state
        * Emits route display message based on the number active stations
        *
        */
        handleClick: function () {
            var _this = this,
                active = [];

            return function (d) {
                var i,
                    e,
                    node = d3.select(this);

                _this.force.stop();

                _this.resetPrediction();
                _this.resetRoutePlan();

                if (d.isActive) {
                    i = active.length;
                    while (i--) {
                        if (active[i].data()[0].id === d.id) {
                            active.splice(i, 1);
                        }
                    }
                    d.isActive = false;
                    
                    events.emit('map-route');

                    node.selectAll('circle')
                        .call(_this.activateStation);
                    
                    return;
                }

                if (active.length >= 2) {
                    
                    events.emit('map-route');

                    i = active.length;
                    while (i--) {
                        e = active[i];
                        e.data()[0].isActive = false;
                        e.selectAll('circle')
                                .call(_this.activateStation);
                        active.splice(i, 1);
                    }
                }

                d.isActive = true;
                active.unshift(node);

                node.selectAll('circle')
                    .call(_this.activateStation);

                if (active.length === 2) {
                    events.emit('map-route', {
                        from: active[0].data()[0].cds,
                        to: active[1].data()[0].cds
                    });
                }
            };
        },

        /*
        * Handle fisheye transforms to station and prediction elements.
        */
        handleFisheye: function (node) {
            node.each(function (d) {
                d.fisheye = this.fisheye(d);
            }.bind(this))
            .attr('transform', function (d) {
                return 'translate(' + [d.fisheye.x, d.fisheye.y] + ')';
            })
            .attr('r', function (d) { return d.fisheye.z * 4.5; });
        },

        /*
        * Handle mouse move event for fisheye...
        */
        handleMouseMove: function () {
            this.fisheye.focus(d3.mouse(d3.select('#metroMap').node()));

            this.nodes
                .call(this.handleFisheye.bind(this));

            this.svg.selectAll('.metro-prediction')
                .call(this.handleFisheye.bind(this));

            this.links
                .attr('x1', function (d) { return d.source.fisheye.x; })
                .attr('y1', function (d) { return d.source.fisheye.y; })
                .attr('x2', function (d) { return d.target.fisheye.x; })
                .attr('y2', function (d) { return d.target.fisheye.y; });
        },

        getLinkIndex: function (curr, next) {
            var idx = this.linkedByIndex[curr.id + ',' + next.id];
            if (typeof idx === 'undefined') {
                idx = this.linkedByIndex[next.id + ',' + curr.id];
            }

            if (typeof idx === 'undefined') {
                return -1;
            }

            return idx;
        },

        activateNode: function (idx) {
            d3.select(this.nodes[0][idx])
                .attr('class', 'metro-station active');
        },

        activateStation: function (station) {
            station.transition()
                .duration(MetroView.config.TRANSITION_DURATION)
                .attr('r', function (d) {
                    return d.isActive ? MetroView.config.RADIUS_ACTIVE :
                        MetroView.config.RADIUS;
                })
                .each(function () {
                    var circle = d3.select(this);
                    circle.transition()
                    .attr('cx', function (d) {
                        return (d.isActive) ? circle.attr('cx') * 2 : circle.attr('cx') / 2;
                    })
                    .attr('cy', function (d) {
                        return (d.isActive) ? circle.attr('cy') * 2 : circle.attr('cy') / 2;
                    });
                });
        },

        activateLink: function (idx, line) {
            d3.select(this.links[0][idx])
                .attr('class', 'metro-line active ' + line);
        },

        resetRouteLinks: function () {
            d3.selectAll('.metro-line.active')
                .attr('class', 'metro-line');
        },

        resetRoutePlan: function () {
            d3.selectAll('[class^=metro].active')
                .attr('class', function () {
                    var node = d3.select(this),
                        cls = node.attr('class').split(' ');
                    return cls[0];
                });
        },

        resetPrediction: function () {
            this.svg.selectAll('[class^=metro-prediction]').remove();
        },
 
        /*
        * Resolves collisions for train station label positioning
        */
        collide: function () {
            var _this = this,
                quadtree = d3.geom.quadtree(this.model.get('nodes'));

            return function (d) {
                var nx1 = d.x,
                    nx2 = d.x + d.dx + d.width,
                    ny1 = d.y,
                    ny2 = d.y + d.dy + d.height;
                
                quadtree.visit(function (quad, x1, y1, x2, y2) {
                    if (quad.point && quad.point !== d && _this.overlap(d, quad.point)) {
                        _this.labelPosition(d);
                        _this.labelPosition(quad.point);
                    }

                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
            };
        },

        labelPosition: function (d) {
            var padding = 0,
                a = [0, 45, 90, 135, 180, 225, 270, 315],
                r = (d.cds.length > 1) ? MetroView.config.RADIUS * 1.5 :
                    MetroView.config.RADIUS;

            r = MetroView.config.RADIUS;
            d.angle = (typeof d.angle !== 'undefined') ? (d.angle + 45) % 360 :
                d.angle = a[Math.floor(Math.random() * a.length)];

            d.dx = r + padding * Math.cos(d.angle * Math.PI / 180);
            d.dy = r + padding * Math.sin(d.angle * Math.PI / 180);

            switch (d.angle) {
            case 0:
                d.dy = d.height / 2;
                break;
            
            case 45:
                d.dy = -1 * d.dy;
                break;

            case 90:
                d.dx += -1 * ((d.width - (r + padding)) / 2);
                d.dy = -1 * d.dy;
                break;
            
            case 135:
                d.dx = -1 * d.width;
                break;
            
            case 180:
                d.dx += -1 * (d.width + padding);
                break;
            
            case 225:
                d.dx += -1 * d.width;
                break;
            
            case 270:
                d.dx += -1 * d.width - (r + padding);
                break;
            
            case 315:
                break;
            }
        },

        /*
        * Determine if station labels overlap....
        */
        overlap: function (a, b) {
            return (a.x + a.dx < b.x + b.dx + b.width && a.x + a.dx + a.width > b.x + b.dx &&
                a.y + a.dy < b.y + b.dy + b.height && a.y + a.dy + a.height > b.y + b.dy);
        },

        /*
        * Just for fun....
        * Calculate and display the location of train on map. The only information available from 
        * WMATA is the time in minutes from a given station.
        * The distance between station is known, an average speed is assumed, together with
        * a fixed station stop time. Based on these factors a very rough approximation a trains
        * location within the system can be determined.
        */
        renderPredictions: function () {
            var _this = this,
                nodes = this.model.get('nodes'),
                active = [],
                predictions = this.modelRoute.get('predictions');

            if (!predictions || predictions.status !== 'success' || !predictions.data.length) {
                return;
            }

            this.resetPrediction();
            
            predictions.data.forEach(function (prediction, idx) {
                var dist = 0,
                    prev = (prediction.prev) ? nodes[prediction.prev.id] : null,
                    curr = (prediction.curr) ? nodes[prediction.curr.id] : null;

                if (!prev && !curr) {
                    return true;
                }

                dist = (prediction.fromStation / prediction.nextStation * 100) *
                    MetroView.config.LINK_DISTANCE / 100;

                var obj = (!prev) ? curr : _this.predictionPosition(prev, curr, dist);
                obj.idx = idx;
                obj.min = prediction.min;
                obj.cde = prediction.cde;
                obj.lne = prediction.lne;
                active.push(obj);

            });

            this.svg.selectAll('.metro-prediction')
                .data(active)
                .enter()
                .append('g')
                .attr('class', function (d) {
                    return 'metro-prediction ' + d.lne;
                })
                .attr('x', function (d) {
                    return d.x;
                })
                .attr('y', function (d) {
                    return d.y;
                })
                .attr('transform', function (d) {
                    return 'translate(' + [d.x, d.y] + ')';
                })
                .each(function () {
                    var node = d3.select(this);
                    node.append('circle')
                        .style('opacity', 0)
                        .attr('r', 1)
                        .transition()
                        .attr('r', MetroView.config.RADIUS + 1)
                        .style('fill', 'black')
                        .style('opacity', 0.25);

                    var circle = node.append('circle')
                        .style('opacity', 0)
                        .attr('r', MetroView.config.RADIUS)
                        .style('opacity', 1);
                    
                    (function repeat(r) {
                        if (!circle) {
                            return;
                        }

                        circle
                            .attr("r", function () {
                                return (r === MetroView.config.RADIUS) ?
                                    MetroView.config.RADIUS / 2 : MetroView.config.RADIUS;
                            })
                            .transition()
                            .duration(2000)
                            .ease('linear')
                            .attr('r', function () {
                                return (r === MetroView.config.RADIUS) ?
                                    MetroView.config.RADIUS : MetroView.config.RADIUS / 2;
                            })
                            .each('end', function () {
                                repeat((r === MetroView.config.RADIUS / 2) ?
                                    MetroView.config.RADIUS : MetroView.config.RADIUS / 2);
                            });
                    })(circle.attr('r'));
                });
        },

        predictionPosition: function (p1, p2, dist) {
            var angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x));

            return {
                x: p1.x + (dist * Math.cos(angle)),
                y: p1.y + (dist * Math.sin(angle))
            };
        }
    };

    MetroView.config = {
        'RADIUS': 5,
        'RADIUS_ACTIVE': 10,
        'TRANSITION_DURATION': 125,
        'PREDICTION_DURATION': 3000,
        'PREDICTION_DELAY': 1000,
        'LINK_DISTANCE': 20
    };

    return {
        initialize: function (args) {
            MetroView.initialize(args);
        },
        render: function () {
            MetroView.render();
        }
    };
});