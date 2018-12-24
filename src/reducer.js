import {combineReducers} from 'redux';
import {user} from './redux/user';
import {menu} from './redux/menu';
import {modalDetail} from './redux/modal/build-modal-detail';
import {systemRole} from './redux/system/role';
import {systemRoleAddEdit} from './redux/system/role-addedit';
import {systemMenu} from './redux/system/menu';
import {systemMenuAddEdit} from './redux/system/menu-addedit';
import {systemSysParam} from './redux/system/sysParam';
import {systemSysParamAddEdit} from './redux/system/sysParam-addedit';
import {systemUser} from './redux/system/user';
import {systemUserResetPwd} from './redux/system/user-resetPwd';
import {systemAssign} from './redux/system/assign';
import {systemPwdReset} from './redux/system/pwdReset';
import {systemUserAddEdit} from './redux/system/user-addedit';
import {systemDataDict} from './redux/system/dataDict';
import {systemDataDictAddEdit} from './redux/system/dataDict-addedit';
import {systemNode} from './redux/system/node';
import {systemNodeAddEdit} from './redux/system/node-addedit';
import {systemNodeSetMateriallist} from './redux/system/node-setMateriallist';
import {publicBanner} from './redux/public/banner';
import {publicBannerAddEdit} from './redux/public/banner-addedit';
import {publicAboutus} from './redux/public/aboutus';
import {publicAboutusAddEdit} from './redux/public/aboutus-addedit';
import {publicContact} from './redux/public/contact';
import {publicContactAddEdit} from './redux/public/contact-addedit';
import {publicPrivacy} from './redux/public/privacy';
import {publicPrivacyAddEdit} from './redux/public/privacy-addedit';
import {publicRegister} from './redux/public/register';
import {publicRegisterAddEdit} from './redux/public/register-addedit';
import {publicBuyADS} from './redux/public/buyADS';
import {publicBuyADSAddEdit} from './redux/public/buyADS-addedit';
import {publicSellETH} from './redux/public/sellETH';
import {publicSellETHAddEdit} from './redux/public/sellETH-addedit';
import {publicTransactionRemind} from './redux/public/TransactionRemind';
import {publicTransactionRemindAddEdit} from './redux/public/TransactionRemind-addedit';
import {publicNotice} from './redux/public/notice';
import {publicNoticeAddEdit} from './redux/public/notice-addedit';
import {publicCommunity} from './redux/public/community';
import {publicCommunityAddEdit} from './redux/public/community-addedit';
import {publicWarmReminding} from './redux/public/warmReminding';
import {publicWarmRemindingAddedit} from './redux/public/warmReminding-addedit';
import {publicLegalDeclaration} from './redux/public/legalDeclaration';
import {publicLegalDeclarationAddEdit} from './redux/public/legalDeclaration-addedit';
import {publicRateExplain} from './redux/public/rateExplain';
import {publicRateExplainAddEdit} from './redux/public/rateExplain-addedit';

/* 业务管理 */
// 客户管理
// 会员查询
import {userCustomer} from './redux/user/customer/customer';
import {userCustomerAddEdit} from './redux/user/customer/customer-addedit';
import {userCustomerAccount} from './redux/user/customer/customer-account';
import {userCustomerEditAdvertisementFee} from './redux/user/customer/customer-editAdvertisementFee';
import {userCustomerEntrustQuery} from './redux/user/customer/customer-entrustQuery';
import {userCustomerLedgerQuery} from './redux/user/customer/customer-ledgerQuery';
import {userCustomerAccountSummary} from './redux/user/customer/customer-accountSummary';

// 渠道商管理
// 渠道商管理
import {userChannelDealer} from './redux/user/channelDealer/channelDealer';
import {userChannelDealerAddEdit} from './redux/user/channelDealer/channelDealer-addedit';
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
import {userHistoryDivideListDivide} from './redux/user/historyDivideList/historyDivideList-divide';

// 佣金结算历史
import {userCommissionsHistoryList} from './redux/user/commissionsHistoryList/commissionsHistoryList';
import {userCommissionsHistoryListCommissions} from './redux/user/commissionsHistoryList/commissionsHistoryList-commissions';

// 黑名单管理
import {userCustomerBlackList} from './redux/user/customer/customer-blackList';
import {userCustomerBlackListAddEdit} from './redux/user/customer/customer-blackListAddedit';

