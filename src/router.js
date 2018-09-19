import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home')
        }, {
            path: '/node/list',
            name: 'node-list',
            component: () => import('@/views/node/List')
        }, {
            path: '/node/detail',
            name: 'node-detial',
            component: () => import('@/views/node/Detail')
        }, {
            path: '/block/list',
            name: 'block-list',
            component: () => import('@/views/block/List')
        }, {
            path: '/block/detail/:id',
            name: 'block-detail',
            component: () => import('@/views/block/Detail')
        }, {
            path: '/transaction/list',
            name: 'transaction-list',
            component: () => import('@/views/transaction/List')
        }, {
            path: '/transaction/detail/:id',
            name: 'transaction-detail',
            component: () => import('@/views/transaction/Detail')
        }, {
            path: '**',
            redirect: '/',
        }
    ]
})
