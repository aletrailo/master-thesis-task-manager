import { Component, inject, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { ServisAutentifikacije } from '../../servisi/servis-autentifikacije';

@Component({
  selector: 'app-navigacija',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigacija.html',
  styleUrl: './navigacija.scss'
})
export class Navigacija {
  private readonly servisAutentifikacije =
    inject(ServisAutentifikacije);

  private readonly router = inject(Router);

  readonly prijavljen =
    this.servisAutentifikacije.prijavljen;

  readonly email =
    this.servisAutentifikacije.email;

  readonly meniOtvoren = signal(false);

  zatvoriMeni(): void {
    this.meniOtvoren.set(false);
  }

  promeniMeni(): void {
    this.meniOtvoren.update(
      otvoren => !otvoren
    );
  }

  odjavi(): void {
    this.zatvoriMeni();
    this.servisAutentifikacije.odjavi();
    this.router.navigate(['/prijava']);
  }
}
