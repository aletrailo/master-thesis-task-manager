import { Routes } from '@angular/router';

import { Pocetna } from './stranice/pocetna/pocetna';
import { Prijava } from './stranice/prijava/prijava';
import { Zadaci } from './stranice/zadaci/zadaci';
import { DodajZadatak } from './stranice/dodaj-zadatak/dodaj-zadatak';
import { DetaljiZadatka } from './stranice/detalji-zadatka/detalji-zadatka';
import { IzmeniZadatak } from './stranice/izmeni-zadatak/izmeni-zadatak';
import { NijePronadjeno } from './stranice/nije-pronadjeno/nije-pronadjeno';

import { autentifikacijaGuard } from './guardovi/autentifikacija-guard';
import { neprijavljenGuard } from './guardovi/neprijavljen-guard';

export const routes: Routes = [
  {
    path: '',
    component: Pocetna
  },
  {
    path: 'prijava',
    component: Prijava,
    canActivate: [neprijavljenGuard]
  },
  {
    path: 'zadaci',
    component: Zadaci,
    canActivate: [autentifikacijaGuard]
  },
  {
    path: 'zadaci/novi',
    component: DodajZadatak,
    canActivate: [autentifikacijaGuard]
  },
  {
    path: 'zadaci/:id/izmeni',
    component: IzmeniZadatak,
    canActivate: [autentifikacijaGuard]
  },
  {
    path: 'zadaci/:id',
    component: DetaljiZadatka,
    canActivate: [autentifikacijaGuard]
  },
  {
    path: '**',
    component: NijePronadjeno
  }
];