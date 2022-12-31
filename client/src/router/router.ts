/**
 * Vue Router
 */
import { createRouter, createWebHistory } from 'vue-router';

// Views
import HomeView from '../views/HomeView.vue';
import GameView from '../views/GameView.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: HomeView,
        },
        {
            path: '/game/:roomId',
            name: 'GameView',
            component: GameView,
            props: true,
        },
    ],
});
