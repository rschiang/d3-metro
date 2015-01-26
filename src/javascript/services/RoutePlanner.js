define([
    "../utils/PriorityQueue"

], function (
    PriorityQueue

) {
    "use strict";

    function RoutePlanner(args) {
        this.model = args.model;
        this.vertices = {};

        for (var key in this.model) {
            if (this.model.hasOwnProperty(key)) {
                this.vertices[key] = this.model[key];
            }
        }
    }

	RoutePlanner.prototype.planRoute = function (start, finish) {
		var nodes = new PriorityQueue(),
            distances = {},
            previous = {},
            path = [],
            smallest,
            alt;

        if (!this.model[start] || !this.model[finish]) {
            return path;
        }

        for (var vertex in this.vertices) {
			if (vertex === start) {
				distances[vertex] = 0;
				nodes.enqueue(0, vertex);
			} else {
				distances[vertex] = Number.MAX_VALUE;
				nodes.enqueue(Number.MAX_VALUE, vertex);
			}
			previous[vertex] = null;
		}
	
        while (!nodes.isEmpty()) {
            smallest = nodes.dequeue();
            if (smallest === finish) {

                while (previous[smallest]) {
                    path.push({
                        id: this.model[smallest].id,
                        cde: smallest,
                        distance: distances[smallest]
                    });
                    smallest = previous[smallest];
                }

                break;
            }

            if (!smallest || distances[smallest] === Number.MAX_VALUE) {
                continue;
            }

            for (var neighbour in this.vertices[smallest].paths) {
                alt = distances[smallest] + this.vertices[smallest].paths[neighbour];

                if (alt < distances[neighbour]) {
                    distances[neighbour] = alt;
                    previous[neighbour] = smallest;
                    nodes.enqueue(alt, neighbour);
                }
            }
        }

        path.push({
            id: this.model[start].id,
            cde: start,
            distance: 0
        });

        return path;
    };

    return RoutePlanner;
});