import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ServisAutentifikacije } from '../../servisi/servis-autentifikacije';

@Component({
  selector: 'app-pocetna',
  imports: [RouterLink],
  templateUrl: './pocetna.html',
  styleUrl: './pocetna.scss'
})
export class Pocetna {
  private readonly servisAutentifikacije = inject(ServisAutentifikacije);

  readonly prijavljen = this.servisAutentifikacije.prijavljen;
}
