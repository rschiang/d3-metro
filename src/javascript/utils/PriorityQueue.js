define([

], function (

) {
    "use strict";

    var PriorityQueue = function PriorityQueue() {
        this._pQueue = [];
    };
        
    PriorityQueue.prototype.enqueue = function (priority, key) {
        this._pQueue.push({key: key, priority: priority });
        this.sort();
    };

	PriorityQueue.prototype.dequeue = function () {
		return this._pQueue.shift().key;
	};
		
	PriorityQueue.prototype.sort = function () {
		this._pQueue.sort(function (a, b) {
			return a.priority - b.priority;
		});
	};

	PriorityQueue.prototype.pop = function () {
		return this._pQueue.pop();
	};

	PriorityQueue.prototype.last = function () {
		return this._pQueue[this._pQueue.length - 1];
	};
		
	PriorityQueue.prototype.isEmpty = function () {
		return !this._pQueue.length;
	};

	PriorityQueue.prototype.length = function () {
		return this._pQueue.length;
	};

	return PriorityQueue;
});