// kyc审核
import {userKycCheck} from './redux/user/kycCheck/kycCheck';
import {userKycCheckAddEdit} from './redux/user/kycCheck/kycCheck-addedit';

// 资料审核
import {userDataCheck} from './redux/user/dataCheck/dataCheck';
import {userDataCheckAddEdit} from './redux/user/dataCheck/dataCheck-addedit';

// OTC交易管理
// 购买交易
import {tradeBuyTrade} from './redux/trade/buyTrade/buyTrade';
import {tradeBuyTradeAddEdit} from './redux/trade/buyTrade/buyTrade-addedit';

// 出售交易
import {tradeSaleTrade} from './redux/trade/saleTrade/saleTrade';
import {tradeSaleTradeAddEdit} from './redux/trade/saleTrade/saleTrade-addedit';

// OTC订单管理
// 进行中订单
import {tradeUnderWayOrder} from './redux/trade/underWayOrder/underWayOrder';
import {tradeUnderWayOrderAddEdit} from './redux/trade/underWayOrder/underWayOrder-addedit';

// 已结束订单
import {tradeFinishOrder} from './redux/trade/finishOrder/finishOrder';
import {tradeFinishOrderAddEdit} from './redux/trade/finishOrder/finishOrder-addedit';

// 仲裁订单管理
// 仲裁订单
import {tradeArbitrationOrder} from './redux/trade/arbitrationOrder/arbitrationOrder';
import {tradeArbitrationOrderAddEdit} from './redux/trade/arbitrationOrder/arbitrationOrder-addedit';
import {tradeArbitrationOrderResolve} from './redux/trade/arbitrationOrder/arbitrationOrder-resolve';

// 仲裁通知人
import {tradeArbitrationNotifier} from './redux/trade/arbitrationNotifier/arbitrationNotifier';
import {tradeArbitrationNotifierAddEdit} from './redux/trade/arbitrationNotifier/arbitrationNotifier-addedit';

// 承兑商管理
// 收款方式
import {acceptPayment} from './redux/accept/payment/payment';
import {acceptPaymentAddEdit} from './redux/accept/payment/payment-addedit';

// 购买订单
import {acceptBuyOrder} from './redux/accept/buyOrder/buyOrder';
import {acceptBuyOrderAddEdit} from './redux/accept/buyOrder/buyOrder-addedit';

// 出售订单
import {acceptSaleOrder} from './redux/accept/saleOrder/saleOrder';
import {acceptSaleOrderAddEdit} from './redux/accept/saleOrder/saleOrder-addedit';

// 已完成订单
import {acceptFinishOrder} from './redux/accept/finishOrder/finishOrder';
import {acceptFinishOrderAddEdit} from './redux/accept/finishOrder/finishOrder-addedit';

// 币种管理
// 币种管理
import {bizCoin} from './redux/biz/coin/coin';
import {bizCoinAddEdit} from './redux/biz/coin/coin-addedit';

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
import {quotationMarketAdjustmentAddEdit} from './redux/biz/quotation/marketAdjustment-addedit';

// 活动管理
// 邀请好友
import {activityInvitingFriends} from './redux/activity/invitingFriends/invitingFriends';
import {activityInvitingFriendsAddEdit} from './redux/activity/invitingFriends/invitingFriends-addedit';

// 邀请好友链接文本
import {activityInvitingTxtAddEdit} from './redux/activity/invitingHref/invitingTxt-addedit';

// 业务规则
// 广告费规则
import {rulesAdvertisingFee} from './redux/rules/advertisingFee/advertisingFee';
import {rulesAdvertisingFeeAddEdit} from './redux/rules/advertisingFee/advertisingFee-addedit';

// 币币交易手续费规则
import {rulesSimuOrderRule} from './redux/rules/simuOrderRule/simuOrderRule';
import {rulesSimuOrderRuleAddEdit} from './redux/rules/simuOrderRule/simuOrderRule-addedit';

// 提币手续费规则
import {rulesWithdrawUserFee} from './redux/rules/withdrawUserFee/withdrawUserFee';
import {rulesWithdrawUserFeeAddEdit} from './redux/rules/withdrawUserFee/withdrawUserFee-addedit';

