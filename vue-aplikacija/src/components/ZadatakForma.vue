<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  naslov: {
    type: String,
    required: true,
  },
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

const nazivNeispravan = computed(() =>
  forma.naziv.length < 3 || !/\S/.test(forma.naziv),
)

const opisNeispravan = computed(() =>
  forma.opis.length < 5 || !/\S/.test(forma.opis),
)

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
  <form
    class="card border shadow-sm rounded-4 overflow-hidden"
    @submit.prevent="sacuvaj"
    novalidate
  >
    <div class="card-header bg-white p-4">
      <h1 class="h2 mb-0">{{ naslov }}</h1>
    </div>

    <div class="card-body p-4">
      <div class="mb-3">
        <label for="naziv" class="form-label">Naziv</label>
        <input
          id="naziv"
          v-model="forma.naziv"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': dodirnuto.naziv && nazivNeispravan }"
          @blur="dodirnuto.naziv = true"
        >

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
          :class="{ 'is-invalid': dodirnuto.opis && opisNeispravan }"
          @blur="dodirnuto.opis = true"
        ></textarea>

        <div
          v-if="dodirnuto.opis && opisNeispravan"
          class="invalid-feedback"
        >
          Opis mora imati najmanje 5 karaktera.
        </div>
      </div>

      <div>
        <span class="form-label d-block">Status</span>

        <div
          class="d-flex gap-2"
          role="radiogroup"
          aria-label="Status zadatka"
        >
          <button
            type="button"
            class="btn rounded-pill px-3"
            :class="forma.status === 'aktivan'
              ? 'btn-warning'
              : 'btn-outline-secondary'"
            role="radio"
            :aria-checked="forma.status === 'aktivan'"
            @click="forma.status = 'aktivan'"
          >
            Aktivan
          </button>

          <button
            type="button"
            class="btn rounded-pill px-3"
            :class="forma.status === 'zavrsen'
              ? 'btn-success'
              : 'btn-outline-secondary'"
            role="radio"
            :aria-checked="forma.status === 'zavrsen'"
            @click="forma.status = 'zavrsen'"
          >
            Završen
          </button>
        </div>
      </div>
    </div>

    <div class="card-footer bg-white d-flex justify-content-between gap-3 p-4">
      <RouterLink to="/zadaci" class="btn btn-outline-secondary">
        Odustani
      </RouterLink>

      <button type="submit" class="btn btn-primary">
        Sačuvaj
      </button>
    </div>
  </form>
</template>
