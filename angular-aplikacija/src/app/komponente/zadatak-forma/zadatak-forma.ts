import { Component, effect, inject, input, output } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Zadatak } from '../../modeli/zadatak';

function minimalnaTrimovanaDuzina(duzina: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>
    String(control.value).trim().length >= duzina
      ? null
      : { minimalnaTrimovanaDuzina: true };
}

@Component({
  selector: 'app-zadatak-forma',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './zadatak-forma.html',
  styleUrl: './zadatak-forma.scss'
})
export class ZadatakForma {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly naslov = input.required<string>();
  readonly pocetniPodaci = input<Omit<Zadatak, 'id'> | null>(null);
  readonly sacuvano = output<Omit<Zadatak, 'id'>>();

  readonly forma = this.formBuilder.group({
    naziv: [
      '',
      [
        Validators.required,
        minimalnaTrimovanaDuzina(3)
      ]
    ],
    opis: [
      '',
      [
        Validators.required,
        minimalnaTrimovanaDuzina(5)
      ]
    ],
    status: this.formBuilder.control<Zadatak['status']>('aktivan')
  });

  constructor() {
    effect(() => {
      const podaci = this.pocetniPodaci();

      if (podaci) {
        this.forma.setValue({
          naziv: podaci.naziv,
          opis: podaci.opis,
          status: podaci.status
        });
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

  promeniStatus(status: Zadatak['status']): void {
    this.forma.controls.status.setValue(status);
  }
}
