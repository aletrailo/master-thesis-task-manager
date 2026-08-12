<script setup>
defineProps({
  aktivniUkljuceni: { type: Boolean, required: true },
  zavrseniUkljuceni: { type: Boolean, required: true },
  sortiranje: { type: String, required: true },
  pretraga: { type: String, required: true },
})

const emit = defineEmits([
  'aktivni-promenjeni',
  'zavrseni-promenjeni',
  'sortiranje-promenjeno',
  'pretraga-promenjena',
])
</script>

<template>
  <div class="d-flex flex-column flex-lg-row align-items-lg-end gap-3 mb-4">
    <div class="pretraga w-100 me-lg-auto">
      <label for="pretraga" class="form-label small fw-semibold">
        Pretraga
      </label>

      <input
        id="pretraga"
        type="search"
        class="form-control"
        placeholder="Pretraži zadatke..."
        :value="pretraga"
        @input="emit('pretraga-promenjena', $event.target.value)"
      >
    </div>

    <div>
      <span class="form-label small fw-semibold d-block">Status</span>

      <div class="d-flex gap-2">
        <button
          type="button"
          class="btn btn-sm rounded-pill px-3"
          :class="aktivniUkljuceni
            ? 'btn-warning'
            : 'btn-outline-secondary'"
          :aria-pressed="aktivniUkljuceni"
          @click="emit('aktivni-promenjeni', !aktivniUkljuceni)"
        >
          Aktivni
        </button>

        <button
          type="button"
          class="btn btn-sm rounded-pill px-3"
          :class="zavrseniUkljuceni
            ? 'btn-success'
            : 'btn-outline-secondary'"
          :aria-pressed="zavrseniUkljuceni"
          @click="emit('zavrseni-promenjeni', !zavrseniUkljuceni)"
        >
          Završeni
        </button>
      </div>
    </div>

    <div>
      <label for="sortiranje" class="form-label small fw-semibold">Sortiranje</label>
      <select
        id="sortiranje"
        class="form-select"
        :value="sortiranje"
        @change="emit('sortiranje-promenjeno', $event.target.value)"
      >
        <option value="naziv-asc">Naziv A–Z</option>
        <option value="naziv-desc">Naziv Z–A</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.pretraga {
  max-width: 32rem;
}

@media (max-width: 991.98px) {
  .pretraga {
    max-width: none;
  }
}
</style>
