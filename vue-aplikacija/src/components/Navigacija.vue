<script setup>
import { useRouter } from 'vue-router'

import { useAutentifikacijaStore } from '@/stores/autentifikacija'

const router = useRouter()
const autentifikacijaStore = useAutentifikacijaStore()

function odjaviSe() {
  autentifikacijaStore.odjavi()
  router.push({ name: 'prijava' })
}
</script>

<template>
  <nav
    v-if="autentifikacijaStore.prijavljen"
    class="navbar navbar-expand-lg navbar-dark bg-dark px-3"
  >
    <div class="container-fluid d-flex justify-content-between">
      <div class="d-flex align-items-center gap-4">
        <RouterLink
          to="/"
          class="navbar-brand mb-0"
        >
          Upravljanje zadacima
        </RouterLink>

        <RouterLink
          to="/"
          class="nav-link text-white"
        >
          Početna
        </RouterLink>

        <RouterLink
          to="/zadaci"
          class="nav-link text-white"
        >
          Zadaci
        </RouterLink>
      </div>

      <div class="d-flex align-items-center gap-3">
        <span class="navbar-text text-white">
          <strong>{{ autentifikacijaStore.email }}</strong>
        </span>

        <button
          type="button"
          class="btn btn-outline-light btn-sm"
          @click="odjaviSe"
        >
          Odjavi se
        </button>
      </div>
    </div>
  </nav>
</template>