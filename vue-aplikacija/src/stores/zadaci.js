import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useZadaciStore = defineStore('zadaci', () => {
  const zadaci = ref([
    {
      id: 1,
      naziv: 'Naučiti Angular',
      opis: 'Proći kroz osnovne koncepte i praktičnu implementaciju.',
      status: 'aktivan',
    },
    {
      id: 2,
      naziv: 'Naučiti Vue.js',
      opis: 'Implementirati iste funkcionalnosti u Vue.js aplikaciji.',
      status: 'zavrsen',
    },
  ])

  function pronadjiPoId(id) {
    return zadaci.value.find((zadatak) => zadatak.id === id)
  }

  function dodaj(zadatak) {
    const noviId =
      Math.max(0, ...zadaci.value.map((zadatak) => zadatak.id)) + 1

    zadaci.value.push({
      id: noviId,
      ...zadatak,
    })
  }

  function izmeni(id, podaci) {
    zadaci.value = zadaci.value.map((zadatak) =>
      zadatak.id === id
        ? { id, ...podaci }
        : zadatak,
    )
  }

  function obrisi(id) {
    zadaci.value = zadaci.value.filter(
      (zadatak) => zadatak.id !== id,
    )
  }

  return {
    zadaci,
    pronadjiPoId,
    dodaj,
    izmeni,
    obrisi,
  }
})