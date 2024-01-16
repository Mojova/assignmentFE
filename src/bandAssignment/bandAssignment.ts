export interface Member {
  name: string
  age: number
  plays: string[]
}

/**
 * Object where instrument is key, names are the value.
 * Assuming we need to be able to handle arbitrary instruments, e.g. ones that are not in the example band.
 */
interface Plays {
  [key: string]: string[]
}

export interface Band {
  members: {
    current: Member[],
    past: Member[],
    all?: string[]
  }
  plays?: Plays
}

function deepCopy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export function makeAll(band: Band): Band {
  const allMembers = band.members.current.concat(band.members.past);
  const allMembersSorted = allMembers.sort((memberA, memberB) => {
    if (memberA.age !== memberB.age) {
      return memberB.age - memberA.age;
    }
    return memberA.name.localeCompare(memberB.name);
  });
  const allNamesLowercase = allMembersSorted.map(member => member.name.toLowerCase());
  // Don’t mutate original object
  const newBand = deepCopy(band);
  newBand.members.all = allNamesLowercase;
  return newBand;
}

function convertMapToPlays(map: Map<string, string[]>): Plays {
  const plays: Plays = {};
  map.forEach((names, instrument) => {
    plays[instrument] = names;
  })
  return plays;
}

export function makePlays(band: Band): Band {
  const allMembers = band.members.current.concat(band.members.past);
  // A Map with instrument as key, array of names as value. Map forces unique keys, so no need for separate
  // filtering of duplicates.
  const playsMap = new Map<string, string[]>();
  allMembers.forEach(member => {
    member.plays.forEach(instrument => {
      let names = playsMap.get(instrument);
      if (!names) {
        names = [];
        playsMap.set(instrument, names);
      }
      names.push(member.name.toLowerCase());
    });
  });
  const plays = convertMapToPlays(playsMap);
  // Don’t mutate original object
  const newBand = deepCopy(band);
  newBand.plays = plays;
  return newBand;
}

export function makeExpected(band: Band) {
  return makePlays(makeAll(band));
}

