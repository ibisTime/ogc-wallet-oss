import asyncComponent from 'component/async-component/async-component';

const ROUTES = [
    {
        path: '/down',
        component: asyncComponent(() => import('container/vpnDown/home/home'))
    },
    {
        path: '/down/addedit',
        component: asyncComponent(() => import('container/vpnDown/home/down-addedit'))
    }
];

export default ROUTES;
