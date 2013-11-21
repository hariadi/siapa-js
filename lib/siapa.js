/*
A simple script for parsing malay names into their individual components.

Parses names into 5 components:

    * Title
    * First name
    * Middle names
    * Last names
    * Suffixes

--------

Copyright Hariadi Hinta, 2013 <hariadi at gmail>.

Based on Javascript name parser by John Griffey:
    https://github.com/redjohn/name_parser
which was based on the Pythonname parser by Derek Gulbranson:
    http://code.google.com/p/python-nameparser
which was based on the PHP nameParser.php by G. Miernicki:
    http://code.google.com/p/nameparser/

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


(function() {
  var CAPITALIZATION_EXCEPTIONS, CONJUNCTIONS, FEDERAL_TITLE, HumanName, OTHER_TITLE, PREFICES, PUNC_TITLES, ROYAL_TITLE, SUFFICES, TITLES, is_not_initial, lc, re_initial, re_mac, re_spaces, re_word,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ROYAL_TITLE = ['ydpa', 'ydpb', 'ydpn', 'tuanku', 'tengku', 'ybhg', 'tunku', 'raja', 'daeng'];

  FEDERAL_TITLE = ['tun', 'toh', 'tan', 'sri', 'datuk', 'datin', 'dato\'', 'seri'];

  OTHER_TITLE = ['ir', 'dr', 'tuan', 'puan', 'en', 'encik', 'cik', 'mr', 'abang', 'dayang'];

  TITLES = ROYAL_TITLE.concat(FEDERAL_TITLE, OTHER_TITLE);

  PUNC_TITLES = ['hon.', 'sr.'];

  PREFICES = ['abu', 'bon', 'ben', 'bin', 'ibn', 'Dr', 'Father', 'Miss', 'Mr', 'Mrs', 'Ms', 'Officer', 'Prof', 'Sister', 'Sr', 'a/l', 'a/p'];

  SUFFICES = ['md', 'phd', 'professor', 'deputy'];

  CAPITALIZATION_EXCEPTIONS = {
    'ii': 'II',
    'iii': 'III',
    'iv': 'IV',
    'md': 'M.D.',
    'phd': 'Ph.D.'
  };

  CONJUNCTIONS = ['&', 'and', 'et', 'e', 'und', 'y'];

  re_spaces = /\s+/g;

  re_word = /\w+/;

  re_mac = /^(ma?c)(\w)/i;

  re_initial = /^(\w\.|[A_Z])?$/;

  lc = function(value) {
    if (!value) {
      return "";
    }
    return value.toLowerCase().replace('.', '');
  };

  is_not_initial = function(value) {
    return !value.match(re_initial);
  };

  HumanName = (function() {
    function HumanName(full_name, titles, prefices, suffices, punc_titles, conjunctions, capitalization_exceptions) {
      this.full_name = full_name != null ? full_name : '';
      this.titles = titles != null ? titles : TITLES;
      this.prefices = prefices != null ? prefices : PREFICES;
      this.suffices = suffices != null ? suffices : SUFFICES;
      this.punc_titles = punc_titles != null ? punc_titles : PUNC_TITLES;
      this.conjunctions = conjunctions != null ? conjunctions : CONJUNCTIONS;
      this.capitalization_exceptions = capitalization_exceptions != null ? capitalization_exceptions : CAPITALIZATION_EXCEPTIONS;
      this.human_title = "";
      this.first = "";
      this.suffixes = [];
      this.middle_names = [];
      this.last_names = [];
      this.unparsable = false;
      this.count = 0;
      this.members = ['title', 'first', 'middle', 'last', 'suffix'];
      if (this.full_name) {
        this.parse_full_name();
      }
    }

    HumanName.prototype.title = function() {
      return this.human_title.join(' ');
    };

    HumanName.prototype.middle = function() {
      return this.middle_names.join(' ');
    };

    HumanName.prototype.last = function() {
      return this.last_names.join(' ');
    };

    HumanName.prototype.suffix = function() {
      return this.suffixes.join(', ');
    };

    HumanName.prototype.is_conjunction = function(piece) {
      var _ref;
      return (_ref = lc(piece), __indexOf.call(this.conjunctions, _ref) >= 0) && is_not_initial(piece);
    };

    HumanName.prototype.is_prefix = function(piece) {
      var _ref;
      return (_ref = lc(piece), __indexOf.call(this.prefices, _ref) >= 0) && is_not_initial(piece);
    };

    HumanName.prototype.parse_full_name = function() {
      var error, i, name, names, next, part, parts, piece, pieces, prev, suffix, x, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref, _ref1, _ref10, _ref11, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      if (!this.full_name) {
        throw "Missing full_name";
      }
      this.full_name = this.full_name.trim().replace(re_spaces, ' ');
      this.human_title = [];
      this.first = "";
      this.suffixes = [];
      this.middle_names = [];
      this.last_names = [];
      this.unparsable = true;
      parts = (function() {
        var _i, _len, _ref, _results;
        _ref = this.full_name.split(",");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(x.trim());
        }
        return _results;
      }).call(this);
      pieces = [];
      if (parts.length === 1) {
        for (_i = 0, _len = parts.length; _i < _len; _i++) {
          part = parts[_i];
          part = String(part);
          names = part.split(' ');
          for (_j = 0, _len1 = names.length; _j < _len1; _j++) {
            name = names[_j];
            name = name.replace(',', '').trim();
            pieces.push(name);
          }
        }
        i = 0;
        while (i < pieces.length) {
          piece = pieces[i];
          try {
            next = pieces[i + 1];
          } catch (_error) {
            error = _error;
            next = null;
          }
          try {
            prev = pieces[i - 1];
          } catch (_error) {
            error = _error;
            prev = null;
          }
          if (_ref = lc(piece), __indexOf.call(this.titles, _ref) >= 0) {
            this.human_title.push(piece);
            i += 1;
            continue;
          }
          if (_ref1 = piece.toLowerCase(), __indexOf.call(this.punc_titles, _ref1) >= 0) {
            this.human_title.push(piece);
            i += 1;
            continue;
          }
          if (!this.first) {
            this.first = piece.replace(".", "");
            i += 1;
            continue;
          }
          if ((i === pieces.length - 2) && (_ref2 = lc(next), __indexOf.call(this.suffices, _ref2) >= 0)) {
            this.last_names.push(piece);
            this.suffixes.push(next);
            break;
          }
          if (this.is_prefix(piece)) {
            this.last_names.push(piece);
            i += 1;
            continue;
          }
          if (this.is_conjunction(piece) && i < pieces.length / 2) {
            this.first += ' ' + piece;
            i += 1;
            continue;
          }
          if (this.is_conjunction(prev) && (i - 1) < pieces.length / 2) {
            this.first += ' ' + piece;
            i += 1;
            continue;
          }
          if (this.is_conjunction(piece) || this.is_conjunction(next)) {
            this.last_names.push(piece);
            i += 1;
            continue;
          }
          if (i === pieces.length - 1) {
            this.last_names.push(piece);
            i += 1;
            continue;
          }
          this.middle_names.push(piece);
          i += 1;
        }
      } else {
        if (_ref3 = lc(parts[1]), __indexOf.call(this.suffices, _ref3) >= 0) {
          names = parts[0].split(' ');
          for (_k = 0, _len2 = names.length; _k < _len2; _k++) {
            name = names[_k];
            name = name.replace(',', '').trim();
            pieces.push(name);
          }
          _ref4 = parts.slice(1, +parts.length + 1 || 9e9);
          for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
            part = _ref4[_l];
            this.suffixes.push(part);
          }
          i = 0;
          while (i < pieces.length) {
            piece = pieces[i];
            try {
              next = pieces[i + 1];
            } catch (_error) {
              error = _error;
              next = null;
            }
            if (_ref5 = lc(piece), __indexOf.call(this.titles, _ref5) >= 0) {
              this.human_title.push(piece);
              i += 1;
              continue;
            }
            if (_ref6 = piece.toLowerCase(), __indexOf.call(this.punc_titles, _ref6) >= 0) {
              this.human_title.push(piece);
              i += 1;
              continue;
            }
            if (!this.first) {
              this.first = piece.replace(".", "");
              i += 1;
              continue;
            }
            if (i === (pieces.length - 1) && this.is_prefix(piece) && next) {
              this.last_names.push(piece + " " + next);
              break;
            }
            if (this.is_prefix(piece)) {
              this.last_names.push(piece);
              i += 1;
              continue;
            }
            if (this.is_conjunction(piece) || this.is_conjunction(next)) {
              this.last_names.push(piece);
              i += 1;
              continue;
            }
            if (i === pieces.length - 1) {
              this.last_names.push(piece);
              i += 1;
              continue;
            }
            this.middle_names.push(piece);
            i += 1;
          }
        } else {
          names = parts[1].split(' ');
          for (_m = 0, _len4 = names.length; _m < _len4; _m++) {
            name = names[_m];
            name = name.replace(',', '').trim();
            pieces.push(name);
          }
          this.last_names.push(parts[0]);
          i = 0;
          while (i < pieces.length) {
            piece = pieces[i];
            try {
              next = pieces[i + 1];
            } catch (_error) {
              error = _error;
              next = null;
            }
            i += 1;
            if (_ref7 = lc(piece), __indexOf.call(this.titles, _ref7) >= 0) {
              this.human_title.push(piece);
              continue;
            }
            if (_ref8 = piece.toLowerCase(), __indexOf.call(this.punc_titles, _ref8) >= 0) {
              this.human_title.push(piece);
              continue;
            }
            if (!this.first) {
              this.first = piece.replace(".", "");
              continue;
            }
            if (_ref9 = lc(piece), __indexOf.call(this.suffices, _ref9) >= 0) {
              this.suffixes.push(piece);
              continue;
            }
            this.middle_names.push(piece);
          }
          try {
            if (parts[2]) {
              _ref10 = parts.slice(2, +parts.length + 1 || 9e9);
              for (_n = 0, _len5 = _ref10.length; _n < _len5; _n++) {
                part = _ref10[_n];
                _ref11 = part.split(' ');
                for (_o = 0, _len6 = _ref11.length; _o < _len6; _o++) {
                  suffix = _ref11[_o];
                  this.suffixes.push(suffix);
                }
              }
            }
          } catch (_error) {
            error = _error;
            null;
          }
        }
      }
      if (!this.first && this.middle_names.length < 1 && this.last_names.length < 1) {
        return this.unparsable = true;
      }
    };

    return HumanName;

  })();

  exports.parse = function(name) {
    return new HumanName(name);
  };

}).call(this);
