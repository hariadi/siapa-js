###
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
###

# Malay royalty
ROYAL_TITLE = ['ydpa', 'ydpb', 'ydpn', 'tuanku', 'tengku','ybhg']

# Federal and state title
FEDERAL_TITLE = ['tun', 'toh', 'tan', 'sri', 'datuk', 'datin', 'dato\'', 'seri']

OTHER_TITLE = [ 'ir', 'dr','tuan','puan','en','encik','cik','mr','abang','dayang']

TITLES = ROYAL_TITLE.concat(FEDERAL_TITLE, OTHER_TITLE); 

# These could be names too, but if they have period at the end they're a title
PUNC_TITLES = ['hon.','sr.']

PREFICES = ['abu','bon','ben','bin','ibn','Dr','Father','Miss','Mr','Mrs','Ms','Officer','Prof','Sister','Sr','a/l','a/p']

SUFFICES = ['md','phd', 'professor','deputy']

CAPITALIZATION_EXCEPTIONS = {
    'ii': 'II',
    'iii': 'III',
    'iv': 'IV',
    'md': 'M.D.',
    'phd': 'Ph.D.'
}

CONJUNCTIONS = ['&', 'and', 'et', 'e', 'und', 'y']

re_spaces = /\s+/g
re_word = /\w+/
re_mac = /^(ma?c)(\w)/i
re_initial = /^(\w\.|[A_Z])?$/

lc = (value) ->
    return "" if not value
    return value.toLowerCase().replace('.','')

is_not_initial = (value) ->
    return not value.match(re_initial)

class HumanName
    constructor: (@full_name='', @titles=TITLES, @prefices=PREFICES, @suffices=SUFFICES, @punc_titles=PUNC_TITLES, @conjunctions=CONJUNCTIONS, @capitalization_exceptions=CAPITALIZATION_EXCEPTIONS) ->
        @human_title = ""
        @first = ""
        @suffixes = []
        @middle_names = []
        @last_names = []
        @unparsable = false
        @count = 0
        @members = ['title','first','middle','last','suffix']
        if @full_name
            @parse_full_name()

    title: -> @human_title.join(' ')

    middle: -> @middle_names.join(' ')

    last: -> @last_names.join(' ')

    suffix: -> @suffixes.join(', ')

    is_conjunction: (piece) -> lc(piece) in @conjunctions and is_not_initial(piece)

    is_prefix: (piece) -> lc(piece) in @prefices and is_not_initial(piece)

    parse_full_name: ->
        if not @full_name
            throw "Missing full_name"

        #if not isinstance(self.full_name, unicode):
        #    self.full_name = unicode(self.full_name, ENCODING)

        # collapse multiple spaces
        @full_name = @full_name.trim().replace(re_spaces, ' ')

        # reset values
        @human_title = []
        @first = ""
        @suffixes = []
        @middle_names = []
        @last_names = []
        @unparsable = true

        # break up full_name by commas
        parts = (x.trim() for x in @full_name.split(","))

        #log.debug(u"full_name: " + self.full_name)
        #log.debug(u"parts: " + unicode(parts))
        pieces = []
        if parts.length == 1

            # 'no commas, title first middle middle middle last suffix'

            for part in parts
                part = String(part)
                names = part.split(' ')
                for name in names
                    name = name.replace(',','').trim()
                    pieces.push(name)

            #console.log(pieces)

            i = 0
            while i < pieces.length
                piece = pieces[i]
                try
                    next = pieces[i + 1]
                catch error
                    next = null

                try
                    prev = pieces[i - 1]
                catch error
                    prev = null

                if lc(piece) in @titles
                    #console.log  lc(piece)
                    @human_title.push(piece)
                    #console.log @human_title
                    i += 1
                    continue
                if piece.toLowerCase() in @punc_titles
                    @human_title.push(piece)
                    i += 1
                    continue
                if not @first
                    @first = piece.replace(".","")
                    i += 1
                    continue
                if (i == pieces.length - 2) and (lc(next) in @suffices)
                    @last_names.push(piece)
                    @suffixes.push(next)
                    break
                if @is_prefix(piece)
                    @last_names.push(piece)
                    i += 1
                    continue
                if @is_conjunction(piece) and i < pieces.length / 2
                    @first += ' ' + piece
                    i += 1
                    continue
                if @is_conjunction(prev) and (i-1) < pieces.length / 2
                    @first += ' ' + piece
                    i += 1
                    continue
                if @is_conjunction(piece) or @is_conjunction(next)
                    @last_names.push(piece)
                    i += 1
                    continue
                if i == pieces.length - 1
                    @last_names.push(piece)
                    i += 1
                    continue
                @middle_names.push(piece)
                i += 1
        else
            if lc(parts[1]) in @suffices

                # 'title first middle last, suffix [, suffix]'

                names = parts[0].split(' ')
                for name in names
                    name = name.replace(',','').trim()
                    pieces.push(name)

                #console.log(pieces)

                @suffixes.push part for part in parts[1..parts.length]

                i = 0
                while i < pieces.length
                    piece = pieces[i]
                    try
                        next = pieces[i + 1]
                    catch error
                        next = null

                    if lc(piece) in @titles
                        @human_title.push(piece)
                        i += 1
                        continue
                    if piece.toLowerCase() in @punc_titles
                        @human_title.push(piece)
                        i += 1
                        continue
                    if not @first
                        @first = piece.replace(".","")
                        i += 1
                        continue
                    if i == (pieces.length - 1) and @is_prefix(piece) and next
                        @last_names.push(piece + " " + next)
                        break
                    if @is_prefix(piece)
                        @last_names.push(piece)
                        i += 1
                        continue
                    if @is_conjunction(piece) or @is_conjunction(next)
                        @last_names.push(piece)
                        i += 1
                        continue
                    if i == pieces.length - 1
                        @last_names.push(piece)
                        i += 1
                        continue
                    @middle_names.push(piece)
                    i += 1
            else

                # 'last, title first middles[,] suffix [,suffix]'

                names = parts[1].split(' ')
                for name in names
                    name = name.replace(',','').trim()
                    pieces.push(name)

                #log.debug(u"pieces: " + unicode(pieces))

                @last_names.push parts[0]
                i = 0
                while i < pieces.length
                    piece = pieces[i]
                    try
                        next = pieces[i + 1]
                    catch error
                        next = null

                    i += 1

                    if lc(piece) in @titles
                        @human_title.push(piece)
                        continue
                    if piece.toLowerCase() in @punc_titles
                        @human_title.push(piece)
                        continue
                    if not @first
                        @first = piece.replace(".","")
                        continue
                    if lc(piece) in @suffices
                        @suffixes.push(piece)
                        continue
                    @middle_names.push(piece)
                try
                    if parts[2]
                        (@suffixes.push suffix for suffix in part.split(' ')) for part in parts[2..parts.length]
                catch error
                    null

        if not @first and @middle_names.length < 1 and @last_names.length < 1
            @unparsable = true
            #log.error(u"Unparsable full_name: " + this.full_name)

exports.parse = (name) ->
    new HumanName name
    
