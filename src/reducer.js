import {combineReducers} from 'redux';
import {user} from './redux/user';
import {menu} from './redux/menu';
import {modalDetail} from './redux/modal/build-modal-detail';
import {systemRole} from './redux/system/role';
import {systemMenu} from './redux/system/menu';
import {systemSysParam} from './redux/system/sysParam';
import {systemUser} from './redux/system/user';
import {systemPwdReset} from './redux/system/pwdReset';
import {systemDataDict} from './redux/system/dataDict';
import {publicBanner} from './redux/public/banner';
import {publicAboutus} from './redux/public/aboutus';
import {publicContact} from './redux/public/contact';
import {publicPrivacy} from './redux/public/privacy';
import {publicRegister} from './redux/public/register';
import {publicBuyADS} from './redux/public/buyADS';
import {publicSellETH} from './redux/public/sellETH';
import {publicTransactionRemind} from './redux/public/TransactionRemind';
import {publicNotice} from './redux/public/notice';
import {publicCommunity} from './redux/public/community';
import {publicWarmReminding} from './redux/public/warmReminding';
import {publicLegalDeclaration} from './redux/public/legalDeclaration';
import {publicRateExplain} from './redux/public/rateExplain';

/* 业务管理 */
// 客户管理
// 会员查询
import {userCustomer} from './redux/user/customer/customer';
import {userCustomerAccount} from './redux/user/customer/customer-account';
import {userCustomerEntrustQuery} from './redux/user/customer/customer-entrustQuery';
import {userCustomerLedgerQuery} from './redux/user/customer/customer-ledgerQuery';
import {userCustomerAccountSummary} from './redux/user/customer/customer-accountSummary';

// 渠道商管理
// 渠道商管理
import {userChannelDealer} from './redux/user/channelDealer/channelDealer';
import {userChannelDealerLowerLevelQuery} from './redux/user/channelDealer/channelDealer-lowerLevelQuery';

// 待结算佣金名单
import {userChannelDealerCommissions} from './redux/user/channelDealerCommissions/channelDealerCommissions';
import {userChannelDealerCommissionsChecklist} from './redux/user/channelDealerCommissions/channelDealerCommissions-checklist';
import {userChannelDealerCommissionsSettlement} from './redux/user/channelDealerCommissions/channelDealerCommissions-settlement';

// 待结算佣金名单
import {userChannelDealerSettleHistory} from './redux/user/channelDealerCommissions/channelDealerSettleHistory';
import {userChannelDealerSettleHistoryCommissions} from './redux/user/channelDealerCommissions/channelDealerSettleHistory-commissions';

// 历史分红名单
import {userHistoryDivideList} from './redux/user/historyDivideList/historyDivideList';
import {userHistoryDivideListDivideList} from './redux/user/historyDivideList/historyDivideList-divideList';

// 佣金结算历史
import {userCommissionsHistoryList} from './redux/user/commissionsHistoryList/commissionsHistoryList';
import {userCommissionsHistoryListCommissions} from './redux/user/commissionsHistoryList/commissionsHistoryList-commissions';

// 黑名单管理
import {userCustomerBlackList} from './redux/user/customer/customer-blackList';

// kyc审核
import {userKycCheck} from './redux/user/kycCheck/kycCheck';

// 资料审核
import {userDataCheck} from './redux/user/dataCheck/dataCheck';

// OTC交易管理
// 购买交易
import {tradeBuyTrade} from './redux/trade/buyTrade/buyTrade';

// 出售交易
import {tradeSaleTrade} from './redux/trade/saleTrade/saleTrade';

// OTC订单管理
// 进行中订单
import {tradeUnderWayOrder} from './redux/trade/underWayOrder/underWayOrder';

// 已结束订单
import {tradeFinishOrder} from './redux/trade/finishOrder/finishOrder';

// 仲裁订单管理
// 仲裁订单
import {tradeArbitrationOrder} from './redux/trade/arbitrationOrder/arbitrationOrder';

