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
    greska.value = 'Prijava nije uspela. Proverite e-mail i lozinku.'
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
  <main class="prijava container py-5">
    <div class="row justify-content-center w-100">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <div class="bg-white border rounded-4 shadow-sm p-4 p-md-5">
        <div class="mb-4">
          <h1 class="display-6 fw-semibold mb-3">Prijava</h1>
          <p class="text-muted mb-0">
            Pristupi zadacima i nastavi sa organizacijom obaveza.
          </p>

        </div>

        <form
          @submit.prevent="prijavi"
          novalidate
        >
          <div class="mb-3">
            <label for="email" class="form-label fw-medium">
              E-mail
            </label>

            <input
              id="email"
              v-model="forma.email"
              type="email"
              class="form-control form-control-lg"
              placeholder="ime@primer.rs"
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
            <label for="lozinka" class="form-label fw-medium">
              Lozinka
            </label>

            <input
              id="lozinka"
              v-model="forma.lozinka"
              type="password"
              class="form-control form-control-lg"
              placeholder="Unesite lozinku"
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

          <p
            v-if="greska"
            class="text-danger small mb-3"
            role="alert"
          >
            {{ greska }}
          </p>

          <button type="submit" class="btn btn-primary btn-lg w-100">
            Prijavi se
          </button>
        </form>

        <p class="small text-muted border-top pt-3 mt-4 mb-0">
          Demo pristup:
          <strong class="text-body">korisnik@primer.rs</strong>
          <span class="mx-1">/</span>
          <strong class="text-body">master123</strong>
        </p>

        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
.prijava {
  min-height: 100vh;
  display: grid;
  place-items: center;
}
</style>
