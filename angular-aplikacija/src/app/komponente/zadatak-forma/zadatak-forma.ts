import { Component, effect, inject, input, output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Zadatak } from '../../modeli/zadatak';

@Component({
  selector: 'app-zadatak-forma',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './zadatak-forma.html',
  styleUrl: './zadatak-forma.scss'
})
export class ZadatakForma {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly pocetniPodaci = input<Omit<Zadatak, 'id'> | null>(null);
  readonly sacuvano = output<Omit<Zadatak, 'id'>>();

  readonly forma = this.formBuilder.group({
    naziv: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/\S/)
      ]
    ],
    opis: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/\S/)
      ]
    ],
    status: this.formBuilder.control<Zadatak['status']>('aktivan')
  });

  constructor() {
    effect(() => {
      const podaci = this.pocetniPodaci();

      if (podaci) {
        this.forma.setValue(podaci);
      }
    });
  }

  sacuvaj(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    const podaci = this.forma.getRawValue();

    this.sacuvano.emit({
      naziv: podaci.naziv.trim(),
      opis: podaci.opis.trim(),
      status: podaci.status
    });
  }
}