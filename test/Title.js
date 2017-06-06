import test from 'ava';
import siapa from '../src/siapa';

test("It should parse correctly with a title 'Dato\'", t => {
    let name = siapa.parse('Dato\' Hariadi Hinta');
    return shouldEqual(name, ['Dato\'', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Encik First'", t => {
    let name = siapa.parse('Encik Hariadi');
    return shouldEqual(name, ['Encik', 'Hariadi', '', '', ''], t);
});

test("It should parse correctly with a title 'Encik First Last'", t => {
    let name = siapa.parse('Encik Hariadi Hinta');
    return shouldEqual(name, ['Encik', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Abang'", t => {
    let name = siapa.parse('Abang Hariadi');
    return shouldEqual(name, ['Abang', 'Hariadi', '', '', ''], t);
});

test("It should parse correctly with a title 'Haji'", t => {
let name = siapa.parse('Haji Hariadi');
return shouldEqual(name, ['Haji', 'Hariadi', '', '', ''], t);
});

test("It should parse correctly with a title 'Hajjah'", t => {
    let name = siapa.parse('Hajjah Hariadi');
    return shouldEqual(name, ['Hajjah', 'Hariadi', '', '', ''], t);
});

test("It should parse correctly with a title 'Dayang'", t => {
    let name = siapa.parse('Dayang Hariadi');
    return shouldEqual(name, ['Dayang', 'Hariadi', '', '', ''], t);
});

test("It should parse correctly with a title 'Pehin'", t => {
    let name = siapa.parse('Pehin Hariadi');
    return shouldEqual(name, ['Pehin', 'Hariadi', '', '', ''], t);
});

test("It should parse correctly with a title 'Pehin'", t => {
	let name = siapa.parse('Professor Hariadi Bin Hinta');
	return shouldEqual(name, ['', 'Professor', 'Hariadi', 'Bin Hinta', ''], t);
});

let shouldEqual = (parsed_name, names, t) => {
  t.is(parsed_name.title(), names[0]);
  t.is(parsed_name.first, names[1]);
  t.is(parsed_name.middle(), names[2]);
  t.is(parsed_name.last(), names[3]);
  t.is(parsed_name.suffix(), names[4]);
};
