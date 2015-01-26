define([
    './Events',

], function (
    Events

) {
    'use strict';

    var extend = function (obj) {
        if (typeof obj !== 'function' && typeof obj !== 'object' && !!obj) {
            return obj;
        }

        var i = -1,
            l =  arguments.length,
            source, prop;

        while (++i < l) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }

        return obj;
    };

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var inherits = function (protoProps, staticProps) {
        var parent = this,
            child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.

        //return obj != null && hasOwnProperty.call(obj, key);
        if (protoProps &&  hasOwnProperty.call(protoProps, 'constructor')) {//_.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }

        // Add static properties to the constructor function, if supplied.
        extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function () {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) {
            extend(child.prototype, protoProps);
        }

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    var Model = function (attrs) {
        this.attributes = {};
        this.set(attrs);
        this.initialize.apply(this, arguments);
    };

    extend(Model.prototype, Events, {
        initialize: function () {},

        set: function (key, val) {
            var attr,
                attrs,
                changes = [],
                options;
            
            if (key === null) {
                return this;
            }

            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }

            // For each `set` attribute, update or delete the current value.
            for (attr in attrs) {
                val = attrs[attr];
                if (this.attributes[attr] !== val) {
                    changes.push(attr);
                } else {
                    //delete this.changed[attr];
                }
                this.attributes[attr] = val;
            }

            var i = -1,
                l = changes.length;
            while (++i < l) {
                this.emit('update:' + changes[i], this, this.attributes[changes[i]]);
            }

            this.emit('update', this, options);
            
            return this;
        },

        get: function (attr) {
            return this.attributes[attr];
        }
    });

    Model.inherits = inherits;

    return Model;
});