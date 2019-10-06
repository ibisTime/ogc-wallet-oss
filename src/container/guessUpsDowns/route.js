import asyncComponent from 'component/async-component/async-component';

const ROUTES = [
    {
        path: '/guessUpsDowns',
        component: asyncComponent(() => import('container/guessUpsDowns/home/home'))
    },
    // 行情
    {
        path: '/guessUpsDowns/quotation',
        component: asyncComponent(() => import('container/guessUpsDowns/quotation/quotation'))
    },
    {
        path: '/guessUpsDowns/quotation/detail',
        component: asyncComponent(() => import('container/guessUpsDowns/quotation/quotation-detail'))
    },
    // 场次
    {
        path: '/guessUpsDowns/scene',
        component: asyncComponent(() => import('container/guessUpsDowns/scene/scene'))
    },
    // 机器人
    {
        path: '/guessUpsDowns/robot',
        component: asyncComponent(() => import('container/guessUpsDowns/robot/robot'))
    }
];

export default ROUTES;
