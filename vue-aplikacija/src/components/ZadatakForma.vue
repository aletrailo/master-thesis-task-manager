<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  pocetniPodaci: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['sacuvano'])

const forma = reactive({
  naziv: '',
  opis: '',
  status: 'aktivan',
})

const dodirnuto = reactive({
  naziv: false,
  opis: false,
})

const nazivNeispravan = computed(() => {
  return (
    forma.naziv.length < 3 ||
    !/\S/.test(forma.naziv)
  )
})

const opisNeispravan = computed(() => {
  return (
    forma.opis.length < 5 ||
    !/\S/.test(forma.opis)
  )
})

watch(
  () => props.pocetniPodaci,
  (podaci) => {
    if (podaci) {
      forma.naziv = podaci.naziv
      forma.opis = podaci.opis
      forma.status = podaci.status
    }
  },
  { immediate: true },
)

function sacuvaj() {
  dodirnuto.naziv = true
  dodirnuto.opis = true

  if (nazivNeispravan.value || opisNeispravan.value) {
    return
  }

  emit('sacuvano', {
    naziv: forma.naziv.trim(),
    opis: forma.opis.trim(),
    status: forma.status,
  })
}
</script>

<template>
  <form @submit.prevent="sacuvaj" novalidate>
    <div class="mb-3">
      <label for="naziv" class="form-label">Naziv</label>

      <input
        id="naziv"
        v-model="forma.naziv"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': dodirnuto.naziv && nazivNeispravan,
        }"
        @blur="dodirnuto.naziv = true"
      />

      <div
        v-if="dodirnuto.naziv && nazivNeispravan"
        class="invalid-feedback"
      >
        Naziv mora imati najmanje 3 karaktera.
      </div>
    </div>

    <div class="mb-3">
      <label for="opis" class="form-label">Opis</label>

      <textarea
        id="opis"
        v-model="forma.opis"
        rows="4"
        class="form-control"
        :class="{
          'is-invalid': dodirnuto.opis && opisNeispravan,
        }"
        @blur="dodirnuto.opis = true"
      ></textarea>

      <div
        v-if="dodirnuto.opis && opisNeispravan"
        class="invalid-feedback"
      >
        Opis mora imati najmanje 5 karaktera.
      </div>
    </div>

    <div class="mb-4">
      <label for="status-zadatka" class="form-label">
        Status
      </label>

      <select
        id="status-zadatka"
        v-model="forma.status"
        class="form-select"
      >
        <option value="aktivan">Aktivan</option>
        <option value="zavrsen">Završen</option>
      </select>
    </div>

    <div class="d-flex gap-2">
      <button type="submit" class="btn btn-primary">
        Sačuvaj
      </button>

      <RouterLink
        to="/zadaci"
        class="btn btn-outline-secondary"
      >
        Odustani
      </RouterLink>
    </div>
  </form>
</template>