import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ServisAutentifikacije } from '../../servisi/servis-autentifikacije';

@Component({
  selector: 'app-nije-pronadjeno',
  imports: [RouterLink],
  templateUrl: './nije-pronadjeno.html',
  styleUrl: './nije-pronadjeno.scss'
})
export class NijePronadjeno {
  private readonly servisAutentifikacije =
    inject(ServisAutentifikacije);

  readonly prijavljen =
    this.servisAutentifikacije.prijavljen;
}
