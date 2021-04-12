# d3-metro

Metro map implemented using [d3.js](https://d3js.org/) force directed diagram.

This is a fork of the original [d3metro](https://github.com/davidctaylor/d3metro) project, which was an experimental project that allows the selection and display of planned routes, train prediction and, the very approximate location of predicted trains within Washington DC's WMATA Metro network. Much of the work done on the fork is primarily modernizing project dependencies and, as the ultimate purpose of this fork, repurposing the project with Taipei Metro system’s data, in order to get a good glimpse into the power of abstraction.

Usage
-----
Click on Metro stations to display or reset planned routes.

General
-------
This project has been developed (almost) entirely with HTML SVG elements and the D3.js Javascript library. The primary layout has been implemented as a D3 force directed diagram that takes advantage of the collision detection and fisheye functionality.


Online Demo
-----------
<https://rschiang.github.io/d3-metro/>

License
-------

Released under [ISC License](LICENSE.md), as the original project [is](https://github.com/davidctaylor/d3metro/blob/master/package.json#L6).
