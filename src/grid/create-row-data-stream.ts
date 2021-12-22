import type { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import nameGenerator from 'random-names-generator';

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

const getRandomIntWithMax = (max: number): number => Math.floor(Math.random() * (max + 1));

const minAge = new Date('1999/12/31').getTime();

const padInteger = (num: number): string => {
  if (num >= 10) {
    return `${num}`;
  }

  return `0${num}`;
}

const getRandomAgeString = (): string => {
  const dob = new Date(getRandomIntWithMax(minAge));
  const year = dob.getUTCFullYear();
  const month = padInteger(dob.getUTCMonth() + 1);
  const day = padInteger(dob.getUTCDate());
  
  return `${year}/${month}/${day}`
}

export const createRowDataStream = (numberOfRows: number, dataInterval: number): Observable<RowData> => {
  const initialRows = [...Array(numberOfRows)].map<Row>((_, i) => ({
    id: i,
    name: nameGenerator.random(),
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
