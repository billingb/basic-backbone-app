r Sample Backbone Application

Basic applicaiton demonstrating backbone, chai/mocha, sass and Grunt.

# Setup

## Prerequisites
* [Node](http://nodejs.org/)
** Sould provide npm as well
* [Grunt](http://gruntjs.com/) (>= v0.4

## Getting Started
* Install all node modules: `npm install`
* Install all JS dependencies: `bower install` (if using local modules will be `${PROJECT_DIR}/node_modules/.bin/bower update`)

## Source files 

* CSS files are generated dynamically from SASS files. Do not edit them
  directly!

## Useful Grunt tasks

* 'grunt watch:unit' - this will run lint (JSHint) and the unit tests whenever a spec or source file is changed. Also generates css files whenever the scss files are changed.
* 'grunt lint unit' - runs the lint tool (JSHint) and the unit tests.
* 'grunt style' - runs the sass to css compilation
* 'grunt dist' - prepare the code for distribution and puts it into the dist directory.
* 'grunt package' - grunt dist and then compress the directory into a tarball.
* 'grunt run' - run a local port 3000 web server serving the files 'http://localhost:3000/'. Use as `grunt run --connect_base=.` to run from root directory and navigate to 'http://localhost:3000/build/spec/unit/mocha.html' to run the tests in the browser for browser debugging.