// 仲裁通知人
import {tradeArbitrationNotifier} from './redux/trade/arbitrationNotifier/arbitrationNotifier';

// 承兑商管理
// 收款方式
import {acceptPayment} from './redux/accept/payment/payment';

// 购买订单
import {acceptBuyOrder} from './redux/accept/buyOrder/buyOrder';

// 出售订单
import {acceptSaleOrder} from './redux/accept/saleOrder/saleOrder';

// 已完成订单
import {acceptFinishOrder} from './redux/accept/finishOrder/finishOrder';

// 币种管理
// 币种管理
import {bizCoin} from './redux/biz/coin/coin';

// 行情管理
// 交易对管理
import {quotationTradePair} from './redux/biz/quotation/tradePair';

// BTC行情
import {quotationQuotationBTC} from './redux/biz/quotation/quotationBTC';

// ETH行情
import {quotationQuotationETH} from './redux/biz/quotation/quotationETH';

// X行情
import {quotationQuotationX} from './redux/biz/quotation/quotationX';

// 法币汇率
import {quotationExchangeRate} from './redux/biz/quotation/exchangeRate';

// 市价调节值
import {quotationMarketAdjustment} from './redux/biz/quotation/marketAdjustment';

// 活动管理
// 邀请好友
import {activityInvitingFriends} from './redux/activity/invitingFriends/invitingFriends';

// 业务规则
// 广告费规则
import {rulesAdvertisingFee} from './redux/rules/advertisingFee/advertisingFee';

// 币币交易手续费规则
import {rulesSimuOrderRule} from './redux/rules/simuOrderRule/simuOrderRule';

// 提币手续费规则
import {rulesWithdrawUserFee} from './redux/rules/withdrawUserFee/withdrawUserFee';

// 承兑商手续费规则
import {rulesAcceptRule} from './redux/rules/acceptRule/acceptRule';

// 游戏配置
import {rulesGameConfig} from './redux/rules/gameConfig/gameConfig';

// 业务管理--评论管理
import { commentKeywords } from './redux/biz/comment/keywords';
import { commentCheck } from './redux/biz/comment/check';
import { commentList } from './redux/biz/comment/list';

// 统计分析
// 用户持币情况
import { statisticsUserHoldingCurrency } from './redux/statistics/userHoldingCurrency/userHoldingCurrency';
// 承兑商FMVP统计
import { statisticsAcceptFMVP } from './redux/statistics/acceptFMVP/acceptFMVP';
// 渠道商返佣统计
import { statisticsChannelReturnCommission } from './redux/statistics/channelReturnCommission/channelReturnCommission';
// 币币交易情况统计
import { statisticsCurrencyTransaction } from './redux/statistics/currencyTransaction/currencyTransaction';
// FMVP消耗比例
import { statisticsFMVPConsumptionRatio } from './redux/statistics/FMVPConsumptionRatio/FMVPConsumptionRatio';
// FMVP变现统计
import { statisticsFMVPRecharge } from './redux/statistics/FMVPRecharge/FMVPRecharge';
// 游戏FMVP统计
import { statisticsGameFMVP } from './redux/statistics/gameFMVP/gameFMVP';
// 获取FMVP途径
import { statisticsGetFMVPChannel } from './redux/statistics/getFMVPChannel/getFMVPChannel';
// CC交易OTC成交时间统计
import { statisticsOTCClosingTime } from './redux/statistics/OTCClosingTime/OTCClosingTime';
// OTC交易情况统计
import { statisticsOTCTransactions } from './redux/statistics/OTCTransactions/OTCTransactions';
// 用户币币盈亏统计
import { statisticsUserBBProfitLoss } from './redux/statistics/userBBProfitLoss/userBBProfitLoss';
// 用户返佣统计
import { statisticsUserReturnCommission } from './redux/statistics/userReturnCommission/userReturnCommission';
// 应用列表管理
import { bizApplicationList } from './redux/biz/applicationList/applicationList';
import { bizApplicationListHelpSet } from './redux/biz/applicationList/applicationListHelpSet';

