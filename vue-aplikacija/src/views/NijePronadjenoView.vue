<script setup>
import { useAutentifikacijaStore } from '@/stores/autentifikacija'

const autentifikacijaStore = useAutentifikacijaStore()
</script>

<template>
  <main
    class="nije-pronadjeno container py-5"
    :class="{ 'sa-navigacijom': autentifikacijaStore.prijavljen }"
  >
    <div class="sadrzaj mx-auto">
      <p class="text-primary fw-semibold mb-2">Greška 404</p>

      <h1 class="display-5 fw-semibold mb-3">
        Stranica nije pronađena
      </h1>

      <p class="lead text-muted mb-4">
        Stranica koju tražite ne postoji ili je premeštena.
      </p>

      <div class="text-end">
        <RouterLink
          to="/"
          class="pocetna-link link-primary text-decoration-none fw-semibold"
        >
          Nazad na početnu <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.nije-pronadjeno {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.nije-pronadjeno.sa-navigacijom {
  min-height: calc(100vh - 56px);
}

.sadrzaj {
  width: fit-content;
  max-width: 100%;
}

@media (min-width: 768px) {
  h1 {
    white-space: nowrap;
  }
}

.pocetna-link span {
  display: inline-block;
  margin-left: 0.25rem;
  transition: transform 200ms ease;
}

.pocetna-link:hover span {
  transform: translateX(7px);
}

@media (prefers-reduced-motion: reduce) {
  .pocetna-link span {
    transition: none;
  }
}
</style>
