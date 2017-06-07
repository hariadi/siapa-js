import test from 'ava';
import siapa from '../src/siapa';

test("It should parse correctly with a middle 'Bin'", t => {
    let name = siapa.parse('Hariadi Bin Hinta');
    return shouldEqual(name, ['', 'Hariadi', '', 'Bin Hinta', ''], t);
});

test("It should parse correctly with a middle 'a/l'", t => {
    let name = siapa.parse('Hariadi a/l Hinta');
    return shouldEqual(name, ['', 'Hariadi', '', 'a/l Hinta', ''], t);
});

test("It should parse correctly with a middle 'a/p", t => {
    let name = siapa.parse('Hariadi a/p Hinta');
    return shouldEqual(name, ['', 'Hariadi', '', 'a/p Hinta', ''], t);
});

let shouldEqual = (parsed_name, names, t) => {
  t.is(parsed_name.title(), names[0]);
  t.is(parsed_name.first, names[1]);
  t.is(parsed_name.middle(), names[2]);
  t.is(parsed_name.last(), names[3]);
  t.is(parsed_name.suffix(), names[4]);
};
