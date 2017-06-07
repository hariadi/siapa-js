# siapa [![Build Status](https://travis-ci.org/hariadi/siapa-js.svg?branch=master)](https://travis-ci.org/hariadi/siapa-js)

> Malay Name Parser: A simple script for parsing complex Malay names into their individual components.

Parses Malay names into 5 components:
* Title
* First name
* Middle names
* Last names
* Suffixes


## Quick start

Install: `npm install siapa`

An example:
```js
var siapa = require('siapa');
var name = siapa.parse('Dato\' Ir. Dr. Hariadi Hinta')
console.log(name.title, name.first, name.suffixes, name.middle_names, name.last_names)
```


## Contributing
For testing this project uses AVA.js, but AVA.js is **not required** to use this parser. Check out the [Getting Started](https://github.com/avajs/ava) guide to learn more about this futuristic JavaScript test runner .

 1. `git clone https://github.com/hariadi/siapa-js.git`
 2. `cd siapa-js && npm i`
 3. `npm t` or `npm run test`

Thank you.


## Credit
> Many of these name parser logic come from the following repos:

* [Javascript version, by John Griffey](https://github.com/redjohn/name_parser)
* [Python version, by Derek Gulbranson](https://github.com/derek73/python-nameparser)
* [PHP version, by G. Miernicki](http://code.google.com/p/nameparser/)


## Release History
* 2017-06-07	v0.2.0			Remove coffescript, grunt, separated test with ava
* 2013-11-16	v0.1.2			Add more salutations test
* 2013-06-29	v0.1.1			Add test
* 2013-05-09	v0.1.0			First commit
