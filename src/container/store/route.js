import asyncComponent from 'component/async-component/async-component';

const ROUTES = [
    {
        path: '/store',
        component: asyncComponent(() => import('container/store/shopCategory/shopCategory'))
    },
    {
        path: '/store/addedit',
        component: asyncComponent(
            () => import('container/store/shopCategory/shopCategory-addedit'))
    },
    {
        path: '/store/shopMessage',
        component: asyncComponent(
            () => import('container/store/shopMessage/shopMessage'))
    },
    {
        path: '/store/shopMessage/addedit',
        component: asyncComponent(
            () => import('container/store/shopMessage/shopMessage-addedit'))
    },
    {
        path: '/store/shopLabels',
        component: asyncComponent(
            () => import('container/store/shopLabels/shopLabels'))
    },
    {
        path: '/store/shopLabels/addedit',
        component: asyncComponent(
            () => import('container/store/shopLabels/shopLabels-addedit'))
    },
    {
        path: '/store/shopRules',
        component: asyncComponent(
            () => import('container/store/shopRules/shopRules'))
    },
    {
        path: '/store/shopOrder',
        component: asyncComponent(
            () => import('container/store/shopOrder/shopOrder'))
    },
    {
        path: '/store/shopOrder/addedit',
        component: asyncComponent(
            () => import('container/store/shopOrder/shopOrder-addedit'))
    },
    {
        path: '/store/shopOrder-logistics',
        component: asyncComponent(
            () => import('container/store/shopOrder/shopOrder-logistics'))
    },
    {
        path: '/store/storeConfiguration/addedit',
        component: asyncComponent(
            () => import('container/store/storeConfiguration/storeConfiguration-addedit'))
    }
];

export default ROUTES;
