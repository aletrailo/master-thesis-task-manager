import { Component, input, output } from '@angular/core';

import { StatusZadatka } from '../../modeli/zadatak';

export type FilterStatusa = 'svi' | StatusZadatka;
export type SortiranjeZadataka = 'naziv-asc' | 'naziv-desc';

@Component({
  selector: 'app-filteri-sortiranje',
  templateUrl: './filteri-sortiranje.html',
  styleUrl: './filteri-sortiranje.scss'
})
export class FilteriSortiranje {
  readonly status = input.required<FilterStatusa>();
  readonly sortiranje = input.required<SortiranjeZadataka>();

  readonly statusPromenjen = output<FilterStatusa>();
  readonly sortiranjePromenjeno = output<SortiranjeZadataka>();

  promeniStatus(event: Event): void {
    const vrednost = (event.target as HTMLSelectElement).value as FilterStatusa;
    this.statusPromenjen.emit(vrednost);
  }

  promeniSortiranje(event: Event): void {
    const vrednost = (event.target as HTMLSelectElement).value as SortiranjeZadataka;
    this.sortiranjePromenjeno.emit(vrednost);
  }
}