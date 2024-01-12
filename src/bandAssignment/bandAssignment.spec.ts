import {Band, makeAll, makeExpected, makePlays} from "./bandAssignment";

describe('bandAssignment', () => {

  const original: Band = {
    members: {
      current: [
        {name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass']},
        {name: 'Lucia', age: 49, plays: ['vocals', 'synth']},
        {name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth']},
        {name: 'Steve', age: 55, plays: ['guitar']}
      ],
      past: [
        {name: 'Raymond', age: 57, plays: ['vocals', 'synth']},
        {name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth']},
        {name: 'Gunter', age: 57, plays: ['guitar', 'synth']}
      ]
    }
  };

  const expected: Band = {
    members: {
      // current: no changes
      current: [
        {name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass']},
        {name: 'Lucia', age: 49, plays: ['vocals', 'synth']},
        {name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth']},
        {name: 'Steve', age: 55, plays: ['guitar']}
      ],
      // past: no changes
      past: [
        {name: 'Raymond', age: 57, plays: ['vocals', 'synth']},
        {name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth']},
        {name: 'Gunter', age: 57, plays: ['guitar', 'synth']}
      ],
      // ORDER MATTERS!
      // 1. Sort age first by DESC
      // 2. then sort name by ASC
      // 3. lowercase all the names
      all: [
        "sascha",
        "gunter",
        "raymond",
        "steve",
        "jules",
        "en",
        "lucia"
      ]
    },
    // plays order doesn't matter
    plays: {
      // name order doesn't matter
      // but show the name in lowercase
      vocals: ["sascha", "lucia", "raymond", "en"],
      synth: ["sascha", "lucia", "jules", "raymond", "en", "gunter"],
      guitar: ["sascha", "jules", "steve", "en", "gunter"],
      bass: ["sascha", "jules"],
      drums: ["en"]
    }
  }
  it('adds all prop to band', () => {
    const result = makeAll(original);
    expect(result.members.all).toEqual(expected.members.all);
  })
  it('adds plays prop to band', () => {
    const result = makePlays(original);
    expect(result.plays).toEqual(expected.plays);
    console.log(result.plays);
  });
  it('makes expected', () => {
    const result = makeExpected(original);
    expect(result).toEqual(expected);
  })
})
