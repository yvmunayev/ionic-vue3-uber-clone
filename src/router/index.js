import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import Map from '../views/map/Map.vue'
import WhereTo from '../views/map/WhereTo.vue';
import Ride from '../views/map/Ride.vue';

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/map',
        name: 'Map',
        component: Map,
        children: [
            {
                path: '',
                redirect: '/map/whereto'
            },
            {
                path: 'whereto',
                component: WhereTo,
              },
              {
                path: 'ride',
                component: Ride,
              },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
