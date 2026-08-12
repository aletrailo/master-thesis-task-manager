import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  FilteriSortiranje,
  FilterStatusa,
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

  readonly status = signal<FilterStatusa>('svi');
  readonly sortiranje = signal<SortiranjeZadataka>('naziv-asc');

  readonly prikazaniZadaci = computed(() => {
    const status = this.status();
    const sortiranje = this.sortiranje();

    let rezultat = this.zadaci();

    if (status !== 'svi') {
      rezultat = rezultat.filter(
        zadatak => zadatak.status === status
      );
    }

    return [...rezultat].sort((a, b) =>
      sortiranje === 'naziv-asc'
        ? a.naziv.localeCompare(b.naziv, 'sr')
        : b.naziv.localeCompare(a.naziv, 'sr')
    );
  });
}