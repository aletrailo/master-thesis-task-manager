<script setup>
import { useRouter } from 'vue-router'

import ZadatakForma from '@/components/ZadatakForma.vue'
import { useZadaciStore } from '@/stores/zadaci'

const zadaciStore = useZadaciStore()
const router = useRouter()

function dodaj(podaci) {
  zadaciStore.dodaj(podaci)
  router.push({ name: 'zadaci' })
}
</script>

<template>
  <div class="container py-5">
    <div class="mx-auto" style="max-width: 700px">
      <h1 class="mb-4">Dodaj zadatak</h1>

      <ZadatakForma @sacuvano="dodaj" />
    </div>
  </div>
</template>