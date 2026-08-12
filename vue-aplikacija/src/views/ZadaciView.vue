<script setup>
import { computed, ref } from 'vue'

import FilteriSortiranje from '@/components/FilteriSortiranje.vue'
import ZadatakKartica from '@/components/ZadatakKartica.vue'
import { useZadaciStore } from '@/stores/zadaci'

const zadaciStore = useZadaciStore()

const aktivniUkljuceni = ref(true)
const zavrseniUkljuceni = ref(true)
const sortiranje = ref('naziv-asc')
const pretraga = ref('')

const prikazaniZadaci = computed(() => {
  let rezultat = zadaciStore.zadaci

  rezultat = rezultat.filter((zadatak) =>
    (zadatak.status === 'aktivan' && aktivniUkljuceni.value) ||
    (zadatak.status === 'zavrsen' && zavrseniUkljuceni.value),
  )

  const pojam = pretraga.value.trim().toLocaleLowerCase('sr')

  if (pojam) {
    rezultat = rezultat.filter((zadatak) =>
      `${zadatak.naziv} ${zadatak.opis}`
        .toLocaleLowerCase('sr')
        .includes(pojam),
    )
  }

  return [...rezultat].sort((a, b) =>
    sortiranje.value === 'naziv-asc'
      ? a.naziv.localeCompare(b.naziv, 'sr')
      : b.naziv.localeCompare(a.naziv, 'sr'),
  )
})

function promeniSortiranje(novoSortiranje) {
  sortiranje.value = novoSortiranje
}

function promeniPretragu(novaPretraga) {
  pretraga.value = novaPretraga
}
</script>

<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center gap-3 mb-4">
      <div>
        <h1 class="mb-1">Zadaci</h1>
        <p class="text-muted mb-0">Pregled i organizacija svih obaveza.</p>
      </div>

      <RouterLink to="/zadaci/novi" class="btn btn-primary">
        Dodaj zadatak
      </RouterLink>
    </div>

    <FilteriSortiranje
      :aktivni-ukljuceni="aktivniUkljuceni"
      :zavrseni-ukljuceni="zavrseniUkljuceni"
      :sortiranje="sortiranje"
      :pretraga="pretraga"
      @aktivni-promenjeni="aktivniUkljuceni = $event"
      @zavrseni-promenjeni="zavrseniUkljuceni = $event"
      @sortiranje-promenjeno="promeniSortiranje"
      @pretraga-promenjena="promeniPretragu"
    />

    <div v-if="prikazaniZadaci.length" class="row g-4">
      <div
        v-for="zadatak in prikazaniZadaci"
        :key="zadatak.id"
        class="col-12 col-lg-6"
      >
        <ZadatakKartica :zadatak="zadatak" />
      </div>
    </div>

    <div v-else class="border-top py-3 text-muted">
      Nema zadataka koji odgovaraju izabranim kriterijumima.
    </div>
  </div>
</template>
