# Malay Name Parser [![Build Status](https://travis-ci.org/hariadi/siapa.png)](https://travis-ci.org/hariadi/siapa)

> A simple script for parsing complex Malay names into their individual components.

Parses Malay names into 5 components:
- Title
- First name
- Middle names
- Last names
- Suffixes


## Quick start

Install: `npm install https://github.com/hariadi/siapa/tarball/master`

An example:
```js
parser = require('siapa')
name = parser.parse_malay_name('Dato\' Ir. Dr. Hariadi Hinta')
console.log(name.title, name.first, name.suffixes, name.middle_names, name.last_names)
```


## Contributing
For linting and testing this project uses Grunt `~0.4.1`, but Grunt is **not required** to use this parser. Check out the [Getting Started](http://gruntjs.com/getting-started) guide to learn more about Grunt.

 1. `git clone https://github.com/hariadi/siapa.git`
 2. `cd siapa && npm install`
 3. `grunt`

Thank you.


## Credit
> Many of these name parser logic come from the following repos:

* [Javascript version, by John Griffey](https://github.com/redjohn/name_parser)
* [Python version, by Derek Gulbranson](http://code.google.com/p/python-nameparser)
* [PHP version, by G. Miernicki](http://code.google.com/p/nameparser/)


## Release History
* 2013-06-29	v0.1.1			Add test
* 2013-05-09	v0.1.0			First commit