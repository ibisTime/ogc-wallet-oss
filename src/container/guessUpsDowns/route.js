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
    // 场次
    {
        path: '/guessUpsDowns/scene',
        component: asyncComponent(() => import('container/guessUpsDowns/scene/scene'))
    },
    {
        path: '/guessUpsDowns/scene/addedit',
        component: asyncComponent(() => import('container/guessUpsDowns/scene/scene-addedit/scene-addedit'))
    },
    {
        path: '/guessUpsDowns/scene-page',
        component: asyncComponent(() => import('container/guessUpsDowns/scene/scene-page/scene-page'))
    },
    // 预览场次
    {
        path: '/guessUpsDowns/scene-preview',
        component: asyncComponent(() => import('container/guessUpsDowns/scene/scene-page/scene-preview'))
    },
    // 投注记录
    {
        path: '/guessUpsDowns/scene-record',
        component: asyncComponent(() => import('container/guessUpsDowns/scene/scene-record/sceneRecord'))
    },
    {
        path: '/guessUpsDowns/scene-record/addedit',
        component: asyncComponent(() => import('container/guessUpsDowns/scene/scene-record/sceneRecord-addedit'))
    },
    // 机器人
    {
        path: '/guessUpsDowns/robot',
        component: asyncComponent(() => import('container/guessUpsDowns/robot/robot'))
    },
    {
        path: '/guessUpsDowns/robot/addedit',
        component: asyncComponent(() => import('container/guessUpsDowns/robot/robot-addedit/robot-addedit'))
    },
    {
        path: '/guessUpsDowns/robot-account',
        component: asyncComponent(() => import('container/guessUpsDowns/robot/robot-accountWater/robot-accountWater'))
    },
    {
        path: '/guessUpsDowns/robot-recent',
        component: asyncComponent(() => import('container/guessUpsDowns/robot/robot-accountWater/robot-recentWater'))
    },
    {
        path: '/guessUpsDowns/robot-accountHistory',
        component: asyncComponent(() => import('container/guessUpsDowns/robot/robot-accountWater/robot-accountHistory'))
    }
];

export default ROUTES;
