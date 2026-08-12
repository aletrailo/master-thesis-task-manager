<template>
  <main class="pocetna container">
    <div class="sadrzaj mx-auto">
      <h1 class="display-5 fw-semibold mb-3">Sve obaveze na jednom mestu</h1>

      <p class="lead text-muted mb-4">
        Beleži zadatke, uređuj ih i prati njihov status.
      </p>

      <div class="text-end">
        <RouterLink
          to="/zadaci"
          class="zadaci-link link-primary text-decoration-none fw-semibold"
        >
          Pogledaj zadatke <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.pocetna {
  min-height: calc(100vh - 56px);
  display: grid;
  place-items: center;
}

.sadrzaj {
  width: fit-content;
  max-width: 100%;
  animation: pojavljivanje 700ms ease-out both;
}

h1 {
  color: #212529;
  letter-spacing: -0.03em;
}

@media (min-width: 768px) {
  h1 {
    white-space: nowrap;
  }
}

.zadaci-link {
  display: inline-block;
}

.zadaci-link span {
  display: inline-block;
  margin-left: 0.25rem;
  transition: transform 200ms ease;
}

.zadaci-link:hover span {
  transform: translateX(7px);
}

@keyframes pojavljivanje {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sadrzaj,
  .zadaci-link,
  .zadaci-link span {
    animation: none;
    transition: none;
  }
}
</style>
