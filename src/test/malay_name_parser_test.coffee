parser = require '../lib/malay-name-parser'
assert = require 'should'

describe "Malay Name Parser", ->

    describe "given royal title", ->

        it "should parse correctly with YDPA title", ->
            name = parser.parse_malay_name 'YDPA Hariadi Hinta'
            should_equal name, ['YDPA', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with Tuanku title", ->
            name = parser.parse_malay_name 'Tuanku Hariadi Hinta'
            should_equal name, ['Tuanku', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with Tengku title", ->
            name = parser.parse_malay_name 'Tengku Hariadi Hinta'
            should_equal name, ['Tengku', 'Hariadi', '', 'Hinta', '']

    describe "given Federal Title", ->

        it "should parse correctly with Tun title", ->
            name = parser.parse_malay_name 'Tun Hariadi Hinta'
            should_equal name, ['Tun', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with Toh Puan title", ->
            name = parser.parse_malay_name 'Toh Puan Hariadi Hinta'
            should_equal name, ['Toh Puan', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Datuk", ->
            name = parser.parse_malay_name 'Datuk Hariadi Hinta'
            should_equal name, ['Datuk', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Datin", ->
            name = parser.parse_malay_name 'Datin Hariadi Hinta'
            should_equal name, ['Datin', 'Hariadi', '', 'Hinta', '']

    describe "given the multiple title", ->

         it "should parse correctly with multiple title", ->
            name = parser.parse_malay_name 'Dato\' Ir. Dr. Hariadi Hinta'
            should_equal name, ['Dato\' Ir. Dr.', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Tan Sri'", ->
            name = parser.parse_malay_name 'Tan Sri Hariadi Hinta'
            should_equal name, ['Tan Sri', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Tan Sri Dato\'", ->
            name = parser.parse_malay_name 'Tan Sri Dato\' Hariadi Hinta'
            should_equal name, ['Tan Sri Dato\'', 'Hariadi', '', 'Hinta', '']

    describe "given the format 'title first middle(s) last suffix'", ->

        it "should parse correctly with a title 'En.'", ->
            name = parser.parse_malay_name 'En. Hariadi Hinta'
            should_equal name, ['En.', 'Hariadi', '', 'Hinta', '']

    describe "given the format 'title first middle(s) last'", ->

        it "should parse correctly with a title 'Dato\'", ->
            name = parser.parse_malay_name 'Dato\' Hariadi Hinta'
            should_equal name, ['Dato\'', 'Hariadi', '', 'Hinta', '']

    describe "given the format 'first prefix last'", ->

        it "should parse correctly with no title first last", ->
            name = parser.parse_malay_name 'Hariadi Bin Hinta'
            should_equal name, ['', 'Hariadi', '', 'Bin Hinta', '']

        it "should parse correctly with no title first last", ->
            name = parser.parse_malay_name 'Hariadi a/l Hinta'
            should_equal name, ['', 'Hariadi', '', 'a/l Hinta', '']

        it "should parse correctly with no title first last", ->
            name = parser.parse_malay_name 'Hariadi a/p Hinta'
            should_equal name, ['', 'Hariadi', '', 'a/p Hinta', '']

    describe "given the format 'first'", ->

        it "should parse correctly with only first name", ->
            name = parser.parse_malay_name 'Hariadi'
            should_equal name, ['', 'Hariadi', '', '', '']

    describe "given Other Title", ->

        it "should parse correctly with a title 'Abang'", ->
            name = parser.parse_malay_name 'Abang Hariadi'
            should_equal name, ['Abang', 'Hariadi', '', '', '']

        it "should parse correctly with a title 'Dayang'", ->
            name = parser.parse_malay_name 'Dayang Hariadi'
            should_equal name, ['Dayang', 'Hariadi', '', '', '']
    

should_equal = (parsed_name, names) ->
    assert.equal parsed_name.title(), names[0]
    assert.equal parsed_name.first, names[1]
    assert.equal parsed_name.middle(), names[2]
    assert.equal parsed_name.last(), names[3]
    assert.equal parsed_name.suffix(), names[4]

