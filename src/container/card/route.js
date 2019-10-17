import asyncComponent from 'component/async-component/async-component';

const ROUTES = [
    {
        path: '/card',
        component: asyncComponent(() => import('container/card/home/home'))
    },
    {
        path: '/card/secretKey',
        component: asyncComponent(() => import('container/card/secretKey/secretKey'))
    },
    {
        path: '/card/cardVolume',
        component: asyncComponent(() => import('container/card/cardVolume/cardVolume'))
    }
];

export default ROUTES;
