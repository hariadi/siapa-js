import test from 'ava';
import siapa from '../src/siapa';

test("It should parse correctly with a title 'En.'", t => {
    let name = siapa.parse('En. Hariadi Hinta');
    return shouldEqual(name, ['En.', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Dato\'", t => {
    let name = siapa.parse('Dato\' Hariadi Hinta');
    return shouldEqual(name, ['Dato\'', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with only first name", t => {
    let name = siapa.parse('Hariadi');
    return shouldEqual(name, ['', 'Hariadi', '', '', ''], t);
});

let shouldEqual = (parsed_name, names, t) => {
  t.is(parsed_name.title(), names[0]);
  t.is(parsed_name.first, names[1]);
  t.is(parsed_name.middle(), names[2]);
  t.is(parsed_name.last(), names[3]);
  t.is(parsed_name.suffix(), names[4]);
};
