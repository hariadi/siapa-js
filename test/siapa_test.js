(function() {
  var assert, parser, should_equal;

  parser = require('../lib/siapa');

  assert = require('should');

  describe("Malay Name Parser", function() {
    describe("given royal title", function() {
      it("should parse correctly with YDPA title", function() {
        var name;
        name = parser.parse_malay_name('YDPA Hariadi Hinta');
        return should_equal(name, ['YDPA', 'Hariadi', '', 'Hinta', '']);
      });
      it("should parse correctly with Tuanku title", function() {
        var name;
        name = parser.parse_malay_name('Tuanku Hariadi Hinta');
        return should_equal(name, ['Tuanku', 'Hariadi', '', 'Hinta', '']);
      });
      it("should parse correctly with Tengku title", function() {
        var name;
        name = parser.parse_malay_name('Tengku Hariadi Hinta');
        return should_equal(name, ['Tengku', 'Hariadi', '', 'Hinta', '']);
      });
      return it("should parse correctly with YBhg. title", function() {
        var name;
        name = parser.parse_malay_name('YBhg. Hariadi Hinta');
        return should_equal(name, ['YBhg.', 'Hariadi', '', 'Hinta', '']);
      });
    });
    describe("given Federal Title", function() {
      it("should parse correctly with Tun title", function() {
        var name;
        name = parser.parse_malay_name('Tun Hariadi Hinta');
        return should_equal(name, ['Tun', 'Hariadi', '', 'Hinta', '']);
      });
      it("should parse correctly with Toh Puan title", function() {
        var name;
        name = parser.parse_malay_name('Toh Puan Hariadi Hinta');
        return should_equal(name, ['Toh Puan', 'Hariadi', '', 'Hinta', '']);
      });
      it("should parse correctly with a title 'Datuk", function() {
        var name;
        name = parser.parse_malay_name('Datuk Hariadi Hinta');
        return should_equal(name, ['Datuk', 'Hariadi', '', 'Hinta', '']);
      });
      return it("should parse correctly with a title 'Datin", function() {
        var name;
        name = parser.parse_malay_name('Datin Hariadi Hinta');
        return should_equal(name, ['Datin', 'Hariadi', '', 'Hinta', '']);
      });
    });
    describe("given the multiple title", function() {
      return it("should parse correctly with multiple title", function() {
        var name;
        name = parser.parse_malay_name('Dato\' Ir. Dr. Hariadi Hinta');
        return should_equal(name, ['Dato\' Ir. Dr.', 'Hariadi', '', 'Hinta', '']);
      });
    });
    it("should parse correctly with a title 'Tan Sri'", function() {
      var name;
      name = parser.parse_malay_name('Tan Sri Hariadi Hinta');
      return should_equal(name, ['Tan Sri', 'Hariadi', '', 'Hinta', '']);
    });
    it("should parse correctly with a title 'Tan Sri Dato\'", function() {
      var name;
      name = parser.parse_malay_name('Tan Sri Dato\' Hariadi Hinta');
      return should_equal(name, ['Tan Sri Dato\'', 'Hariadi', '', 'Hinta', '']);
    });
    describe("given the format 'title first middle(s) last suffix'", function() {
      return it("should parse correctly with a title 'En.'", function() {
        var name;
        name = parser.parse_malay_name('En. Hariadi Hinta');
        return should_equal(name, ['En.', 'Hariadi', '', 'Hinta', '']);
      });
    });
    describe("given the format 'title first middle(s) last'", function() {
      return it("should parse correctly with a title 'Dato\'", function() {
        var name;
        name = parser.parse_malay_name('Dato\' Hariadi Hinta');
        return should_equal(name, ['Dato\'', 'Hariadi', '', 'Hinta', '']);
      });
    });
    describe("given the format 'first prefix last'", function() {
      it("should parse correctly with no title first last", function() {
        var name;
        name = parser.parse_malay_name('Hariadi Bin Hinta');
        return should_equal(name, ['', 'Hariadi', '', 'Bin Hinta', '']);
      });
      it("should parse correctly with no title first last", function() {
        var name;
        name = parser.parse_malay_name('Hariadi a/l Hinta');
        return should_equal(name, ['', 'Hariadi', '', 'a/l Hinta', '']);
      });
      return it("should parse correctly with no title first last", function() {
        var name;
        name = parser.parse_malay_name('Hariadi a/p Hinta');
        return should_equal(name, ['', 'Hariadi', '', 'a/p Hinta', '']);
      });
    });
    describe("given the format 'first'", function() {
      return it("should parse correctly with only first name", function() {
        var name;
        name = parser.parse_malay_name('Hariadi');
        return should_equal(name, ['', 'Hariadi', '', '', '']);
      });
    });
    describe("given Other Title", function() {
      it("should parse correctly with a title 'Abang'", function() {
        var name;
        name = parser.parse_malay_name('Abang Hariadi');
        return should_equal(name, ['Abang', 'Hariadi', '', '', '']);
      });
      return it("should parse correctly with a title 'Dayang'", function() {
        var name;
        name = parser.parse_malay_name('Dayang Hariadi');
        return should_equal(name, ['Dayang', 'Hariadi', '', '', '']);
      });
    });
    return describe("given Other SUFFICES", function() {
      return it("should parse correctly with suffix 'Professor'", function() {
        var name;
        name = parser.parse_malay_name('Professor Hariadi Bin Hinta');
        return should_equal(name, ['', 'Professor', 'Hariadi', 'Bin Hinta', '']);
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
