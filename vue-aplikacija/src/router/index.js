import { createRouter, createWebHistory } from 'vue-router'

import PocetnaView from '@/views/PocetnaView.vue'
import PrijavaView from '@/views/PrijavaView.vue'
import ZadaciView from '@/views/ZadaciView.vue'
import DodajZadatakView from '@/views/DodajZadatakView.vue'
import DetaljiZadatkaView from '@/views/DetaljiZadatkaView.vue'
import IzmeniZadatakView from '@/views/IzmeniZadatakView.vue'
import NijePronadjenoView from '@/views/NijePronadjenoView.vue'

import { useAutentifikacijaStore } from '@/stores/autentifikacija'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pocetna',
      component: PocetnaView
    },
    {
      path: '/prijava',
      name: 'prijava',
      component: PrijavaView
    },
    {
      path: '/zadaci',
      name: 'zadaci',
      component: ZadaciView,
      meta: { requiresAuth: true }
    },
    {
      path: '/zadaci/novi',
      name: 'dodaj-zadatak',
      component: DodajZadatakView,
      meta: { requiresAuth: true }
    },
    {
      path: '/zadaci/:id',
      name: 'detalji-zadatka',
      component: DetaljiZadatkaView,
      meta: { requiresAuth: true }
    },
    {
      path: '/zadaci/:id/izmeni',
      name: 'izmeni-zadatak',
      component: IzmeniZadatakView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'nije-pronadjeno',
      component: NijePronadjenoView
    },
  ],
})

router.beforeEach((to) => {
  const autentifikacijaStore = useAutentifikacijaStore()

  if (
    to.meta.requiresAuth &&
    !autentifikacijaStore.prijavljen
  ) {
    return {
      name: 'prijava',
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

export default router
