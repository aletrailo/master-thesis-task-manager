import { Component, input, output } from '@angular/core';

export type SortiranjeZadataka = 'naziv-asc' | 'naziv-desc';

@Component({
  selector: 'app-filteri-sortiranje',
  templateUrl: './filteri-sortiranje.html',
  styleUrl: './filteri-sortiranje.scss'
})
export class FilteriSortiranje {
  readonly aktivniUkljuceni = input.required<boolean>();
  readonly zavrseniUkljuceni = input.required<boolean>();
  readonly sortiranje = input.required<SortiranjeZadataka>();
  readonly pretraga = input.required<string>();

  readonly aktivniPromenjeni = output<boolean>();
  readonly zavrseniPromenjeni = output<boolean>();
  readonly sortiranjePromenjeno = output<SortiranjeZadataka>();
  readonly pretragaPromenjena = output<string>();

  promeniSortiranje(event: Event): void {
    const vrednost = (event.target as HTMLSelectElement).value as SortiranjeZadataka;
    this.sortiranjePromenjeno.emit(vrednost);
  }

  promeniPretragu(event: Event): void {
    const vrednost = (event.target as HTMLInputElement).value;
    this.pretragaPromenjena.emit(vrednost);
  }
}