// 量化理财管理
import { bizBuyAgreement } from './redux/biz/financial/buyAgreement';
import { bizInvestFlow } from './redux/biz/financial/investFlow';
import { bizInvestFlowAll } from './redux/biz/financial/investFlowAll';
import { bizProductsApprove } from './redux/biz/financial/productsApprove';
import { bizProductsRaise } from './redux/biz/financial/productsRaise';
import { bizProductsRaisefail } from './redux/biz/financial/productsRaisefail';
import { bizProductsRaiseSuccess } from './redux/biz/financial/productsRaiseSuccess';
import { bizProductsRepay } from './redux/biz/financial/productsRepay';
import { bizRepaymentPlan } from './redux/biz/financial/repaymentPlan';
import { bizProducts } from './redux/biz/financial/products';
import { bizSetDivRate } from './redux/biz/financial/setDivRate';

// 红包管理
import { bizReceiveQuery } from './redux/biz/redPacket/receiveQuery';
import { bizRedPacketQuery } from './redux/biz/redPacket/redPacketQuery';

/* BTC财务管理 */
// 平台账户
import {BTCFinancePlatformAccount} from './redux/BTC-finance/platformAccount/platformAccount';

// 分发地址
import {BTCFinanceDiviAddress} from './redux/BTC-finance/diviAddress/diviAddress';
import {BTCFinanceDiviAddressLedger} from './redux/BTC-finance/diviAddress/diviAddress-ledger';

// 充币管理
// 线下充值
import {BTCFinanceOfflineRecharge} from './redux/BTC-finance/offlineRecharge/offlineRecharge';
import {BTCFinanceOfflineRechargeAddEdit} from './redux/BTC-finance/offlineRecharge/offlineRecharge-addedit';
import {BTCFinanceOfflineRechargeDetail} from './redux/BTC-finance/offlineRecharge/offlineRecharge-detail';

// 充值查询
import {BTCFinanceOfflineRechargeQuery} from './redux/BTC-finance/offlineRecharge/offlineRechargeQuery';

// 提币管理
// 提币地址
import {BTCFinanceTBAddress} from './redux/BTC-finance/TBAddress/TBAddress';

// 线下提币
import {BTCFinanceTBunderline} from './redux/BTC-finance/TBunderline/TBunderline';
import {BTCFinanceTBunderlineAddEdit} from './redux/BTC-finance/TBunderline/TBunderline-addedit';
import {BTCFinanceTBunderlineMultiCheck} from './redux/BTC-finance/TBunderline/TBunderline-multiCheck';

// 归集管理
import {BTCFinanceGJAddress} from './redux/BTC-finance/GJAddress/GJAddress';
import {BTCFinanceGJAddressAddEdit} from './redux/BTC-finance/GJAddress/GJAddress-addedit';
import {BTCFinanceGJAddressQuery} from './redux/BTC-finance/GJAddressQuery/GJAddressQuery';
import {BTCFinanceGJAddressQueryAddEdit} from './redux/BTC-finance/GJAddressQuery/GJAddressQuery-addedit';
import {BTCFinanceGJManuallyAddEdit} from './redux/BTC-finance/GJManually/GJManually-addedit';

