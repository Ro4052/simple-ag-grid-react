import type { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Row {
  id: number;
  name: string;
  dob: string;
  random: number;
}

export interface RowData {
  rows: Row[];
  version: number;
}

const names = [
  'Jeff',
  'Sarah',
  'Bob',
  'Alice'
];

const getRandomIntWithMax = (max: number): number => Math.floor(Math.random() * (max + 1));

const minAge = new Date('1999/12/31').getTime();
const getRandomAgeString = (): string => {
  const dob = new Date(getRandomIntWithMax(minAge));
  return `${dob.getUTCFullYear()}/${dob.getUTCMonth()}/${dob.getUTCDate()}`
}

export const createRowDataStream = (numberOfRows: number, dataInterval: number): Observable<RowData> => {
  const initialRows = [...Array(numberOfRows)].map<Row>((_, i) => ({
    id: i,
    name: names[getRandomIntWithMax(names.length - 1)],
    dob: getRandomAgeString(),
    random: getRandomIntWithMax(100)
  }));

  return interval(dataInterval).pipe(
    map((intervalIndex) => ({
      rows: initialRows.map((row) => ({ ...row, random: getRandomIntWithMax(100) })),
      version: intervalIndex + 1
    })),
    startWith({ 
      rows: initialRows,
      version: 0
    })
  );
}
