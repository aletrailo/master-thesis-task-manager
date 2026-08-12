<script setup>
defineProps({
  zadatak: { type: Object, required: true },
})
</script>

<template>
  <article class="zadatak-kartica card h-100 border shadow-sm rounded-3">
    <div class="card-body d-flex flex-column p-4">
      <div class="d-flex justify-content-between align-items-start gap-3 mb-4">
        <h2 class="h5 fw-semibold card-title mb-0">
          {{ zadatak.naziv }}
        </h2>

        <span
          class="badge"
          :class="{
            'bg-warning-subtle text-warning-emphasis': zadatak.status === 'aktivan',
            'bg-success-subtle text-success-emphasis': zadatak.status === 'zavrsen',
          }"
        >
          {{ zadatak.status === 'aktivan' ? 'Aktivan' : 'Završen' }}
        </span>
      </div>

      <p class="card-text text-muted flex-grow-1 mb-4">
        {{ zadatak.opis }}
      </p>

      <RouterLink
        :to="{ name: 'detalji-zadatka', params: { id: zadatak.id } }"
        class="detalji-link link-primary text-decoration-none fw-semibold align-self-start"
      >
        Pogledaj detalje <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.zadatak-kartica {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.zadatak-kartica:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.75rem 1.5rem rgb(33 37 41 / 10%) !important;
}

.detalji-link span {
  display: inline-block;
  margin-left: 0.25rem;
  transition: transform 200ms ease;
}

.detalji-link:hover span {
  transform: translateX(6px);
}

@media (prefers-reduced-motion: reduce) {
  .zadatak-kartica,
  .detalji-link span {
    transition: none;
  }
}
</style>
