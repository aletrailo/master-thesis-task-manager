import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ServisAutentifikacije } from '../../servisi/servis-autentifikacije';

@Component({
  selector: 'app-navigacija',
  imports: [RouterLink],
  templateUrl: './navigacija.html',
  styleUrl: './navigacija.scss'
})
export class Navigacija {
  private readonly servisAutentifikacije = inject(ServisAutentifikacije);
  private readonly router = inject(Router);

  readonly prijavljen = this.servisAutentifikacije.prijavljen;
  readonly email = this.servisAutentifikacije.email;

  odjavi(): void {
    this.servisAutentifikacije.odjavi();
    this.router.navigate(['/prijava']);
  }
}