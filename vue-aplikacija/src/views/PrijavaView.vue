<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAutentifikacijaStore } from '@/stores/autentifikacija'

const autentifikacijaStore = useAutentifikacijaStore()
const route = useRoute()
const router = useRouter()

const forma = reactive({
  email: '',
  lozinka: '',
})

const dodirnuto = reactive({
  email: false,
  lozinka: false,
})

const greska = ref('')

const emailNeispravan = computed(() => {
  const email = forma.email.trim()

  return (
    email === '' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
})

const lozinkaNeispravna = computed(() => {
  return forma.lozinka.length < 6
})

function prijavi() {
  greska.value = ''

  dodirnuto.email = true
  dodirnuto.lozinka = true

  if (
    emailNeispravan.value ||
    lozinkaNeispravna.value
  ) {
    return
  }

  const uspesno = autentifikacijaStore.prijavi(
    forma.email.trim(),
    forma.lozinka,
  )

  if (!uspesno) {
    greska.value = 'E-mail ili lozinka nisu ispravni.'
    return
  }

  const redirect =
    typeof route.query.redirect === 'string'
      ? route.query.redirect
      : '/zadaci'

  router.push(redirect)
}
</script>

<template>
  <div class="container py-5">
    <div class="mx-auto" style="max-width: 500px">
      <h1 class="mb-4">Prijava</h1>

      <div class="alert alert-info">
        <strong>Demonstracioni podaci:</strong><br>
        korisnik@primer.rs<br>
        master123
      </div>

      <div
        v-if="greska"
        class="alert alert-danger"
      >
        {{ greska }}
      </div>

      <form
        @submit.prevent="prijavi"
        novalidate
      >
        <div class="mb-3">
          <label for="email" class="form-label">
            E-mail
          </label>

          <input
            id="email"
            v-model="forma.email"
            type="email"
            class="form-control"
            :class="{
              'is-invalid':
                dodirnuto.email && emailNeispravan,
            }"
            @blur="dodirnuto.email = true"
          >

          <div
            v-if="
              dodirnuto.email &&
              emailNeispravan
            "
            class="invalid-feedback"
          >
            Unesite ispravnu e-mail adresu.
          </div>
        </div>

        <div class="mb-4">
          <label for="lozinka" class="form-label">
            Lozinka
          </label>

          <input
            id="lozinka"
            v-model="forma.lozinka"
            type="password"
            class="form-control"
            :class="{
              'is-invalid':
                dodirnuto.lozinka &&
                lozinkaNeispravna,
            }"
            @blur="dodirnuto.lozinka = true"
          >

          <div
            v-if="
              dodirnuto.lozinka &&
              lozinkaNeispravna
            "
            class="invalid-feedback"
          >
            Lozinka mora imati najmanje 6 karaktera.
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Prijavi se
        </button>
      </form>
    </div>
  </div>
</template>