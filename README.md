# Malay Name Parser [![Build Status](https://travis-ci.org/hariadi/malay-name-parser.png)](https://travis-ci.org/hariadi/malay-name-parser)

> A simple script for parsing complex Malay names into their individual components.

Parses Malay names into 5 components:
- Salutation
- First name
- Middle names
- Last names
- Suffixes

## Quick start

Install: `npm install siapa`

```js
var siapa = require('siapa');

var nama = siapa.parse('En. Hariadi Bin Hinta');

console.log(nama.salutation); // En.
console.log(nama.first); // Hariadi
console.log(nama.middle); // Bin
console.log(nama.last); // Hinta
```

## Support for all kinds of names

```js
var name = siapa.parse('Hariadi Hinta');
console.log(name.first); // Hariadi
console.log(name.last); // Hinta

name = siapa.parse('Dr. Hariadi');
console.log(name.salutation); // Dr.
console.log(name.last); // Hariadi

name = siapa.parse('Hariadi');
console.log(name.first); // Hariadi
```
## Credit
> Many of these name parser logic come from the following repos:

* [Javascript version, by John Griffey](https://github.com/redjohn/name_parser)
* [Python version, by Derek Gulbranson](http://code.google.com/p/python-nameparser)
* [PHP version, by G. Miernicki](http://code.google.com/p/nameparser/)


## Release History
* 2013-06-29	v0.1.1			Add test
* 2013-05-09	v0.1.0			First commit
