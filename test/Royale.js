import test from 'ava';
import siapa from '../src/siapa';

test('It should parse correctly with YDPA title', t => {
    let name = siapa.parse('YDPA Hariadi Hinta');
    return shouldEqual(name, ['YDPA', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with Tuanku title", t => {
    let name = siapa.parse('Tuanku Hariadi Hinta');
    return shouldEqual(name, ['Tuanku', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with Tengku title", t => {
    let name = siapa.parse('Tengku Hariadi Hinta');
    return shouldEqual(name, ['Tengku', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with YBhg. title", t => {
    let name = siapa.parse('YBhg. Hariadi Hinta');
    return shouldEqual(name, ['YBhg.', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with Tunku title", t => {
    let name = siapa.parse('Tunku Hariadi Hinta');
    return shouldEqual(name, ['Tunku', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with Raja title", t => {
    let name = siapa.parse('Raja Hariadi Hinta');
    return shouldEqual(name, ['Raja', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with Daeng title", t => {
    let name = siapa.parse('Daeng Hariadi Hinta');
    return shouldEqual(name, ['Daeng', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with Engku title", t => {
    let name = siapa.parse('Engku Hariadi Hinta');
    return shouldEqual(name, ['Engku', 'Hariadi', '', 'Hinta', ''], t);
});

let shouldEqual = (parsed_name, names, t) => {
  t.is(parsed_name.title(), names[0]);
  t.is(parsed_name.first, names[1]);
  t.is(parsed_name.middle(), names[2]);
  t.is(parsed_name.last(), names[3]);
  t.is(parsed_name.suffix(), names[4]);
};
