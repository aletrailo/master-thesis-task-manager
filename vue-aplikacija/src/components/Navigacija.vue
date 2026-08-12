<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAutentifikacijaStore } from '@/stores/autentifikacija'

const router = useRouter()
const route = useRoute()
const autentifikacijaStore = useAutentifikacijaStore()

const meniOtvoren = ref(false)

function zatvoriMeni() {
  meniOtvoren.value = false
}

function promeniMeni() {
  meniOtvoren.value = !meniOtvoren.value
}

function odjaviSe() {
  zatvoriMeni()
  autentifikacijaStore.odjavi()
  router.push({ name: 'prijava' })
}
</script>

<template>
  <nav
    v-if="autentifikacijaStore.prijavljen"
    class="navbar navbar-expand-lg navbar-dark bg-dark py-2"
  >
    <div class="container">
      <RouterLink
        to="/"
        class="navbar-brand fw-semibold"
        @click="zatvoriMeni"
      >
        Upravljanje zadacima
      </RouterLink>

      <button
        type="button"
        class="navbar-toggler"
        aria-controls="glavna-navigacija"
        aria-label="Prikaži navigaciju"
        :aria-expanded="meniOtvoren"
        @click="promeniMeni"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        id="glavna-navigacija"
        class="collapse navbar-collapse"
        :class="{ show: meniOtvoren }"
      >
        <ul class="navbar-nav me-auto mb-3 mb-lg-0 ms-lg-4 gap-lg-1">
          <li class="nav-item">
            <RouterLink
              to="/"
              class="nav-link"
              exact-active-class="active text-warning"
              @click="zatvoriMeni"
            >
              Početna
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/zadaci"
              class="nav-link"
              :class="{
                'active text-warning':
                  route.path === '/zadaci' ||
                  route.path.startsWith('/zadaci/'),
              }"
              @click="zatvoriMeni"
            >
              Zadaci
            </RouterLink>
          </li>
        </ul>

        <div
          class="d-flex flex-column flex-lg-row align-items-lg-center gap-3"
        >
          <span class="navbar-text small py-0">
            {{ autentifikacijaStore.email }}
          </span>

          <button
            type="button"
            class="btn btn-outline-light btn-sm px-3"
            @click="odjaviSe"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
