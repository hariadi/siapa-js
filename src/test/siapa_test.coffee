siapa = require '../lib/siapa'
assert = require 'should'

describe "Malay Name Parser", ->

    describe "given royal title", ->

        it "should parse correctly with YDPA title", ->
            name = siapa.parse 'YDPA Hariadi Hinta'
            should_equal name, ['YDPA', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with Tuanku title", ->
            name = siapa.parse 'Tuanku Hariadi Hinta'
            should_equal name, ['Tuanku', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with Tengku title", ->
            name = siapa.parse 'Tengku Hariadi Hinta'
            should_equal name, ['Tengku', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with YBhg. title", ->
            name = siapa.parse 'YBhg. Hariadi Hinta'
            should_equal name, ['YBhg.', 'Hariadi', '', 'Hinta', '']

    describe "given Federal Title", ->

        it "should parse correctly with Tun title", ->
            name = siapa.parse 'Tun Hariadi Hinta'
            should_equal name, ['Tun', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with Toh Puan title", ->
            name = siapa.parse 'Toh Puan Hariadi Hinta'
            should_equal name, ['Toh Puan', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Datuk", ->
            name = siapa.parse 'Datuk Hariadi Hinta'
            should_equal name, ['Datuk', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Datin", ->
            name = siapa.parse 'Datin Hariadi Hinta'
            should_equal name, ['Datin', 'Hariadi', '', 'Hinta', '']

    describe "given the multiple title", ->

         it "should parse correctly with multiple title", ->
            name = siapa.parse 'Dato\' Ir. Dr. Hariadi Hinta'
            should_equal name, ['Dato\' Ir. Dr.', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Tan Sri'", ->
            name = siapa.parse 'Tan Sri Hariadi Hinta'
            should_equal name, ['Tan Sri', 'Hariadi', '', 'Hinta', '']

        it "should parse correctly with a title 'Tan Sri Dato\'", ->
            name = siapa.parse 'Tan Sri Dato\' Hariadi Hinta'
            should_equal name, ['Tan Sri Dato\'', 'Hariadi', '', 'Hinta', '']

    describe "given the format 'title first middle(s) last suffix'", ->

        it "should parse correctly with a title 'En.'", ->
            name = siapa.parse 'En. Hariadi Hinta'
            should_equal name, ['En.', 'Hariadi', '', 'Hinta', '']

    describe "given the format 'title first middle(s) last'", ->

        it "should parse correctly with a title 'Dato\'", ->
            name = siapa.parse 'Dato\' Hariadi Hinta'
            should_equal name, ['Dato\'', 'Hariadi', '', 'Hinta', '']

    describe "given the format 'first prefix last'", ->

        it "should parse correctly with no title first last", ->
            name = siapa.parse 'Hariadi Bin Hinta'
            should_equal name, ['', 'Hariadi', '', 'Bin Hinta', '']

        it "should parse correctly with no title first last", ->
            name = siapa.parse 'Hariadi a/l Hinta'
            should_equal name, ['', 'Hariadi', '', 'a/l Hinta', '']

        it "should parse correctly with no title first last", ->
            name = siapa.parse 'Hariadi a/p Hinta'
            should_equal name, ['', 'Hariadi', '', 'a/p Hinta', '']

    describe "given the format 'first'", ->

        it "should parse correctly with only first name", ->
            name = siapa.parse 'Hariadi'
            should_equal name, ['', 'Hariadi', '', '', '']

    describe "given Other Title", ->

        it "should parse correctly with a title 'Abang'", ->
            name = siapa.parse 'Abang Hariadi'
            should_equal name, ['Abang', 'Hariadi', '', '', '']

        it "should parse correctly with a title 'Dayang'", ->
            name = siapa.parse 'Dayang Hariadi'
            should_equal name, ['Dayang', 'Hariadi', '', '', '']

    describe "given Other SUFFICES", ->

        it "should parse correctly with suffix 'Professor'", ->
            name = siapa.parse 'Professor Hariadi Bin Hinta'
            should_equal name, ['', 'Professor', 'Hariadi', 'Bin Hinta', '']
    

should_equal = (parsed_name, names) ->
    assert.equal parsed_name.title(), names[0]
    assert.equal parsed_name.first, names[1]
    assert.equal parsed_name.middle(), names[2]
    assert.equal parsed_name.last(), names[3]
    assert.equal parsed_name.suffix(), names[4]
    #console.log('Title: ' + parsed_name.title(), 'First: ' + parsed_name.first, 'Middle: ' + parsed_name.middle(), 'Last: ' + parsed_name.last(), 'Suffix: ' + parsed_name.suffix());

