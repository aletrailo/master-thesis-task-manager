<script setup>
import { useRouter } from 'vue-router'

import { useAutentifikacijaStore } from '@/stores/autentifikacija'

const autentifikacijaStore = useAutentifikacijaStore()
const router = useRouter()

function odjavi() {
  autentifikacijaStore.odjavi()
  router.push({ name: 'prijava' })
}
</script>

<template>
  <nav class="navbar bg-dark" data-bs-theme="dark">
    <div class="container d-flex justify-content-between">
      <RouterLink to="/" class="navbar-brand">
        Upravljanje zadacima
      </RouterLink>

      <div class="d-flex align-items-center gap-3">
        <RouterLink to="/" class="nav-link text-light">
          Početna
        </RouterLink>

        <template v-if="autentifikacijaStore.prijavljen">
          <RouterLink
            to="/zadaci"
            class="nav-link text-light"
          >
            Zadaci
          </RouterLink>

          <span class="text-light small">
            {{ autentifikacijaStore.email }}
          </span>

          <button
            type="button"
            class="btn btn-outline-light btn-sm"
            @click="odjavi"
          >
            Odjavi se
          </button>
        </template>

        <RouterLink
          v-else
          to="/prijava"
          class="btn btn-outline-light btn-sm"
        >
          Prijava
        </RouterLink>
      </div>
    </div>
  </nav>
</template>