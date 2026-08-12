<script setup>
import { useRoute, useRouter } from 'vue-router'

import ZadatakForma from '@/components/ZadatakForma.vue'
import { useZadaciStore } from '@/stores/zadaci'

const zadaciStore = useZadaciStore()
const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)
const zadatak = zadaciStore.pronadjiPoId(id)

function izmeni(podaci) {
  zadaciStore.izmeni(id, podaci)
  router.push({ name: 'zadaci' })
}
</script>

<template>
  <div class="container py-5">
    <div class="mx-auto" style="max-width: 700px">
      <h1 class="mb-4">Izmeni zadatak</h1>

      <ZadatakForma
        v-if="zadatak"
        :pocetni-podaci="zadatak"
        @sacuvano="izmeni"
      />

      <div v-else class="alert alert-warning">
        Zadatak nije pronađen.
      </div>
    </div>
  </div>
</template>