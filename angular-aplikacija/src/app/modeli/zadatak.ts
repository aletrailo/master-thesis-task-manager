export type StatusZadatka = 'aktivan' | 'zavrsen';

export interface Zadatak {
  id: number;
  naziv: string;
  opis: string;
  status: StatusZadatka;
}
