import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServisAutentifikacije } from '../../servisi/servis-autentifikacije';

@Component({
  selector: 'app-prijava',
  imports: [ReactiveFormsModule],
  templateUrl: './prijava.html',
  styleUrl: './prijava.scss'
})
export class Prijava {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly servisAutentifikacije = inject(ServisAutentifikacije);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly greska = signal('');

  readonly forma = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    lozinka: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  prijavi(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    const podaci = this.forma.getRawValue();

    const uspesno = this.servisAutentifikacije.prijavi(
      podaci.email.trim(),
      podaci.lozinka
    );

    if (!uspesno) {
      this.greska.set('E-mail ili lozinka nisu ispravni.');
      return;
    }

    const redirect =
      this.route.snapshot.queryParamMap.get('redirect') ?? '/zadaci';

    this.router.navigateByUrl(redirect);
  }
}