// 承兑商手续费规则
import {rulesAcceptRule} from './redux/rules/acceptRule/acceptRule';
import {rulesAcceptRuleAddEdit} from './redux/rules/acceptRule/acceptRule-addedit';

// 游戏配置
import {rulesGameConfig} from './redux/rules/gameConfig/gameConfig';
import {rulesGameConfigAddEdit} from './redux/rules/gameConfig/gameConfig-addedit';

/* ETH财务管理 */
// 平台账户
import {financePlatformAccount} from './redux/finance/platformAccount/platformAccount';

// 分发地址
import {financeDiviAddress} from './redux/finance/diviAddress/diviAddress';
import {financeDiviAddressLedger} from './redux/finance/diviAddress/diviAddress-ledger';

// 充币管理
// 线下充值
import {financeOfflineRecharge} from './redux/finance/offlineRecharge/offlineRecharge';
import {financeOfflineRechargeAddEdit} from './redux/finance/offlineRecharge/offlineRecharge-addedit';
import {financeOfflineRechargeDetail} from './redux/finance/offlineRecharge/offlineRecharge-detail';

// 充值查询
import {financeOfflineRechargeQuery} from './redux/finance/offlineRecharge/offlineRechargeQuery';

// 提币管理
// 提币地址
import {financeTBAddress} from './redux/finance/TBAddress/TBAddress';

// 线下提币
import {financeTBunderline} from './redux/finance/TBunderline/TBunderline';
import {financeTBunderlineAddEdit} from './redux/finance/TBunderline/TBunderline-addedit';
import {financeTBunderlineMultiCheck} from './redux/finance/TBunderline/TBunderline-multiCheck';

// 归集管理
import {financeGJAddress} from './redux/finance/GJAddress/GJAddress';
import {financeGJAddressAddEdit} from './redux/finance/GJAddress/GJAddress-addedit';
import {financeGJAddressQuery} from './redux/finance/GJAddressQuery/GJAddressQuery';
import {financeGJAddressQueryAddEdit} from './redux/finance/GJAddressQuery/GJAddressQuery-addedit';
import {financeGJManuallyAddEdit} from './redux/finance/GJManually/GJManually-addedit';

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

/* TOKEN财务管理 */
// 平台账户
import {TOKENFinancePlatformAccount} from './redux/TOKEN-finance/platformAccount/platformAccount';

// 分发地址
import {TOKENFinanceDiviAddress} from './redux/TOKEN-finance/diviAddress/diviAddress';
import {TOKENFinanceDiviAddressLedger} from './redux/TOKEN-finance/diviAddress/diviAddress-ledger';

// 平台分红
import {TOKENFinancePlatformDivide} from './redux/TOKEN-finance/platformDivide/platformDivide';
import {TOKENFinancePlatformDivideDivide} from './redux/TOKEN-finance/platformDivide/platformDivide-divide';
import {TOKENFinancePlatformDivideDivideList} from './redux/TOKEN-finance/platformDivide/platformDivide-divideList';
import {TOKENFinancePlatformDivideHistory} from './redux/TOKEN-finance/platformDivideHistory/platformDivideHistory';
import {TOKENFinancePlatformDivideNext} from './redux/TOKEN-finance/platformDivideNext/platformDivideNext';

// 特殊奖励
import {TOKENFinanceSpecialReward} from './redux/TOKEN-finance/specialReward/specialReward';
import {TOKENFinanceSpecialRewardAddEdit} from './redux/TOKEN-finance/specialReward/specialReward-addedit';
import {TOKENFinanceSpecialRewardHistory} from './redux/TOKEN-finance/specialRewardHistory/specialRewardHistory';

// 充币管理
// 线下充值
import {TOKENFinanceOfflineRecharge} from './redux/TOKEN-finance/offlineRecharge/offlineRecharge';
import {TOKENFinanceOfflineRechargeAddEdit} from './redux/TOKEN-finance/offlineRecharge/offlineRecharge-addedit';
import {TOKENFinanceOfflineRechargeDetail} from './redux/TOKEN-finance/offlineRecharge/offlineRecharge-detail';

// 充值查询
import {TOKENFinanceOfflineRechargeQuery} from './redux/TOKEN-finance/offlineRecharge/offlineRechargeQuery';

// 提币管理
// 提币地址
import {TOKENFinanceTBAddress} from './redux/TOKEN-finance/TBAddress/TBAddress';

