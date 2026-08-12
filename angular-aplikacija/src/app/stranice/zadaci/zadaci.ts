import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  FilteriSortiranje,
  SortiranjeZadataka
} from '../../komponente/filteri-sortiranje/filteri-sortiranje';
import { ZadatakKartica } from '../../komponente/zadatak-kartica/zadatak-kartica';
import { ServisZadataka } from '../../servisi/servis-zadataka';

@Component({
  selector: 'app-zadaci',
  imports: [
    RouterLink,
    FilteriSortiranje,
    ZadatakKartica
  ],
  templateUrl: './zadaci.html',
  styleUrl: './zadaci.scss'
})
export class Zadaci {
  private readonly servisZadataka = inject(ServisZadataka);

  readonly zadaci = this.servisZadataka.zadaci;

  readonly aktivniUkljuceni = signal(true);
  readonly zavrseniUkljuceni = signal(true);
  readonly sortiranje = signal<SortiranjeZadataka>('naziv-asc');
  readonly pretraga = signal('');

  readonly prikazaniZadaci = computed(() => {
    const sortiranje = this.sortiranje();
    const pojam = this.pretraga().trim().toLocaleLowerCase('sr');

    let rezultat = this.zadaci();

    rezultat = rezultat.filter(zadatak =>
      (zadatak.status === 'aktivan' && this.aktivniUkljuceni()) ||
      (zadatak.status === 'zavrsen' && this.zavrseniUkljuceni())
    );

    if (pojam) {
      rezultat = rezultat.filter(zadatak =>
        `${zadatak.naziv} ${zadatak.opis}`
          .toLocaleLowerCase('sr')
          .includes(pojam)
      );
    }

    return [...rezultat].sort((a, b) =>
      sortiranje === 'naziv-asc'
        ? a.naziv.localeCompare(b.naziv, 'sr')
        : b.naziv.localeCompare(a.naziv, 'sr')
    );
  });
}
