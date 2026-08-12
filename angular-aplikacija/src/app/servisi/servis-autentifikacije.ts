import { computed, Service, signal } from '@angular/core';

const KLJUC_KORISNIKA = 'prijavljeniKorisnik';

@Service()
export class ServisAutentifikacije {
  private readonly _email = signal<string | null>(
    localStorage.getItem(KLJUC_KORISNIKA)
  );

  readonly email = this._email.asReadonly();
  readonly prijavljen = computed(() => this._email() !== null);

  prijavi(email: string, lozinka: string): boolean {
    if (email !== 'korisnik@primer.rs' || lozinka !== 'master123') {
      return false;
    }

    localStorage.setItem(KLJUC_KORISNIKA, email);
    this._email.set(email);

    return true;
  }

  odjavi(): void {
    localStorage.removeItem(KLJUC_KORISNIKA);
    this._email.set(null);
  }
}