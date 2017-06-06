import test from 'ava';
import siapa from '../src/siapa';

test("It should parse correctly with multiple title", t => {
    let name = siapa.parse('Dato\' Ir. Dr. Hariadi Hinta');
    return shouldEqual(name, ['Dato\' Ir. Dr.', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Tan Sri'", t => {
	let name = siapa.parse('Tan Sri Hariadi Hinta');
	return shouldEqual(name, ['Tan Sri', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Tan Sri Dato\'", t => {
    let name = siapa.parse('Tan Sri Dato\' Hariadi Hinta');
    return shouldEqual(name, ['Tan Sri Dato\'', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Dato\' Seri", t => {
    let name = siapa.parse('Dato\' Seri Hariadi Hinta');
    return shouldEqual(name, ['Dato\' Seri', 'Hariadi', '', 'Hinta', ''], t);
});

let shouldEqual = (parsed_name, names, t) => {
  t.is(parsed_name.title(), names[0]);
  t.is(parsed_name.first, names[1]);
  t.is(parsed_name.middle(), names[2]);
  t.is(parsed_name.last(), names[3]);
  t.is(parsed_name.suffix(), names[4]);
};
