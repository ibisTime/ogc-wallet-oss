import asyncComponent from 'component/async-component/async-component';

const ROUTES = [
    {
        path: '/flashManagement',
        component: asyncComponent(() => import('container/flashManagement/home/home'))
    },
    {
        path: '/flashManagement/transactionPairs',
        component: asyncComponent(() => import('container/flashManagement/transactionPairs/transactionPairs'))
    },
    {
        path: '/flashManagement/transactionPairs/addedit',
        component: asyncComponent(() => import('container/flashManagement/transactionPairs/transactionPairs-addedit'))
    },
    {
        path: '/flashManagement/record',
        component: asyncComponent(() => import('container/flashManagement/record/record'))
    },
    {
        path: '/flashManagement/record/detail',
        component: asyncComponent(() => import('container/flashManagement/record/record-addedit'))
    },
    {
        path: '/flashManagement/quotation',
        component: asyncComponent(() => import('container/flashManagement/quotation/quotation'))
    }
];

export default ROUTES;
