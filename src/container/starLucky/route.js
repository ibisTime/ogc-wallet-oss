import asyncComponent from 'component/async-component/async-component';

const ROUTES = [
    {
        path: '/starLucky',
        component: asyncComponent(() => import('container/starLucky/home/home'))
    },
    {
        path: '/starLucky/starMessage',
        component: asyncComponent(() => import('container/starLucky/starMessage/starMessage'))
    },
    {
        path: '/starLucky/starLuckyUser',
        component: asyncComponent(() => import('container/starLucky/starLuckyUser/starLuckyUser'))
    },
    {
        path: '/starLucky/starJackpot',
        component: asyncComponent(() => import('container/starLucky/starJackpot/starJackpot'))
    },
    {
        path: '/starLucky/starConfiguration',
        component: asyncComponent(() => import('container/starLucky/starConfiguration/starConfiguration'))
    },
    {
        path: '/starLucky/starRules',
        component: asyncComponent(() => import('container/starLucky/starRules/starRules'))
    },
    {
        path: '/starLucky/starQuery',
        component: asyncComponent(() => import('container/starLucky/starQuery/starQuery'))
    },
    {
        path: '/starLucky/starParticipate',
        component: asyncComponent(() => import('container/starLucky/starParticipate/starParticipate'))
    },
    {
        path: '/starLucky/starBonusIncome',
        component: asyncComponent(() => import('container/starLucky/starBonusIncome/starBonusIncome'))
    }
];

export default ROUTES;
