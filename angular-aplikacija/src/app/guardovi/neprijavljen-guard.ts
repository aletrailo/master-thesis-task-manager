import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ServisAutentifikacije } from '../servisi/servis-autentifikacije';

export const neprijavljenGuard: CanActivateFn = () => {
  const servisAutentifikacije = inject(ServisAutentifikacije);
  const router = inject(Router);

  if (!servisAutentifikacije.prijavljen()) {
    return true;
  }

  return router.createUrlTree(['/zadaci']);
};