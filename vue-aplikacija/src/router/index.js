import { createRouter, createWebHistory } from 'vue-router'

import PocetnaView from '@/views/PocetnaView.vue'
import PrijavaView from '@/views/PrijavaView.vue'
import ZadaciView from '@/views/ZadaciView.vue'
import DodajZadatakView from '@/views/DodajZadatakView.vue'
import DetaljiZadatkaView from '@/views/DetaljiZadatkaView.vue'
import IzmeniZadatakView from '@/views/IzmeniZadatakView.vue'
import NijePronadjenoView from '@/views/NijePronadjenoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pocetna',
      component: PocetnaView,
    },
    {
      path: '/prijava',
      name: 'prijava',
      component: PrijavaView,
    },
    {
      path: '/zadaci',
      name: 'zadaci',
      component: ZadaciView,
    },
    {
      path: '/zadaci/novi',
      name: 'dodaj-zadatak',
      component: DodajZadatakView,
    },
    {
      path: '/zadaci/:id',
      name: 'detalji-zadatka',
      component: DetaljiZadatkaView,
    },
    {
      path: '/zadaci/:id/izmeni',
      name: 'izmeni-zadatak',
      component: IzmeniZadatakView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'nije-pronadjeno',
      component: NijePronadjenoView,
    },
  ],
})

export default router
