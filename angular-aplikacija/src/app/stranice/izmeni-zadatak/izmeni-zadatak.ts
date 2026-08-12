import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ZadatakForma } from '../../komponente/zadatak-forma/zadatak-forma';
import { Zadatak } from '../../modeli/zadatak';
import { ServisZadataka } from '../../servisi/servis-zadataka';

@Component({
  selector: 'app-izmeni-zadatak',
  imports: [ZadatakForma],
  templateUrl: './izmeni-zadatak.html',
  styleUrl: './izmeni-zadatak.scss'
})
export class IzmeniZadatak {
  private readonly servisZadataka = inject(ServisZadataka);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly zadatak = this.servisZadataka.pronadjiPoId(this.id);

  izmeni(podaci: Omit<Zadatak, 'id'>): void {
    this.servisZadataka.izmeni(this.id, podaci);
    this.router.navigate(['/zadaci']);
  }
}