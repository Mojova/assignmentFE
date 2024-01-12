export interface Member {
  name: string
  age: number
  plays: string[]
}

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

export function makeAll(band: Band) {
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

function convertMapToPlays(map: Map<string, Set<string>>): Plays {
  const plays: Plays = {};
  map.forEach((namesSet, instrument) => {
    const names: string[] = [];
    for (let name of namesSet) {
      names.push(name);
    }
    plays[instrument] = names;
  })
  return plays;
}

export function makePlays(band: Band) {
  const allMembers = band.members.current.concat(band.members.past);
  // A Map with instrument as key, Set of names as value. Map and Set force unique values, so no need for separate
  // filtering of duplicates.
  const playsMap = new Map<string, Set<string>>();
  allMembers.forEach(member => {
    member.plays.forEach(instrument => {
      let namesSet = playsMap.get(instrument);
      if (!namesSet) {
        namesSet = new Set<string>();
        playsMap.set(instrument, namesSet);
      }
      namesSet.add(member.name.toLowerCase());
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

