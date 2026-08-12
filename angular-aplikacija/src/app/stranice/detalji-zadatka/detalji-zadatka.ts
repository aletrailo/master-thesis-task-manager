import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ServisZadataka } from '../../servisi/servis-zadataka';

@Component({
  selector: 'app-detalji-zadatka',
  imports: [RouterLink],
  templateUrl: './detalji-zadatka.html',
  styleUrl: './detalji-zadatka.scss'
})
export class DetaljiZadatka {
  private readonly servisZadataka = inject(ServisZadataka);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly zadatak = this.servisZadataka.pronadjiPoId(this.id);

  obrisi(): void {
    if (!this.zadatak) {
      return;
    }

    const potvrda = window.confirm(
      `Da li ste sigurni da želite da obrišete zadatak "${this.zadatak.naziv}"?`
    );

    if (!potvrda) {
      return;
    }

    this.servisZadataka.obrisi(this.id);
    this.router.navigate(['/zadaci']);
  }
}