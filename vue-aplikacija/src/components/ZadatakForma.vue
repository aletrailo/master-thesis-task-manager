<script setup>
import { reactive, watch } from 'vue'

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

const greske = reactive({
  naziv: '',
  opis: '',
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
  const naziv = forma.naziv.trim()
  const opis = forma.opis.trim()

  greske.naziv =
    naziv.length < 3
      ? 'Naziv mora imati najmanje 3 karaktera.'
      : ''

  greske.opis =
    opis.length < 5
      ? 'Opis mora imati najmanje 5 karaktera.'
      : ''

  if (greske.naziv || greske.opis) {
    return
  }

  emit('sacuvano', {
    naziv,
    opis,
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
        :class="{ 'is-invalid': greske.naziv }"
      />

      <div v-if="greske.naziv" class="invalid-feedback">
        {{ greske.naziv }}
      </div>
    </div>

    <div class="mb-3">
      <label for="opis" class="form-label">Opis</label>

      <textarea
        id="opis"
        v-model="forma.opis"
        rows="4"
        class="form-control"
        :class="{ 'is-invalid': greske.opis }"
      ></textarea>

      <div v-if="greske.opis" class="invalid-feedback">
        {{ greske.opis }}
      </div>
    </div>

    <div class="mb-4">
      <label for="status-zadatka" class="form-label">Status</label>

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

      <RouterLink to="/zadaci" class="btn btn-outline-secondary">
        Odustani
      </RouterLink>
    </div>
  </form>
</template>