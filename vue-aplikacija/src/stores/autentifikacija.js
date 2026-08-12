import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const KLJUC_KORISNIKA = 'prijavljeniKorisnik'

export const useAutentifikacijaStore = defineStore(
  'autentifikacija',
  () => {
    const email = ref(
      localStorage.getItem(KLJUC_KORISNIKA),
    )

    const prijavljen = computed(
      () => email.value !== null,
    )

    function prijavi(unetiEmail, lozinka) {
      if (
        unetiEmail !== 'korisnik@primer.rs' ||
        lozinka !== 'master123'
      ) {
        return false
      }

      localStorage.setItem(
        KLJUC_KORISNIKA,
        unetiEmail,
      )

      email.value = unetiEmail

      return true
    }

    function odjavi() {
      localStorage.removeItem(KLJUC_KORISNIKA)
      email.value = null
    }

    return {
      email,
      prijavljen,
      prijavi,
      odjavi,
    }
  },
)