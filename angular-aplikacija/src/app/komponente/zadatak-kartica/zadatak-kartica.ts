import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Zadatak } from '../../modeli/zadatak';

@Component({
  selector: 'app-zadatak-kartica',
  imports: [RouterLink],
  templateUrl: './zadatak-kartica.html',
  styleUrl: './zadatak-kartica.scss'
})
export class ZadatakKartica {
  readonly zadatak = input.required<Zadatak>();
}