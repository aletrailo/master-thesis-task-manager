import { Service, signal } from '@angular/core';

import { Zadatak } from '../modeli/zadatak';

@Service()
export class ServisZadataka {
  private readonly _zadaci = signal<Zadatak[]>([
    {
      id: 1,
      naziv: 'Naučiti Angular',
      opis: 'Proći kroz osnovne koncepte i praktičnu implementaciju.',
      status: 'aktivan'
    },
    {
      id: 2,
      naziv: 'Naučiti Vue.js',
      opis: 'Implementirati iste funkcionalnosti u Vue.js aplikaciji.',
      status: 'zavrsen'
    }
  ]);

  readonly zadaci = this._zadaci.asReadonly();

  pronadjiPoId(id: number): Zadatak | undefined {
    return this._zadaci().find(zadatak => zadatak.id === id);
  }

  dodaj(zadatak: Omit<Zadatak, 'id'>): void {
    const noviId =
      Math.max(0, ...this._zadaci().map(zadatak => zadatak.id)) + 1;

    this._zadaci.update(zadaci => [
      ...zadaci,
      {
        id: noviId,
        ...zadatak
      }
    ]);
  }

  izmeni(id: number, podaci: Omit<Zadatak, 'id'>): void {
    this._zadaci.update(zadaci =>
      zadaci.map(zadatak =>
        zadatak.id === id
          ? { id, ...podaci }
          : zadatak
      )
    );
  }

  obrisi(id: number): void {
    this._zadaci.update(zadaci =>
      zadaci.filter(zadatak => zadatak.id !== id)
    );
  }
}