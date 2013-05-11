# Malay Name Parser [![Build Status](https://travis-ci.org/hariadi/malay-name-parser.png)](https://travis-ci.org/hariadi/malay-name-parser)

> A simple script for parsing complex Malay names into their individual components.

Parses Malay names into 5 components:
- Title
- First name
- Middle names
- Last names
- Suffixes


## Quick start
For linting and testing this project uses Grunt `~0.4.1`, but Grunt is **not required** to use this parser. Check out the [Getting Started](http://gruntjs.com/getting-started) guide to learn more about Grunt.

`npm install malay-name-parser`

An example:
```js
parser = require('malay-name-parser')
name = parser.parse_malay_name('Dato\' Ir. Dr. Hariadi Hinta')
console.log(name.title, name.first, name.suffixes, name.middle_names, name.last_names)
```


## Credit
> Many of these name parser logic come from the following repos:

* [Javascript version, by John Griffey](https://github.com/redjohn/name_parser)
* [Python version, by Derek Gulbranson](http://code.google.com/p/python-nameparser)
* [PHP version, by G. Miernicki](http://code.google.com/p/nameparser/)


## Release History
* 2013-05-09	v0.1.0			First commit