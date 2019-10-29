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
    // 必中用户
    {
        path: '/starLucky/starLuckyUser',
        component: asyncComponent(() => import('container/starLucky/starLuckyUser/starLuckyUser'))
    },
    {
        path: '/starLucky/starLuckyUser/addedit',
        component: asyncComponent(() => import('container/starLucky/starLuckyUser/starLuckyUser-addedit'))
    },
    // 星球奖池
    {
        path: '/starLucky/starJackpot',
        component: asyncComponent(() => import('container/starLucky/starJackpot/starJackpot'))
    },
    {
        path: '/starLucky/starJackpot/addedit',
        component: asyncComponent(() => import('container/starLucky/starJackpot/starJackpot-addedit'))
    },
    {
        path: '/starLucky/starJackpotRecord',
        component: asyncComponent(() => import('container/starLucky/starJackpot/starJackpotRecord'))
    },
    {
        path: '/starLucky/starLegacyRecords',
        component: asyncComponent(() => import('container/starLucky/starJackpot/starLegacyRecords'))
    },
    {
        path: '/starLucky/starRecordRecord',
        component: asyncComponent(() => import('container/starLucky/starJackpot/starRecordRecord'))
    },
    {
        path: '/starLucky/starIntoPool',
        component: asyncComponent(() => import('container/starLucky/starJackpot/starIntoPool'))
    },
    {
        path: '/starLucky/configuration/addedit',
        component: asyncComponent(() => import('container/starLucky/configuration/configuration-addedit'))
    },
    // 星球配置
    {
        path: '/starLucky/starConfiguration',
        component: asyncComponent(() => import('container/starLucky/starConfiguration/starConfiguration'))
    },
    {
        path: '/starLucky/starConfiguration/addedit',
        component: asyncComponent(() => import('container/starLucky/starConfiguration/starConfiguration-addedit'))
    },
    // 星球场次规则
    {
        path: '/starLucky/starRules',
        component: asyncComponent(() => import('container/starLucky/starRules/starRules'))
    },
    {
        path: '/starLucky/starRules/addedit',
        component: asyncComponent(() => import('container/starLucky/starRules/starRules-addedit'))
    },
    // 星球场次查询
    {
        path: '/starLucky/starQuery',
        component: asyncComponent(() => import('container/starLucky/starQuery/starQuery'))
    },
    {
        path: '/starLucky/starQuery/addedit',
        component: asyncComponent(() => import('container/starLucky/starQuery/starQuery-add'))
    },
    // 参与记录查询
    {
        path: '/starLucky/starParticipate',
        component: asyncComponent(() => import('container/starLucky/starParticipate/starParticipate'))
    },
    {
        path: '/starLucky/starParticipate/addedit',
        component: asyncComponent(() => import('container/starLucky/starParticipate/starParticipate-addedit'))
    },
    // 奖金收益查询
    {
        path: '/starLucky/starBonusIncome',
        component: asyncComponent(() => import('container/starLucky/starBonusIncome/starBonusIncome'))
    },
    {
        path: '/starLucky/starBonusIncome/addedit',
        component: asyncComponent(() => import('container/starLucky/starBonusIncome/starBonusIncome-addedit'))
    }
];

export default ROUTES;
