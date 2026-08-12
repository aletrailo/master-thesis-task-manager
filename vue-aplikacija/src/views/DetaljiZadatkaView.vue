<script setup>
import { useRoute, useRouter } from 'vue-router'

import { useZadaciStore } from '@/stores/zadaci'

const zadaciStore = useZadaciStore()
const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)
const zadatak = zadaciStore.pronadjiPoId(id)

function obrisi() {
  if (!zadatak) {
    return
  }

  const potvrda = window.confirm(
    `Da li ste sigurni da želite da obrišete zadatak "${zadatak.naziv}"?`,
  )

  if (!potvrda) {
    return
  }

  zadaciStore.obrisi(id)
  router.push({ name: 'zadaci' })
}
</script>

<template>
  <div class="container py-5">
    <div class="mx-auto" style="max-width: 700px">
      <template v-if="zadatak">
        <article class="card border shadow-sm rounded-4 overflow-hidden">
          <div class="card-header bg-white d-flex justify-content-between align-items-center gap-3 p-4">
            <h1 class="h2 mb-0">
              {{ zadatak.naziv }}
            </h1>

            <span
              class="d-inline-block rounded-pill px-3 py-1 small fw-normal flex-shrink-0"
              :class="{
                'text-bg-warning': zadatak.status === 'aktivan',
                'text-bg-success': zadatak.status === 'zavrsen',
              }"
            >
              {{ zadatak.status === 'aktivan' ? 'Aktivan' : 'Završen' }}
            </span>
          </div>

          <div class="card-body p-4">
            <h2 class="h6 text-muted text-uppercase mb-3">Opis</h2>

            <p class="mb-0 lh-lg">
              {{ zadatak.opis }}
            </p>
          </div>

          <div class="card-footer bg-white d-flex flex-column-reverse flex-sm-row justify-content-between gap-3 p-4">
            <RouterLink
              to="/zadaci"
              class="btn btn-outline-secondary"
            >
              Nazad na zadatke
            </RouterLink>

            <div class="d-flex gap-2">
              <RouterLink
                :to="{
                  name: 'izmeni-zadatak',
                  params: { id: zadatak.id },
                }"
                class="btn btn-primary"
              >
                Izmeni
              </RouterLink>

              <button
                type="button"
                class="btn btn-outline-danger"
                @click="obrisi"
              >
                Obriši
              </button>
            </div>
          </div>
        </article>
      </template>

      <template v-else>
        <div class="alert alert-warning">
          Zadatak nije pronađen.
        </div>

        <RouterLink
          to="/zadaci"
          class="btn btn-outline-secondary"
        >
          Nazad na zadatke
        </RouterLink>
      </template>
    </div>
  </div>
</template>
