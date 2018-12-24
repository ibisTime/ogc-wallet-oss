import asyncComponent from './component/async-component/async-component';

const ROUTES = [
    {
        path: '/system/role',
        component: asyncComponent(() => import('container/system/role/role'))
    },
    {
        path: '/system/role/addedit',
        component: asyncComponent(() => import('container/system/role-addedit/role-addedit'))
    },
    {
        path: '/system/role/menu',
        component: asyncComponent(() => import('container/system/role-menu/role-menu'))
    },
    {
        path: '/system/role/nodemenu',
        component: asyncComponent(() => import('container/system/node-menu/node-menu'))
    },
    {
        path: '/system/menu',
        component: asyncComponent(() => import('container/system/menu/menu'))
    },
    {
        path: '/system/menu/addedit',
        component: asyncComponent(() => import('container/system/menu-addedit/menu-addedit'))
    },
    {
        path: '/system/user',
        component: asyncComponent(() => import('container/system/user/user'))
    },
    {
        path: '/system/user/role',
        component: asyncComponent(() => import('container/system/user/assign'))
    },

    //  系统参数
    {
        path: '/system/sysPara',
        component: asyncComponent(() => import('container/system/sysParam/sysParam'))
    },
    //  系统参数修改
    {
        path: '/system/sysPara/addedit',
        component: asyncComponent(() => import('container/system/sysParam-addedit/sysParam-addedit'))
    },
    {
        path: '/system/dataDict',
        component: asyncComponent(() => import('container/system/dataDict/dataDict'))
    },
    {
        path: '/system/dataDict/addedit',
        component: asyncComponent(() => import('container/system/dataDict-addedit/dataDict-addedit'))
    },
    {
        path: '/system/user/addedit',
        component: asyncComponent(() => import('container/system/user-addedit/user-addedit'))
    },
    {
        path: '/system/user/resetPwd',
        component: asyncComponent(() => import('container/system/user-resetPwd/user-resetPwd'))
    },
    {
        path: '/system/node',
        component: asyncComponent(() => import('container/system/node/node'))
    },
    {
        path: '/system/node/addedit',
        component: asyncComponent(() => import('container/system/node-addedit/node-addedit'))
    },
    {
        path: '/system/node/setMateriallist',
        component: asyncComponent(() => import('container/system/node-setMateriallist/node-setMateriallist'))
    },
    {
        path: '/public/aboutus',
        component: asyncComponent(() => import('container/public/aboutus/aboutus'))
    },
    {
        path: '/public/aboutus/addedit',
        component: asyncComponent(() => import('container/public/aboutus-addedit/aboutus-addedit'))
    },
    {
        path: '/public/contact',
        component: asyncComponent(() => import('container/public/contact/contact'))
    },
    {
        path: '/public/contact/addedit',
        component: asyncComponent(() => import('container/public/contact-addeidt/contact-addeidt'))
    },
    {
        path: '/public/privacy',
        component: asyncComponent(() => import('container/public/privacy/privacy'))
    },
    {
        path: '/public/privacy/addedit',
        component: asyncComponent(() => import('container/public/privacy-addeidt/privacy-addeidt'))
    },
    {
        path: '/public/register',
        component: asyncComponent(() => import('container/public/register/register'))
    },
    {
        path: '/public/register/addedit',
        component: asyncComponent(() => import('container/public/register-addeidt/register-addeidt'))
    },
    {
        path: '/public/buyADS',
        component: asyncComponent(() => import('container/public/buyADS/buyADS'))
    },
    {
        path: '/public/buyADS/addedit',
        component: asyncComponent(() => import('container/public/buyADS/buyADS-addedit'))
    },
    {
        path: '/public/sellETH',
        component: asyncComponent(() => import('container/public/sellETH/sellETH'))
    },
    {
        path: '/public/sellETH/addedit',
        component: asyncComponent(() => import('container/public/sellETH/sellETH-addedit'))
    },
    {
        path: '/public/TransactionRemind',
        component: asyncComponent(() => import('container/public/TransactionRemind/TransactionRemind'))
    },
    {
        path: '/public/TransactionRemind/addedit',
        component: asyncComponent(() => import('container/public/TransactionRemind/TransactionRemind-addedit'))
    },
    {
        path: '/public/notice',
        component: asyncComponent(() => import('container/public/notice/notice'))
    },
    {
        path: '/public/notice/addedit',
        component: asyncComponent(() => import('container/public/notice-addedit/notice-addedit'))
    },
    {
        path: '/public/banner',
        component: asyncComponent(() => import('container/public/banner/banner'))
    },
    {
        path: '/public/banner/addedit',
        component: asyncComponent(() => import('container/public/banner-addedit/banner-addedit'))
    },
    {
        path: '/public/community',
        component: asyncComponent(() => import('container/public/community/community'))
    },
    {
        path: '/public/community/addedit',
        component: asyncComponent(() => import('container/public/community/community-addedit'))
    },
    {
        path: '/public/warmReminding',
        component: asyncComponent(() => import('container/public/warmReminding/warmReminding'))
    },
    {
        path: '/public/warmReminding/addedit',
        component: asyncComponent(() => import('container/public/warmReminding/warmReminding-addedit'))
    },
    {
        path: '/public/legalDeclaration',
        component: asyncComponent(() => import('container/public/legalDeclaration/legalDeclaration'))
    },
    {
        path: '/public/legalDeclaration/addedit',
        component: asyncComponent(() => import('container/public/legalDeclaration/legalDeclaration-addedit'))
    },
    {
        path: '/public/rateExplain',
        component: asyncComponent(() => import('container/public/rateExplain/rateExplain'))
    },
    {
        path: '/public/rateExplain/addedit',
        component: asyncComponent(() => import('container/public/rateExplain/rateExplain-addedit'))
    },

    // 业务管理
    // 客户管理
    // 会员查询
    {
        path: '/user/customer',
        component: asyncComponent(() => import('container/user/customer/customer'))
    },
    {
        path: '/user/customer/addedit',
        component: asyncComponent(() => import('container/user/customer/customer-addedit'))
    },
    {
        path: '/user/customer/editAdvertisementFee',
        component: asyncComponent(() => import('container/user/customer/customer-editAdvertisementFee'))
    },
    {
        path: '/user/customer/accountQuery',
        component: asyncComponent(() => import('container/user/customer/customer-account'))
    },
    {
        path: '/user/customer/entrustQuery',
        component: asyncComponent(() => import('container/user/customer/customer-entrustQuery'))
    },
    {
        path: '/user/customer/ledgerQuery',
        component: asyncComponent(() => import('container/user/customer/customer-ledgerQuery'))
    },
    {
        path: '/user/customer/accountSummary',
        component: asyncComponent(() => import('container/user/customer/customer-accountSummary'))
    },
    // kyc审核
    {
        path: '/user/kycCheck',
        component: asyncComponent(() => import('container/user/kycCheck/kycCheck'))
    },
    {
        path: '/user/kycCheck/addedit',
        component: asyncComponent(() => import('container/user/kycCheck/kycCheck-addedit'))
    },
    // 资料审核
    {
        path: '/user/dataCheck',
        component: asyncComponent(() => import('container/user/dataCheck/dataCheck'))
    },
    {
        path: '/user/dataCheck/addedit',
        component: asyncComponent(() => import('container/user/dataCheck/dataCheck-addedit'))
    },
    // 历史分红名单
    {
        path: '/user/historyDivideList',
        component: asyncComponent(() => import('container/user/historyDivideList/historyDivideList'))
    },
    {
        path: '/user/historyDivideList/divideList',
        component: asyncComponent(() => import('container/user/historyDivideList/historyDivideList-divideList'))
    },
    {
        path: '/user/historyDivideList/divide',
        component: asyncComponent(() => import('container/user/historyDivideList/historyDivideList-divide'))
    },
    // 佣金结算历史
    {
        path: '/user/commissionsHistoryList',
        component: asyncComponent(() => import('container/user/commissionsHistoryList/commissionsHistoryList'))
    },
    {
        path: '/user/commissionsHistoryList/commissions',
        component: asyncComponent(() => import('container/user/commissionsHistoryList/commissionsHistoryList-commissions'))
    },
    // 黑名单管理
    {
        path: '/user/customerBlackList',
        component: asyncComponent(() => import('container/user/customer/customer-blackList'))
    },
    {
        path: '/user/customerBlackList/addedit',
        component: asyncComponent(() => import('container/user/customer/customer-blackListAddedit'))
    },

    // 渠道商管理
    // 渠道商管理
    {
        path: '/user/channelDealer',
        component: asyncComponent(() => import('container/user/channelDealer/channelDealer'))
    },
    {
        path: '/user/channelDealer/addedit',
        component: asyncComponent(() => import('container/user/channelDealer/channelDealer-addedit'))
    },
    {
        path: '/user/channelDealer/accountQuery',
        component: asyncComponent(() => import('container/user/customer/customer-account'))
    },
    {
        path: '/user/channelDealer/lowerLevelQuery',
        component: asyncComponent(() => import('container/user/channelDealer/channelDealer-lowerLevelQuery'))
    },
    {
        path: '/user/channelDealer/divideAccount',
        component: asyncComponent(() => import('container/user/customer/customer-accountSummary'))
    },
    // 待结算佣金名单 (11/28 列表修改为展示佣金明细)
    {
        path: '/user/channelDealerCommissions/channelDealerCommissions',
        component: asyncComponent(() => import('container/user/channelDealerCommissions/channelDealerCommissions'))
    },
    {
        path: '/user/channelDealerCommissions',
        component: asyncComponent(() => import('container/user/channelDealerCommissions/channelDealerCommissions-checklist'))
    },
    {
        path: '/user/channelDealerCommissions/settlement',
        component: asyncComponent(() => import('container/user/channelDealerCommissions/channelDealerCommissions-settlement'))
    },
    // 佣金结算历史  (11/28 列表修改为展示佣金明细)
    {
        path: '/user/channelDealerSettleHistory/channelDealerSettleHistory',
        component: asyncComponent(() => import('container/user/channelDealerCommissions/channelDealerSettleHistory'))
    },
    {
        path: '/user/channelDealerSettleHistory',
        component: asyncComponent(() => import('container/user/channelDealerCommissions/channelDealerSettleHistory-commissions'))
    },

    // OTC交易管理
    // 购买交易
    {
        path: '/trade/buyTrade',
        component: asyncComponent(() => import('container/trade/buyTrade/buyTrade'))
    },
    {
        path: '/trade/buyTrade/addedit',
        component: asyncComponent(() => import('container/trade/buyTrade/buyTrade-addedit'))
    },
    // 出售交易
    {
        path: '/trade/saleTrade',
        component: asyncComponent(() => import('container/trade/saleTrade/saleTrade'))
    },
    {
        path: '/trade/saleTrade/addedit',
        component: asyncComponent(() => import('container/trade/saleTrade/saleTrade-addedit'))
    },
    // OTC订单管理
    // 进行中订单
    {
        path: '/trade/underWayOrder',
        component: asyncComponent(() => import('container/trade/underWayOrder/underWayOrder'))
    },
    {
        path: '/trade/underWayOrder/addedit',
        component: asyncComponent(() => import('container/trade/underWayOrder/underWayOrder-addedit'))
    },
    // 已结束订单
    {
        path: '/trade/finishOrder',
        component: asyncComponent(() => import('container/trade/finishOrder/finishOrder'))
    },
    {
        path: '/trade/finishOrder/addedit',
        component: asyncComponent(() => import('container/trade/finishOrder/finishOrder-addedit'))
    },

    // 仲裁订单管理
    // 仲裁订单
    {
        path: '/trade/arbitrationOrder',
        component: asyncComponent(() => import('container/trade/arbitrationOrder/arbitrationOrder'))
    },
    {
        path: '/trade/arbitrationOrder/addedit',
        component: asyncComponent(() => import('container/trade/arbitrationOrder/arbitrationOrder-addedit'))
    },
    {
        path: '/trade/arbitrationOrder/resolve',
        component: asyncComponent(() => import('container/trade/arbitrationOrder/arbitrationOrder-resolve'))
    },
    // 仲裁通知人
    {
        path: '/trade/arbitrationNotifier',
        component: asyncComponent(() => import('container/trade/arbitrationNotifier/arbitrationNotifier'))
    },
    {
        path: '/trade/arbitrationNotifier/addedit',
        component: asyncComponent(() => import('container/trade/arbitrationNotifier/arbitrationNotifier-addedit'))
    },

    // 承兑商管理
    // 收款方式
    {
        path: '/accept/payment',
        component: asyncComponent(() => import('container/biz/accept/payment/payment'))
    },
    {
        path: '/accept/payment/addedit',
        component: asyncComponent(() => import('container/biz/accept/payment/payment-addedit'))
    },
    // 购买订单
    {
        path: '/accept/buyOrder',
        component: asyncComponent(() => import('container/biz/accept/buyOrder/buyOrder'))
    },
    {
        path: '/accept/buyOrder/addedit',
        component: asyncComponent(() => import('container/biz/accept/buyOrder/buyOrder-addedit'))
    },
    // 出售订单
    {
        path: '/accept/saleOrder',
        component: asyncComponent(() => import('container/biz/accept/saleOrder/saleOrder'))
    },
    {
        path: '/accept/saleOrder/addedit',
        component: asyncComponent(() => import('container/biz/accept/saleOrder/saleOrder-addedit'))
    },
    // 已完成订单
    {
        path: '/accept/finishOrder',
        component: asyncComponent(() => import('container/biz/accept/finishOrder/finishOrder'))
    },
    {
        path: '/accept/finishOrder/addedit',
        component: asyncComponent(() => import('container/biz/accept/finishOrder/finishOrder-addedit'))
    },

    // 币种管理
    // 币种管理
    {
        path: '/biz/coin',
        component: asyncComponent(() => import('container/biz/coin/coin'))
    },
    {
        path: '/biz/coin/addedit',
        component: asyncComponent(() => import('container/biz/coin/coin-addedit'))
    },

    // 行情管理
    // 交易对管理
    {
        path: '/quotation/tradePair',
        component: asyncComponent(() => import('container/biz/quotation/tradePair'))
    },
    // BTC行情
    {
        path: '/quotation/quotationBTC',
        component: asyncComponent(() => import('container/biz/quotation/quotationBTC'))
    },
    // ETH行情
    {
        path: '/quotation/quotationETH',
        component: asyncComponent(() => import('container/biz/quotation/quotationETH'))
    },
    // X行情
    {
        path: '/quotation/quotationX',
        component: asyncComponent(() => import('container/biz/quotation/quotationX'))
    },
    // 法币汇率
    {
        path: '/quotation/exchangeRate',
        component: asyncComponent(() => import('container/biz/quotation/exchangeRate'))
    },
    // 市价调节值
    {
        path: '/quotation/marketAdjustment',
        component: asyncComponent(() => import('container/biz/quotation/marketAdjustment'))
    },
    {
        path: '/quotation/marketAdjustment/addedit',
        component: asyncComponent(() => import('container/biz/quotation/marketAdjustment-addedit'))
    },

    // 活动管理
    // 邀请好友
    {
        path: '/activity/invitingFriends',
        component: asyncComponent(() => import('container/biz/activity/invitingFriends/invitingFriends'))
    },
    {
        path: '/activity/invitingFriends/addedit',
        component: asyncComponent(() => import('container/biz/activity/invitingFriends/invitingFriends-addedit'))
    },
    // 邀请好友链接文本
    {
        path: '/activity/invitingTxt',
        component: asyncComponent(() => import('container/biz/activity/invitingHref/invitingTxt-addedit'))
    },
    // 业务规则
    // 广告费规则
    {
        path: '/rules/advertisingFee',
        component: asyncComponent(() => import('container/rules/advertisingFee/advertisingFee'))
    },
    {
        path: '/rules/advertisingFee/addedit',
        component: asyncComponent(() => import('container/rules/advertisingFee/advertisingFee-addedit'))
    },
    // 币币交易手续费规则
    {
        path: '/rules/simuOrderRule',
        component: asyncComponent(() => import('container/rules/simuOrderRule/simuOrderRule'))
    },
    {
        path: '/rules/simuOrderRule/addedit',
        component: asyncComponent(() => import('container/rules/simuOrderRule/simuOrderRule-addedit'))
    },
    // 提币手续费规则
    {
        path: '/rules/withdrawUserFee',
        component: asyncComponent(() => import('container/rules/withdrawUserFee/withdrawUserFee'))
    },
    {
        path: '/rules/withdrawUserFee/addedit',
        component: asyncComponent(() => import('container/rules/withdrawUserFee/withdrawUserFee-addedit'))
    },
    // 承兑商手续费规则
    {
        path: '/rules/acceptRule',
        component: asyncComponent(() => import('container/rules/acceptRule/acceptRule'))
    },
    {
        path: '/rules/acceptRule/addedit',
        component: asyncComponent(() => import('container/rules/acceptRule/acceptRule-addedit'))
    },
    // 游戏配置
    {
        path: '/rules/gameConfig',
        component: asyncComponent(() => import('container/rules/gameConfig/gameConfig'))
    },
    {
        path: '/rules/gameConfig/addedit',
        component: asyncComponent(() => import('container/rules/gameConfig/gameConfig-addedit'))
    },

    // ETH财务管理
    // 平台账户
    {
        path: '/finance/platformAccount',
        component: asyncComponent(() => import('container/finance/platformAccount/platformAccount'))
    },
    {
        path: '/finance/platformAccount/ledger',
        component: asyncComponent(() => import('container/user/customer/customer-ledgerQuery'))
    },
    // 分发地址
    {
        path: '/finance/diviAddress',
        component: asyncComponent(() => import('container/finance/diviAddress/diviAddress'))
    },
    {
        path: '/finance/diviAddress/ledger',
        component: asyncComponent(() => import('container/finance/diviAddress/diviAddress-ledger'))
    },
    // 充币管理
    // 线下充值
    {
        path: '/finance/offlineRecharge',
        component: asyncComponent(() => import('container/finance/offlineRecharge/offlineRecharge'))
    },
    {
        path: '/finance/offlineRecharge/addedit',
        component: asyncComponent(() => import('container/finance/offlineRecharge/offlineRecharge-addedit'))
    },
    {
        path: '/finance/offlineRecharge/detail',
        component: asyncComponent(() => import('container/finance/offlineRecharge/offlineRecharge-detail'))
    },
    // 充值查询
    {
        path: '/finance/offlineRechargeQuery',
        component: asyncComponent(() => import('container/finance/offlineRecharge/offlineRechargeQuery'))
    },

    // 提币管理
    // 提币地址
    {
        path: '/finance/TBAddress',
        component: asyncComponent(() => import('container/finance/TBAddress/TBAddress'))
    },
    // 线下提币
    {
        path: '/finance/TBunderline',
        component: asyncComponent(() => import('container/finance/TBunderline/TBunderline'))
    },
    {
        path: '/finance/TBunderline/addedit',
        component: asyncComponent(() => import('container/finance/TBunderline/TBunderline-addedit'))
    },
    {
        path: '/finance/TBunderline/multiCheck',
        component: asyncComponent(() => import('container/finance/TBunderline/TBunderline-multiCheck'))
    },
    // 归集地址
    {
        path: '/finance/GJAddress',
        component: asyncComponent(() => import('container/finance/GJAddress/GJAddress'))
    },
    {
        path: '/finance/GJAddress/addedit',
        component: asyncComponent(() => import('container/finance/GJAddress/GJAddress-addedit'))
    },
    {
        path: '/finance/GJAddressQuery',
        component: asyncComponent(() => import('container/finance/GJAddressQuery/GJAddressQuery'))
    },
    {
        path: '/finance/GJAddressQuery/addedit',
        component: asyncComponent(() => import('container/finance/GJAddressQuery/GJAddressQuery-addedit'))
    },
    {
        path: '/finance/GJManually',
        component: asyncComponent(() => import('container/finance/GJManually/GJManually-addedit'))
    },

    // BTC财务管理
    // 平台账户
    {
        path: '/BTC-finance/platformAccount',
        component: asyncComponent(() => import('container/BTC-finance/platformAccount/platformAccount'))
    },
    {
        path: '/BTC-finance/platformAccount/ledger',
        component: asyncComponent(() => import('container/user/customer/customer-ledgerQuery'))
    },
    // 分发地址
    {
        path: '/BTC-finance/diviAddress',
        component: asyncComponent(() => import('container/BTC-finance/diviAddress/diviAddress'))
    },
    {
        path: '/BTC-finance/diviAddress/addedit',
        component: asyncComponent(() => import('container/BTC-finance/diviAddress/diviAddress-ledger'))
    },
    // 充币管理
    // 线下充值
    {
        path: '/BTC-finance/offlineRecharge',
        component: asyncComponent(() => import('container/BTC-finance/offlineRecharge/offlineRecharge'))
    },
    {
        path: '/BTC-finance/offlineRecharge/addedit',
        component: asyncComponent(() => import('container/BTC-finance/offlineRecharge/offlineRecharge-addedit'))
    },
    {
        path: '/BTC-finance/offlineRecharge/detail',
        component: asyncComponent(() => import('container/BTC-finance/offlineRecharge/offlineRecharge-detail'))
    },
    // 充值查询
    {
        path: '/BTC-finance/offlineRechargeQuery',
        component: asyncComponent(() => import('container/BTC-finance/offlineRecharge/offlineRechargeQuery'))
    },

    // 提币管理
    // 提币地址
    {
        path: '/BTC-finance/TBAddress',
        component: asyncComponent(() => import('container/BTC-finance/TBAddress/TBAddress'))
    },
    // 线下提币
    {
        path: '/BTC-finance/TBunderline',
        component: asyncComponent(() => import('container/BTC-finance/TBunderline/TBunderline'))
    },
    {
        path: '/BTC-finance/TBunderline/addedit',
        component: asyncComponent(() => import('container/BTC-finance/TBunderline/TBunderline-addedit'))
    },
    {
        path: '/BTC-finance/TBunderline/multiCheck',
        component: asyncComponent(() => import('container/BTC-finance/TBunderline/TBunderline-multiCheck'))
    },

    // 归集地址
    {
        path: '/BTC-finance/GJAddress',
        component: asyncComponent(() => import('container/BTC-finance/GJAddress/GJAddress'))
    },
    {
        path: '/BTC-finance/GJAddress/addedit',
        component: asyncComponent(() => import('container/BTC-finance/GJAddress/GJAddress-addedit'))
    },
    {
        path: '/BTC-finance/GJAddressQuery',
        component: asyncComponent(() => import('container/BTC-finance/GJAddressQuery/GJAddressQuery'))
    },
    {
        path: '/BTC-finance/GJAddressQuery/addedit',
        component: asyncComponent(() => import('container/BTC-finance/GJAddressQuery/GJAddressQuery-addedit'))
    },
    {
        path: '/BTC-finance/GJManually',
        component: asyncComponent(() => import('container/BTC-finance/GJManually/GJManually-addedit'))
    },

    // TOKEN财务管理
    // 平台账户
    {
        path: '/TOKEN-finance/platformAccount',
        component: asyncComponent(() => import('container/TOKEN-finance/platformAccount/platformAccount'))
    },
    {
        path: '/TOKEN-finance/platformAccount/ledger',
        component: asyncComponent(() => import('container/user/customer/customer-ledgerQuery'))
    },
    // 分发地址
    {
        path: '/TOKEN-finance/diviAddress',
        component: asyncComponent(() => import('container/TOKEN-finance/diviAddress/diviAddress'))
    },
    {
        path: '/TOKEN-finance/diviAddress/ledger',
        component: asyncComponent(() => import('container/TOKEN-finance/diviAddress/diviAddress-ledger'))
    },
    // 平台分红
    {
        path: '/TOKEN-finance/platformDivide',
        component: asyncComponent(() => import('container/TOKEN-finance/platformDivide/platformDivide'))
    },
    {
        path: '/TOKEN-finance/platformDivide/divide',
        component: asyncComponent(() => import('container/TOKEN-finance/platformDivide/platformDivide-divide'))
    },
    {
        path: '/TOKEN-finance/platformDivide/divideList',
        component: asyncComponent(() => import('container/TOKEN-finance/platformDivide/platformDivide-divideList'))
    },
    {
        path: '/TOKEN-finance/platformDivideHistory',
        component: asyncComponent(() => import('container/TOKEN-finance/platformDivideHistory/platformDivideHistory'))
    },
    {
        path: '/TOKEN-finance/platformDivideNext',
        component: asyncComponent(() => import('container/TOKEN-finance/platformDivideNext/platformDivideNext'))
    },

// 特殊奖励
    {
        path: '/TOKEN-finance/specialReward',
        component: asyncComponent(() => import('container/TOKEN-finance/specialReward/specialReward'))
    },
    {
        path: '/TOKEN-finance/specialReward/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/specialReward/specialReward-addedit'))
    },
    {
        path: '/TOKEN-finance/specialRewardHistory',
        component: asyncComponent(() => import('container/TOKEN-finance/specialRewardHistory/specialRewardHistory'))
    },
    {
        path: '/TOKEN-finance/specialRewardHistory/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/specialReward/specialReward-addedit'))
    },

    // 充币管理
    // 线下充值
    {
        path: '/TOKEN-finance/offlineRecharge',
        component: asyncComponent(() => import('container/TOKEN-finance/offlineRecharge/offlineRecharge'))
    },
    {
        path: '/TOKEN-finance/offlineRecharge/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/offlineRecharge/offlineRecharge-addedit'))
    },
    {
        path: '/TOKEN-finance/offlineRecharge/detail',
        component: asyncComponent(() => import('container/TOKEN-finance/offlineRecharge/offlineRecharge-detail'))
    },
    // 充值查询
    {
        path: '/TOKEN-finance/offlineRechargeQuery',
        component: asyncComponent(() => import('container/TOKEN-finance/offlineRecharge/offlineRechargeQuery'))
    },

    // 提币管理
    // 提币地址
    {
        path: '/TOKEN-finance/TBAddress',
        component: asyncComponent(() => import('container/TOKEN-finance/TBAddress/TBAddress'))
    },
    // 线下提币
    {
        path: '/TOKEN-finance/TBunderline',
        component: asyncComponent(() => import('container/TOKEN-finance/TBunderline/TBunderline'))
    },
    {
        path: '/TOKEN-finance/TBunderline/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/TBunderline/TBunderline-addedit'))
    },
    {
        path: '/TOKEN-finance/TBunderline/multiCheck',
        component: asyncComponent(() => import('container/TOKEN-finance/TBunderline/TBunderline-multiCheck'))
    },
    // 归集地址
    {
        path: '/TOKEN-finance/GJAddress',
        component: asyncComponent(() => import('container/TOKEN-finance/GJAddress/GJAddress'))
    },
    {
        path: '/TOKEN-finance/GJAddress/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/GJAddress/GJAddress-addedit'))
    },
    {
        path: '/TOKEN-finance/GJAddressQuery',
        component: asyncComponent(() => import('container/TOKEN-finance/GJAddressQuery/GJAddressQuery'))
    },
    {
        path: '/TOKEN-finance/GJAddressQuery/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/GJAddressQuery/GJAddressQuery-addedit'))
    },
    {
        path: '/TOKEN-finance/GJManually',
        component: asyncComponent(() => import('container/TOKEN-finance/GJManually/GJManually-addedit'))
    },
    // 游戏管理
    {
        path: '/TOKEN-finance/gameInQuery',
        component: asyncComponent(() => import('container/TOKEN-finance/gameInQuery/gameInQuery'))
    },
    {
        path: '/TOKEN-finance/gameInQuery/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/gameInQuery/gameInQuery-addedit'))
    },
    {
        path: '/TOKEN-finance/gameOutQuery',
        component: asyncComponent(() => import('container/TOKEN-finance/gameOutQuery/gameOutQuery'))
    },
    {
        path: '/TOKEN-finance/gameOutQuery/addedit',
        component: asyncComponent(() => import('container/TOKEN-finance/gameOutQuery/gameOutQuery-addedit'))
    },
    // 业务管理 -- 评论管理 -- 关键字管理
    {
        path: '/comment/keywords',
        component: asyncComponent(() => import('container/biz/comment/keywords/keywords'))
    },
    // 业务管理 -- 评论管理 -- 关键字管理 -- 详情
    {
        path: '/comment/keywords/addedit',
        component: asyncComponent(() => import('container/biz/comment/keywords/keywords-addedit'))
    },
    // 业务管理 -- 评论管理 -- 评论审核
    {
        path: '/comment/check',
        component: asyncComponent(() => import('container/biz/comment/check/check'))
    },
    // 业务管理 -- 评论管理 -- 评论审核 -- 详情
    {
        path: '/comment/check/addedit',
        component: asyncComponent(() => import('container/biz/comment/check/check-addedit'))
    },
    // 业务管理 -- 评论管理 -- 评论查询
    {
        path: '/comment/list',
        component: asyncComponent(() => import('container/biz/comment/list/list'))
    },
    // 业务管理 -- 评论管理 -- 评论查询 -- 详情
    {
        path: '/comment/list/addedit',
        component: asyncComponent(() => import('container/biz/comment/check/check-addedit'))
    },
    // 统计分析 -- 个人统计 -- 用户持币情况统计
    {
        path: '/statistics/userHoldingCurrency',
        component: asyncComponent(() => import('container/statistics/userHoldingCurrency/userHoldingCurrency'))
    },
    // 统计分析 -- 平台统计 -- 承兑商购买FMVP时间分布
    {
        path: '/statistics/buyFMVPTimeDistribution',
        component: asyncComponent(() => import('container/statistics/buyFMVPTimeDistribution/buyFMVPTimeDistribution'))
    },
    // 统计分析 -- 平台统计 -- 承兑商FMVP统计
    {
        path: '/statistics/acceptFMVP',
        component: asyncComponent(() => import('container/statistics/acceptFMVP/acceptFMVP'))
    },
    // 统计分析 -- 平台统计 -- 渠道商返佣统计
    {
        path: '/statistics/channelReturnCommission',
        component: asyncComponent(() => import('container/statistics/channelReturnCommission/channelReturnCommission'))
    },
    // 统计分析 -- 平台统计 -- 币币交易情况统计
    {
        path: '/statistics/currencyTransaction',
        component: asyncComponent(() => import('container/statistics/currencyTransaction/currencyTransaction'))
    },
    // 统计分析 -- 平台统计 -- FMVP消耗比例
    {
        path: '/statistics/FMVPConsumptionRatio',
        component: asyncComponent(() => import('container/statistics/FMVPConsumptionRatio/FMVPConsumptionRatio'))
    },
    // 统计分析 -- 平台统计 -- FMVP变现统计
    {
        path: '/statistics/FMVPRecharge',
        component: asyncComponent(() => import('container/statistics/FMVPRecharge/FMVPRecharge'))
    },
    // 统计分析 -- 平台统计 -- 游戏FMVP统计
    {
        path: '/statistics/gameFMVP',
        component: asyncComponent(() => import('container/statistics/gameFMVP/gameFMVP'))
    },
    // 统计分析 -- 平台统计 -- 获取FMVP途径
    {
        path: '/statistics/getFMVPChannel',
        component: asyncComponent(() => import('container/statistics/getFMVPChannel/getFMVPChannel'))
    },
    // 统计分析 -- 平台统计 -- CC交易OTC成交时间统计
    {
        path: '/statistics/OTCClosingTime',
        component: asyncComponent(() => import('container/statistics/OTCClosingTime/OTCClosingTime'))
    },
    // 统计分析 -- 平台统计 -- OTC交易情况统计
    {
        path: '/statistics/OTCTransactions',
        component: asyncComponent(() => import('container/statistics/OTCTransactions/OTCTransactions'))
    },
    // 统计分析 -- 平台统计 -- 用户币币盈亏统计
    {
        path: '/statistics/userBBProfitLoss',
        component: asyncComponent(() => import('container/statistics/userBBProfitLoss/userBBProfitLoss'))
    },
    // 统计分析 -- 平台统计 -- 用户返佣统计
    {
        path: '/statistics/userReturnCommission',
        component: asyncComponent(() => import('container/statistics/userReturnCommission/userReturnCommission'))
    }
];

export default ROUTES;
