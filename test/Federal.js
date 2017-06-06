import test from 'ava';
import siapa from '../src/siapa';

test("It should parse correctly with a title 'Jeneral'", t => {
    let name = siapa.parse('Jeneral Hariadi Hinta');
    return shouldEqual(name, ['Jeneral', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with 'Tun' title", t => {
    let name = siapa.parse('Tun Hariadi Hinta');
    return shouldEqual(name, ['Tun', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with 'Toh Puan' title", t => {
    let name = siapa.parse('Toh Puan Hariadi Hinta');
    return shouldEqual(name, ['Toh Puan', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Datuk'", t => {
    let name = siapa.parse('Datuk Hariadi Hinta');
    return shouldEqual(name, ['Datuk', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Datin'", t => {
    let name = siapa.parse('Datin Hariadi Hinta');
    return shouldEqual(name, ['Datin', 'Hariadi', '', 'Hinta', ''], t);
});

test("It should parse correctly with a title 'Paduka'", t => {
    let name = siapa.parse('Paduka Hariadi Hinta');
    return shouldEqual(name, ['Paduka', 'Hariadi', '', 'Hinta', ''], t);
});

let shouldEqual = (parsed_name, names, t) => {
  t.is(parsed_name.title(), names[0]);
  t.is(parsed_name.first, names[1]);
  t.is(parsed_name.middle(), names[2]);
  t.is(parsed_name.last(), names[3]);
  t.is(parsed_name.suffix(), names[4]);
};
