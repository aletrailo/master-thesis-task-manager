import { Routes } from '@angular/router';

import { Pocetna } from './stranice/pocetna/pocetna';
import { Prijava } from './stranice/prijava/prijava';
import { Zadaci } from './stranice/zadaci/zadaci';
import { DodajZadatak } from './stranice/dodaj-zadatak/dodaj-zadatak';
import { DetaljiZadatka } from './stranice/detalji-zadatka/detalji-zadatka';
import { IzmeniZadatak } from './stranice/izmeni-zadatak/izmeni-zadatak';
import { NijePronadjeno } from './stranice/nije-pronadjeno/nije-pronadjeno';

export const routes: Routes = [
  {
    path: '',
    component: Pocetna
  },
  {
    path: 'prijava',
    component: Prijava
  },
  {
    path: 'zadaci',
    component: Zadaci
  },
  {
    path: 'zadaci/novi',
    component: DodajZadatak
  },
  {
    path: 'zadaci/:id/izmeni',
    component: IzmeniZadatak
  },
  {
    path: 'zadaci/:id',
    component: DetaljiZadatka
  },
  {
    path: '**',
    component: NijePronadjeno
  }
];