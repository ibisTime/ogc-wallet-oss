import asyncComponent from 'component/async-component/async-component';

const ROUTES = [
    {
        path: '/superNode',
        component: asyncComponent(() => import('container/superNode/home/home'))
    },
    {
        path: '/superNode/bonusPool',
        component: asyncComponent(() => import('container/superNode/bonusPool/bonusPool'))
    },
    {
        path: '/superNode/periods',
        component: asyncComponent(() => import('container/superNode/periods/periods'))
    },
    {
        path: '/superNode/node',
        component: asyncComponent(() => import('container/superNode/node/node'))
    },
    {
        path: '/superNode/customer',
        component: asyncComponent(() => import('container/superNode/customer/customer'))
    },
    // 投票分布
    {
        path: '/superNode/voteDistribution',
        component: asyncComponent(() => import('container/superNode/node/voteDistribution'))
    },
    // 投票记录
    {
        path: '/superNode/voteRecord',
        component: asyncComponent(() => import('container/superNode/node/voteRecord'))
    },
    // 回购记录
    {
        path: '/superNode/buyBackRecord',
        component: asyncComponent(() => import('container/superNode/node/buyBackRecord'))
    },
    // 收益记录
    {
        path: '/superNode/incomeRecord',
        component: asyncComponent(() => import('container/superNode/customer/incomeRecord'))
    },
    // 配置
    {
        path: '/superNode/setting',
        component: asyncComponent(() => import('container/superNode/setting/setting'))
    },
    {
        path: '/superNode/setting/nodeRateEdit',
        component: asyncComponent(() => import('container/superNode/setting/nodeRateEdit'))
    },
    {
        path: '/superNode/setting/edit',
        component: asyncComponent(() => import('container/superNode/setting/rules-addedit'))
    }
];

export default ROUTES;
