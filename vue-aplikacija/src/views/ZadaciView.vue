<script setup>
import { computed, ref } from 'vue'

import FilteriSortiranje from '@/components/FilteriSortiranje.vue'
import ZadatakKartica from '@/components/ZadatakKartica.vue'
import { useZadaciStore } from '@/stores/zadaci'

const zadaciStore = useZadaciStore()

const status = ref('svi')
const sortiranje = ref('naziv-asc')

const prikazaniZadaci = computed(() => {
  let rezultat = zadaciStore.zadaci

  if (status.value !== 'svi') {
    rezultat = rezultat.filter(
      (zadatak) => zadatak.status === status.value,
    )
  }

  return [...rezultat].sort((a, b) =>
    sortiranje.value === 'naziv-asc'
      ? a.naziv.localeCompare(b.naziv, 'sr')
      : b.naziv.localeCompare(a.naziv, 'sr'),
  )
})

function promeniStatus(noviStatus) {
  status.value = noviStatus
}

function promeniSortiranje(novoSortiranje) {
  sortiranje.value = novoSortiranje
}
</script>

<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Zadaci</h1>

      <RouterLink to="/zadaci/novi" class="btn btn-primary">
        Dodaj zadatak
      </RouterLink>
    </div>

    <FilteriSortiranje
      :status="status"
      :sortiranje="sortiranje"
      @status-promenjen="promeniStatus"
      @sortiranje-promenjeno="promeniSortiranje"
    />

    <div v-if="prikazaniZadaci.length" class="row g-4">
      <div
        v-for="zadatak in prikazaniZadaci"
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
