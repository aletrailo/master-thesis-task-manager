<script setup>
import ZadatakKartica from '@/components/ZadatakKartica.vue'
import { useZadaciStore } from '@/stores/zadaci'

const zadaciStore = useZadaciStore()
</script>

<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Zadaci</h1>

      <RouterLink to="/zadaci/novi" class="btn btn-primary">
        Dodaj zadatak
      </RouterLink>
    </div>

    <div v-if="zadaciStore.zadaci.length" class="row g-4">
      <div
        v-for="zadatak in zadaciStore.zadaci"
        :key="zadatak.id"
        class="col-12 col-md-6"
      >
        <ZadatakKartica :zadatak="zadatak" />
      </div>
    </div>

    <div v-else class="alert alert-info mb-0">
      Nema zadataka.
    </div>
  </div>
</template>
