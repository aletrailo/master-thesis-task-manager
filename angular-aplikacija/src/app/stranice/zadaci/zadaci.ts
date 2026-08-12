import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZadatakKartica } from '../../komponente/zadatak-kartica/zadatak-kartica';
import { ServisZadataka } from '../../servisi/servis-zadataka';

@Component({
  selector: 'app-zadaci',
  imports: [RouterLink, ZadatakKartica],
  templateUrl: './zadaci.html',
  styleUrl: './zadaci.scss'
})
export class Zadaci {
  private readonly servisZadataka = inject(ServisZadataka);

  readonly zadaci = this.servisZadataka.zadaci;
}