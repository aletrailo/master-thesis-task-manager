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
        <div class="d-flex justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h1 class="mb-2">
              {{ zadatak.naziv }}
            </h1>

            <span
              class="badge"
              :class="{
                'bg-warning-subtle text-warning-emphasis': zadatak.status === 'aktivan',
                'text-bg-success': zadatak.status === 'zavrsen',
              }"
            >
              {{ zadatak.status === 'aktivan' ? 'Aktivan' : 'Završen' }}
            </span>
          </div>
        </div>

        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="h5">Opis</h2>

            <p class="mb-0">
              {{ zadatak.opis }}
            </p>
          </div>
        </div>

        <div class="d-flex flex-wrap gap-2 mt-4">
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

          <RouterLink
            to="/zadaci"
            class="btn btn-outline-secondary"
          >
            Nazad na zadatke
          </RouterLink>
        </div>
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