// 线下提币
import {TOKENFinanceTBunderline} from './redux/TOKEN-finance/TBunderline/TBunderline';
import {TOKENFinanceTBunderlineAddEdit} from './redux/TOKEN-finance/TBunderline/TBunderline-addedit';
import {TOKENFinanceTBunderlineMultiCheck} from './redux/TOKEN-finance/TBunderline/TBunderline-multiCheck';

// 归集管理
import {TOKENFinanceGJAddress} from './redux/TOKEN-finance/GJAddress/GJAddress';
import {TOKENFinanceGJAddressAddEdit} from './redux/TOKEN-finance/GJAddress/GJAddress-addedit';
import {TOKENFinanceGJAddressQuery} from './redux/TOKEN-finance/GJAddressQuery/GJAddressQuery';
import {TOKENFinanceGJAddressQueryAddEdit} from './redux/TOKEN-finance/GJAddressQuery/GJAddressQuery-addedit';
import {TOKENFinanceGJManuallyAddEdit} from './redux/TOKEN-finance/GJManually/GJManually-addedit';

// 游戏管理
import {TOKENFinanceGameInQuery} from './redux/TOKEN-finance/gameInQuery/gameInQuery';
import {TOKENFinanceGameInQueryAddEdit} from './redux/TOKEN-finance/gameInQuery/gameInQuery-addedit';
import {TOKENFinanceGameOutQuery} from './redux/TOKEN-finance/gameOutQuery/gameOutQuery';
import {TOKENFinanceGameOutQueryAddEdit} from './redux/TOKEN-finance/gameOutQuery/gameOutQuery-addedit';

// 业务管理--评论管理
import { commentKeywords } from './redux/biz/comment/keywords';
import { commentKeywordsAddEdit } from './redux/biz/comment/keywords-addedit';
import { commentCheck } from './redux/biz/comment/check';
import { commentCheckAddEdit } from './redux/biz/comment/check-addedit';
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

