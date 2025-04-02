import { createRouter, createWebHistory } from 'vue-router';
import CreatePatient from '../components/Patient/PatientCreate.vue';
import ReadPatients from '../components/Patient/PatienteRead.vue';
/* import ReadPatients from '../components/ReadPatients.vue'; */
/* import UpdatePatient from '../components/UpdatePatient.vue'; */
/* import DeletePatient from '../components/DeletePatient.vue'; */

const routes = [
  { path: '/create', component: CreatePatient },
  { path: '/read', component: ReadPatients },
  /* { path: '/update', component: UpdatePatient }, */
  /* { path: '/delete', component: DeletePatient }, */
  { path: '/', redirect: '/create' }, // Default route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
