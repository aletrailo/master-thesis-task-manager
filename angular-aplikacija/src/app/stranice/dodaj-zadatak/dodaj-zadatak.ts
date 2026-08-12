import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ZadatakForma } from '../../komponente/zadatak-forma/zadatak-forma';
import { Zadatak } from '../../modeli/zadatak';
import { ServisZadataka } from '../../servisi/servis-zadataka';

@Component({
  selector: 'app-dodaj-zadatak',
  imports: [ZadatakForma],
  templateUrl: './dodaj-zadatak.html',
  styleUrl: './dodaj-zadatak.scss'
})
export class DodajZadatak {
  private readonly servisZadataka = inject(ServisZadataka);
  private readonly router = inject(Router);

  dodaj(podaci: Omit<Zadatak, 'id'>): void {
    this.servisZadataka.dodaj(podaci);
    this.router.navigate(['/zadaci']);
  }
}