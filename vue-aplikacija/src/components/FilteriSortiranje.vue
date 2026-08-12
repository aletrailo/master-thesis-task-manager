<script setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
  sortiranje: {
    type: String,
    required: true,
  },
})

const emit = defineEmits([
  'status-promenjen',
  'sortiranje-promenjeno',
])

function promeniStatus(event) {
  emit('status-promenjen', event.target.value)
}

function promeniSortiranje(event) {
  emit('sortiranje-promenjeno', event.target.value)
}
</script>

<template>
  <div class="row g-3 mb-4">
    <div class="col-12 col-md-6">
      <label for="status" class="form-label">Status</label>

      <select
        id="status"
        class="form-select"
        :value="status"
        @change="promeniStatus"
      >
        <option value="svi">Svi zadaci</option>
        <option value="aktivan">Aktivni</option>
        <option value="zavrsen">Završeni</option>
      </select>
    </div>

    <div class="col-12 col-md-6">
      <label for="sortiranje" class="form-label">Sortiranje</label>

      <select
        id="sortiranje"
        class="form-select"
        :value="sortiranje"
        @change="promeniSortiranje"
      >
        <option value="naziv-asc">Naziv A–Z</option>
        <option value="naziv-desc">Naziv Z–A</option>
      </select>
    </div>
  </div>
</template>