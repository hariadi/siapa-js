var assert = require('assert');
var siapa = require('..');

describe('Nama Malaysia', function() {
    it('Hariadi', function() {
        var name = siapa.parse('Hariadi');
        assert.equal(name.first, 'Hariadi');
    });

    it('Hariadi Hinta', function() {
        var name = siapa.parse('Hariadi Hinta');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hariadi Bin Hinta', function() {
        var name = siapa.parse('Hariadi Bin Hinta');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Mr. Hariadi Bin Hinta', function() {
        var name = siapa.parse('Mr. Hariadi Bin Hinta');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Hariadi Bin Hinta Sr', function() {
        var name = siapa.parse('Hariadi Bin Hinta Sr');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
        assert.equal(name.suffix, 'Sr');
    });

    it('Mr. Hariadi Bin Hinta Sr.', function() {
        var name = siapa.parse('Mr. Hariadi Bin Hinta Sr.');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
        assert.equal(name.suffix, 'Sr.');
    });

    it('Mr. Hariadi Bin Hinta Sr.', function() {
        var name = siapa.parse('Mr. Hariadi Bin Hinta Sr.');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
        assert.equal(name.suffix, 'Sr.');
    });

    it('Mister Rogers', function() {
        var name = siapa.parse('Mister Rogers');
        assert.equal(name.salutation, 'Mister');
        assert.equal(name.last, 'Rogers');
    });

    it('Doctor Who', function() {
        var name = siapa.parse('Doctor Who');
        assert.equal(name.salutation, 'Doctor');
        assert.equal(name.last, 'Who');
    });

    it('Dr. Dre', function() {
        var name = siapa.parse('Dr. Dre');
        assert.equal(name.salutation, 'Dr.');
        assert.equal(name.last, 'Dre');
    });

    it('Prof. Dre', function() {
        var name = siapa.parse('Prof. Plum');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.last, 'Plum');
    });

    it('Professor Plum', function() {
        var name = siapa.parse('Professor Plum');
        assert.equal(name.salutation, 'Professor');
        assert.equal(name.last, 'Plum');
    });
});

// http://en.wikipedia.org/wiki/Personal_name#Lexical_order
// http://en.wikipedia.org/wiki/Surname#Order_of_names
// https://github.com/freshlogic/siapa/pull/1
describe('Lexical Order', function() {
    it('Hinta,Hariadi', function() {
        var name = siapa.parse('Hinta,Hariadi');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi', function() {
        var name = siapa.parse('Hinta, Hariadi');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi, Prof.', function() {
        var name = siapa.parse('Hinta, Hariadi, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta,Hariadi Bin', function() {
        var name = siapa.parse('Hinta,Hariadi Bin');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi Bin', function() {
        var name = siapa.parse('Hinta, Hariadi Bin');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });

    it('Hinta, Hariadi, Prof.', function() {
        var name = siapa.parse('Hinta, Hariadi Bin, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Hariadi');
        assert.equal(name.middle, 'Bin');
        assert.equal(name.last, 'Hinta');
    });
});