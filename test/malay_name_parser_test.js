(function() {
  var assert, parser, should_equal;

  parser = require('../lib/malay-name-parser');

  assert = require('should');

  describe("Malay Name Parser", function() {
    describe("given the format 'title title first middle last'", function() {
      return it("should parse correctly with multiple title", function() {
        var name;

        name = parser.parse_malay_name('Dato\' Ir. Dr. Hariadi Hinta');
        return should_equal(name, ['Dato\' Ir. Dr.', 'Hariadi', '', 'Hinta', '']);
      });
    });
    return describe("given the format 'title first middle(s) last suffix'", function() {
      it("should parse correctly with no middle names", function() {
        var name;

        name = parser.parse_malay_name('Hariadi Hinta');
        return should_equal(name, ['', 'Hariadi', '', 'Hinta', '']);
      });
      it("should parse correctly with a title 'En.'", function() {
        var name;

        name = parser.parse_malay_name('En. Hariadi Hinta');
        return should_equal(name, ['En.', 'Hariadi', '', 'Hinta', '']);
      });
      it("should parse correctly with a title 'Dato\'", function() {
        var name;

        name = parser.parse_malay_name('Dato\' Hariadi Hinta');
        return should_equal(name, ['Dato\'', 'Hariadi', '', 'Hinta', '']);
      });
      return it("should parse correctly with a title 'Tan Sri\'", function() {
        var name;

        name = parser.parse_malay_name('Tan Sri Hariadi Hinta');
        return should_equal(name, ['Tan Sri', 'Hariadi', '', 'Hinta', '']);
      });
    });
  });

  should_equal = function(parsed_name, names) {
    assert.equal(parsed_name.title(), names[0]);
    assert.equal(parsed_name.first, names[1]);
    assert.equal(parsed_name.middle(), names[2]);
    assert.equal(parsed_name.last(), names[3]);
    return assert.equal(parsed_name.suffix(), names[4]);
  };

}).call(this);
