var assert = require('assert');
var siapa = require('..');
var name;

describe('Gelaran DiRaja', function() {
    it('Tuanku Hariadi Hinta', function() {
        name = siapa.parse('Tuanku Hariadi Hinta');
        assert.equal(name.salutation, 'Tuanku');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });
    it('YBhg. Hariadi Hinta', function() {
        name = siapa.parse('YBhg. Hariadi Hinta');
        assert.equal(name.salutation, 'YBhg.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });
});

describe('Nama Malaysia', function() {
    it('Hariadi', function() {
        name = siapa.parse('Hariadi');
        assert.equal(name.first, 'Hariadi');
    });

    it('Hariadi Hinta', function() {
        name = siapa.parse('Hariadi Hinta');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hariadi Bin Hinta', function() {
        name = siapa.parse('Hariadi Bin Hinta');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Mr. Hariadi Bin Hinta', function() {
        name = siapa.parse('Mr. Hariadi Bin Hinta');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Hariadi Bin Hinta Sr', function() {
        name = siapa.parse('Hariadi Bin Hinta Sr');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
        assert.equal(name.suffix, 'Sr');
    });

    it('Mr. Hariadi Bin Hinta Sr.', function() {
        name = siapa.parse('Mr. Hariadi Bin Hinta Sr.');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
        assert.equal(name.suffix, 'Sr.');
    });

    it('Mr. Hariadi Bin Hinta Sr.', function() {
        name = siapa.parse('Mr. Hariadi Bin Hinta Sr.');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
        assert.equal(name.suffix, 'Sr.');
    });

    it('Mister Rogers', function() {
        name = siapa.parse('Mister Rogers');
        assert.equal(name.salutation, 'Mister');
        assert.equal(name.last, 'Rogers');
    });

    it('Doctor Who', function() {
        name = siapa.parse('Doctor Who');
        assert.equal(name.salutation, 'Doctor');
        assert.equal(name.last, 'Who');
    });

    it('Dr. Dre', function() {
        name = siapa.parse('Dr. Dre');
        assert.equal(name.salutation, 'Dr.');
        assert.equal(name.last, 'Dre');
    });

    it('Prof. Dre', function() {
        name = siapa.parse('Prof. Plum');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.last, 'Plum');
    });

    it('Professor Plum', function() {
        name = siapa.parse('Professor Plum');
        assert.equal(name.salutation, 'Professor');
        assert.equal(name.last, 'Plum');
    });
});

describe('Lexical Order', function() {
    it('Hinta,Hariadi', function() {
        name = siapa.parse('Hinta,Hariadi');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi', function() {
        name = siapa.parse('Hinta, Hariadi');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi, Prof.', function() {
        name = siapa.parse('Hinta, Hariadi, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta,Hariadi Bin', function() {
        name = siapa.parse('Hinta,Hariadi Bin');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi Bin', function() {
        name = siapa.parse('Hinta, Hariadi Bin');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi, Prof.', function() {
        name = siapa.parse('Hinta, Hariadi Bin, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });
});