export default combineReducers({
    user,
    menu,
    modalDetail,
    systemRole,
    systemMenu,
    systemUser,
    systemPwdReset,
    systemSysParam,
    systemDataDict,
    // public
    publicBanner,
    publicAboutus,
    publicContact,
    publicPrivacy,
    publicRegister,
    publicBuyADS,
    publicSellETH,
    publicTransactionRemind,
    publicNotice,
    publicCommunity,
    publicWarmReminding,
    publicLegalDeclaration,
    publicRateExplain,
    // 会员查询
    userCustomer,
    userCustomerAccount,
    userCustomerEntrustQuery,
    userCustomerLedgerQuery,
    userCustomerAccountSummary,
    // 黑名单管理
    userCustomerBlackList,
    // kyc审核
    userKycCheck,
    // 资料审核
    userDataCheck,
    // 历史分红名单
    userHistoryDivideList,
    userHistoryDivideListDivideList,
    // 佣金结算历史
    userCommissionsHistoryList,
    userCommissionsHistoryListCommissions,
    // 渠道商管理
    // 渠道商管理
    userChannelDealer,
    userChannelDealerLowerLevelQuery,
    // 待结算佣金名单
    userChannelDealerCommissions,
    userChannelDealerCommissionsChecklist,
    userChannelDealerCommissionsSettlement,
    // 待结算佣金名单
    userChannelDealerSettleHistory,
    userChannelDealerSettleHistoryCommissions,
    // OTC交易
    tradeBuyTrade,
    tradeSaleTrade,
    tradeUnderWayOrder,
    tradeFinishOrder,
    tradeArbitrationOrder,
    tradeArbitrationNotifier,
    // 承兑商管理
    // 收款方式
    acceptPayment,
    // 购买订单
    acceptBuyOrder,
    // 出售订单
    acceptSaleOrder,
    // 已完成订单
    acceptFinishOrder,
    // 币种管理
    bizCoin,
    // 行情管理
    quotationTradePair,
    quotationQuotationBTC,
    quotationQuotationETH,
    quotationQuotationX,
    quotationExchangeRate,
    quotationMarketAdjustment,
    // 活动管理
    // 邀请好友
    activityInvitingFriends,
    // 业务规则
    // 广告费规则
    rulesAdvertisingFee,
    // 币币交易手续费规则
    rulesSimuOrderRule,
    // 提币手续费规则
    rulesWithdrawUserFee,
    // 承兑商手续费规则
    rulesAcceptRule,
    // 游戏配置
    rulesGameConfig,
    // 业务管理 评论管理
    commentKeywords,
    commentCheck,
    commentList,
    // 统计分析
    statisticsUserHoldingCurrency,
    statisticsAcceptFMVP,
    statisticsChannelReturnCommission,
    statisticsCurrencyTransaction,
    statisticsFMVPConsumptionRatio,
    statisticsFMVPRecharge,
    statisticsGameFMVP,
    statisticsGetFMVPChannel,
    statisticsOTCClosingTime,
    statisticsOTCTransactions,
    statisticsUserBBProfitLoss,
    statisticsUserReturnCommission,
    // 应用列表管理
    bizApplicationList,
    bizApplicationListHelpSet,
    bizBuyAgreement,
    bizInvestFlow,
    bizInvestFlowAll,
    bizProductsApprove,
    bizProductsRaise,
    bizProductsRaisefail,
    bizProductsRaiseSuccess,
    bizProductsRepay,
    bizRepaymentPlan,
    bizProducts,
    bizSetDivRate,
    // 红包管理
    bizReceiveQuery,
    bizRedPacketQuery,
    /* BTC 财务管理 */
    // 平台账户
    BTCFinancePlatformAccount,
    // 分发地址
    BTCFinanceDiviAddress,
    BTCFinanceDiviAddressLedger,
    // 充币管理
    BTCFinanceOfflineRecharge,
    BTCFinanceOfflineRechargeAddEdit,
    BTCFinanceOfflineRechargeDetail,
    BTCFinanceOfflineRechargeQuery,
    // 提币管理
    BTCFinanceTBAddress,
    BTCFinanceTBunderline,
    BTCFinanceTBunderlineAddEdit,
    BTCFinanceTBunderlineMultiCheck,
    // 归集管理
    BTCFinanceGJAddress,
    BTCFinanceGJAddressAddEdit,
    BTCFinanceGJAddressQuery,
    BTCFinanceGJAddressQueryAddEdit,
    BTCFinanceGJManuallyAddEdit
});