export default combineReducers({
    user,
    menu,
    modalDetail,
    systemRole,
    systemRoleAddEdit,
    systemMenu,
    systemMenuAddEdit,
    systemUser,
    systemAssign,
    systemPwdReset,
    systemSysParam,
    systemSysParamAddEdit,
    systemUserAddEdit,
    systemUserResetPwd,
    systemDataDict,
    systemDataDictAddEdit,
    systemNode,
    systemNodeAddEdit,
    systemNodeSetMateriallist,
    // public
    publicBanner,
    publicBannerAddEdit,
    publicAboutus,
    publicAboutusAddEdit,
    publicContact,
    publicContactAddEdit,
    publicPrivacy,
    publicPrivacyAddEdit,
    publicRegister,
    publicRegisterAddEdit,
    publicBuyADS,
    publicBuyADSAddEdit,
    publicSellETH,
    publicSellETHAddEdit,
    publicTransactionRemind,
    publicTransactionRemindAddEdit,
    publicNotice,
    publicNoticeAddEdit,
    publicCommunity,
    publicCommunityAddEdit,
    publicWarmReminding,
    publicWarmRemindingAddedit,
    publicLegalDeclaration,
    publicLegalDeclarationAddEdit,
    publicRateExplain,
    publicRateExplainAddEdit,
    // 会员查询
    userCustomer,
    userCustomerAddEdit,
    userCustomerAccount,
    userCustomerEditAdvertisementFee,
    userCustomerEntrustQuery,
    userCustomerLedgerQuery,
    userCustomerAccountSummary,
    // 黑名单管理
    userCustomerBlackList,
    userCustomerBlackListAddEdit,
    // kyc审核
    userKycCheck,
    userKycCheckAddEdit,
    // 资料审核
    userDataCheck,
    userDataCheckAddEdit,
    // 历史分红名单
    userHistoryDivideList,
    userHistoryDivideListDivideList,
    userHistoryDivideListDivide,
    // 佣金结算历史
    userCommissionsHistoryList,
    userCommissionsHistoryListCommissions,
    // 渠道商管理
    // 渠道商管理
    userChannelDealer,
    userChannelDealerAddEdit,
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
    tradeBuyTradeAddEdit,
    tradeSaleTrade,
    tradeSaleTradeAddEdit,
    tradeUnderWayOrder,
    tradeUnderWayOrderAddEdit,
    tradeFinishOrder,
    tradeFinishOrderAddEdit,
    tradeArbitrationOrder,
    tradeArbitrationOrderAddEdit,
    tradeArbitrationOrderResolve,
    tradeArbitrationNotifier,
    tradeArbitrationNotifierAddEdit,
    // 承兑商管理
    // 收款方式
    acceptPayment,
    acceptPaymentAddEdit,
    // 购买订单
    acceptBuyOrder,
    acceptBuyOrderAddEdit,
    // 出售订单
    acceptSaleOrder,
    acceptSaleOrderAddEdit,
    // 已完成订单
    acceptFinishOrder,
    acceptFinishOrderAddEdit,
    // 币种管理
    bizCoin,
    bizCoinAddEdit,
    // 行情管理
    quotationTradePair,
    quotationQuotationBTC,
    quotationQuotationETH,
    quotationQuotationX,
    quotationExchangeRate,
    quotationMarketAdjustment,
    quotationMarketAdjustmentAddEdit,
    // 活动管理
    // 邀请好友
    activityInvitingFriends,
    activityInvitingFriendsAddEdit,
    // 邀请好友链接文本
    activityInvitingTxtAddEdit,
    // 业务规则
    // 广告费规则
    rulesAdvertisingFee,
    rulesAdvertisingFeeAddEdit,
    // 币币交易手续费规则
    rulesSimuOrderRule,
    rulesSimuOrderRuleAddEdit,
    // 提币手续费规则
    rulesWithdrawUserFee,
    rulesWithdrawUserFeeAddEdit,
    // 承兑商手续费规则
    rulesAcceptRule,
    rulesAcceptRuleAddEdit,
    // 游戏配置
    rulesGameConfig,
    rulesGameConfigAddEdit,
    /* ETH 财务管理 */
    // 平台账户
    financePlatformAccount,
    // 分发地址
    financeDiviAddress,
    financeDiviAddressLedger,
    // 充币管理
    financeOfflineRecharge,
    financeOfflineRechargeAddEdit,
    financeOfflineRechargeDetail,
    financeOfflineRechargeQuery,
    // 提币管理
    financeTBAddress,
    financeTBunderline,
    financeTBunderlineAddEdit,
    financeTBunderlineMultiCheck,
    // 归集管理
    financeGJAddress,
    financeGJAddressAddEdit,
    financeGJAddressQuery,
    financeGJAddressQueryAddEdit,
    financeGJManuallyAddEdit,

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
    BTCFinanceGJManuallyAddEdit,
    /* TOKEN 财务管理 */
    // 平台账户
    TOKENFinancePlatformAccount,
    // 分发地址
    TOKENFinanceDiviAddress,
    TOKENFinanceDiviAddressLedger,
    // 平台分红
    TOKENFinancePlatformDivide,
    TOKENFinancePlatformDivideDivide,
    TOKENFinancePlatformDivideDivideList,
    TOKENFinancePlatformDivideHistory,
    TOKENFinancePlatformDivideNext,
    // 特殊奖励
    TOKENFinanceSpecialReward,
    TOKENFinanceSpecialRewardAddEdit,
    TOKENFinanceSpecialRewardHistory,
    // 充币管理
    TOKENFinanceOfflineRecharge,
    TOKENFinanceOfflineRechargeAddEdit,
    TOKENFinanceOfflineRechargeDetail,
    TOKENFinanceOfflineRechargeQuery,
    // 提币管理
    TOKENFinanceTBAddress,
    TOKENFinanceTBunderline,
    TOKENFinanceTBunderlineAddEdit,
    TOKENFinanceTBunderlineMultiCheck,
    // 归集管理
    TOKENFinanceGJAddress,
    TOKENFinanceGJAddressAddEdit,
    TOKENFinanceGJAddressQuery,
    TOKENFinanceGJAddressQueryAddEdit,
    TOKENFinanceGJManuallyAddEdit,
    // 游戏管理
    TOKENFinanceGameInQuery,
    TOKENFinanceGameInQueryAddEdit,
    TOKENFinanceGameOutQuery,
    TOKENFinanceGameOutQueryAddEdit,
    // 业务管理 评论管理
    commentKeywords,
    commentKeywordsAddEdit,
    commentCheck,
    commentCheckAddEdit,
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
    statisticsUserReturnCommission
});
