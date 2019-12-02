import {combineReducers} from 'redux';
import {user} from './redux/user';
import {menu} from './redux/menu';
import {message} from './redux/message';
import {modalDetail} from './redux/modal/build-modal-detail';
import {systemRole} from './redux/system/role';
import {systemMenu} from './redux/system/menu';
import {systemSysParam} from './redux/system/sysParam';
import {systemUser} from './redux/system/user';
import {systemPwdReset} from './redux/system/pwdReset';
import {systemDataDict} from './redux/system/dataDict';
import {publicAboutus} from './redux/public/aboutus';
import {publicQuantitative} from './redux/public/quantitative';
import {publicContact} from './redux/public/contact';
import {publicPrivacy} from './redux/public/privacy';
import {publicMachineProtocol} from './redux/public/machineProtocol';
import {publicRegister} from './redux/public/register';
import {publicBuyADS} from './redux/public/buyADS';
import {publicSellETH} from './redux/public/sellETH';
import {publicTransactionRemind} from './redux/public/TransactionRemind';
import {publicCommunity} from './redux/public/community';
import {publicCommunityAddEdit} from './redux/public/community-addedit';
import {publicWarmReminding} from './redux/public/warmReminding';
import {publicLegalDeclaration} from './redux/public/legalDeclaration';
import {publicRateExplain} from './redux/public/rateExplain';
import {publicLhlcxy} from './redux/public/lhlcxy';
import {publicHelpCenter} from './redux/public/helpCenter';
import {biztodayprofit} from './redux/biz/financial/todayprofit';
import {AppManagent} from './redux/managent/appmanagent';
import {Alerts} from './redux/managent/alerts';
import {DappManagent} from './redux/managent/dappmanagent';
import {DappTrateGy} from './redux/managent/dapptrategy';
import {tradingSdRecord} from './redux/trading/sdRecord/sdRecord';
import {cloudMillMessage} from './redux/cloud/millMessage/millMessage';
import {cloudMillOrder} from './redux/cloud/millOrder/millOrder';
import {cloudMillOrderIncome} from './redux/cloud/millOrder/millOrderIncome';
import {cloudRules} from './redux/cloud/rules/rules';
import {millMessage} from './redux/mill/millMessage/millMessage';
import {millOrder} from './redux/mill/millOrder/millOrder';
import {millOrderIncome} from './redux/mill/millOrder/millOrderIncome';
import {millRules} from './redux/mill/rules/rules';
import {millUser} from './redux/mill/millUser/millUser';
import {quantitativeAi} from './redux/quantitativeAi/quantitativeAi/quantitativeAi';
import {quantitativeAiOrder} from './redux/quantitativeAi/quantitativeAiOrder/quantitativeAiOrder';
import {quantitativeAiOrderIncome} from './redux/quantitativeAi/quantitativeAiOrder/quantitativeAiOrderIncome';
import {quantitativeAiRule} from './redux/quantitativeAi/quantitativeAiRule/quantitativeAiRule';
import {dailyReport} from './redux/flashManagement/dailyReport';

/* 业务管理 */
// 客户管理
// 会员查询
import {userCustomer} from './redux/user/customer/customer';
import {userCustomerAccount} from './redux/user/customer/customer-account';
import {userCustomerEntrustQuery} from './redux/user/customer/customer-entrustQuery';
import {userCustomerLedgerQuery} from './redux/user/customer/customer-ledgerQuery';
import {userCustomerAccountSummary} from './redux/user/customer/customer-accountSummary';
import {userCustomerIdentify} from './redux/user/customer/identify';

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
// 提币通知人
import {NotifierofWithdrawal} from './redux/trade/notifierofwithdrawal/notifierofwithdrawal';
// 承兑商管理
// 收款方式
import {acceptPayment} from './redux/accept/payment/payment';

// 购买订单
import {acceptBuyOrder} from './redux/accept/buyOrder/buyOrder';

// 出售订单
import {acceptSaleOrder} from './redux/accept/saleOrder/saleOrder';

// 已完成订单
import {acceptFinishOrder} from './redux/accept/finishOrder/finishOrder';

// 已取消订单
import {acceptCancelOrder} from './redux/accept/cancelOrder/cancelOrder';

// 行情管理

// BTC行情
import {quotationQuotationBTC} from './redux/biz/quotation/quotationBTC';

// 自配行情
import {quotationQuotationZP} from './redux/biz/quotation/quotationZP';

// 承兑商行情
import {quotationQuotationCDS} from './redux/biz/quotation/quotationCDS';

// ETH行情
import {quotationQuotationETH} from './redux/biz/quotation/quotationETH';
// trx行情
import {quotationQuotationTRX} from './redux/biz/quotation/quotationTRX';

// 法币汇率
import {quotationExchangeRate} from './redux/biz/quotation/exchangeRate';

// 市价调节值
import {quotationMarketAdjustment} from './redux/biz/quotation/marketAdjustment';

// 活动管理
// 邀请好友
import {activityInvitingFriends} from './redux/activity/invitingFriends/invitingFriends';

import {activityGoldenMile} from './redux/activity/goldenMile/goldenMile';
import {activityBednReward} from './redux/activity/bednReward/bednReward';

// 业务规则
// 广告费规则
import {rulesAdvertisingFee} from './redux/rules/advertisingFee/advertisingFee';

// 提币手续费规则
import {BTCFinanceWithdrawRule} from './redux/BTC-finance/withdrawRule/withdrawRule';

// 承兑商手续费规则
import {rulesAcceptRule} from './redux/rules/acceptRule/acceptRule';

// 业务管理--评论管理
import {commentKeywords} from './redux/biz/comment/keywords';
import {commentCheck} from './redux/biz/comment/check';
import {commentList} from './redux/biz/comment/list';
// 应用列表管理
import {bizApplicationList} from './redux/biz/applicationList/applicationList';
import {bizApplicationListHelpSet} from './redux/biz/applicationList/applicationListHelpSet';

// 量化理财管理
import {bizBuyAgreement} from './redux/biz/financial/buyAgreement';
import {bizInvestFlow} from './redux/biz/financial/investFlow';
import {bizInvestFlowAll} from './redux/biz/financial/investFlowAll';
import {bizProductsApprove} from './redux/biz/financial/productsApprove';
import {bizProductsRaise} from './redux/biz/financial/productsRaise';
import {bizProductsRaisefail} from './redux/biz/financial/productsRaisefail';
import {bizProductsBearing} from './redux/biz/financial/productsBearing';
import {bizProductsCan} from './redux/biz/financial/productsCan';
import {bizProductsWill} from './redux/biz/financial/productsWill';
import {bizProductsRaiseSuccess} from './redux/biz/financial/productsRaiseSuccess';
import {bizProductsRepay} from './redux/biz/financial/productsRepay';
import {bizRepaymentPlan} from './redux/biz/financial/repaymentPlan';
import {bizProducts} from './redux/biz/financial/products';
import {bizSetDivRate} from './redux/biz/financial/setDivRate';
import {bizProductsProfit} from './redux/biz/financial/productsProfit';

// 红包管理
import {bizReceiveQuery} from './redux/biz/redPacket/receiveQuery';
import {bizRedPacketQuery} from './redux/biz/redPacket/redPacketQuery';

/* BTC财务管理 */
// 查询地址
import {BTCFinancePlatformAccount} from './redux/BTC-finance/platformAccount/platformAccount';
// 平台账户
import {addressQuery} from './redux/BTC-finance/addressQuery';

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

import {BTCFinanceLoseMoney} from './redux/BTC-finance/loseMoney/loseMoney';

import {BTCFinanceLockout} from './redux/BTC-finance/lockout/lockout';
import {BTCFinanceLockUp} from './redux/BTC-finance/lockout/lockUp';
import {BTCFinanceLockRelease} from './redux/BTC-finance/lockout/lockRelease';

// 线下提币
import {BTCFinanceTBunderline} from './redux/BTC-finance/TBunderline/TBunderline';
import {BTCFinanceTBunderlineAddEdit} from './redux/BTC-finance/TBunderline/TBunderline-addedit';
import {BTCFinanceTBunderlineMultiCheck} from './redux/BTC-finance/TBunderline/TBunderline-multiCheck';
import {publicNotice} from './redux/public/notice';
import {publicNoticeAddEdit} from './redux/public/notice-addedit';
// OTC标签设置
import {publicOtctag} from './redux/public/otcTag';
// OTC 国家设置

import {publicOtcCountry} from './redux/public/otccountry';
import {quanTitativeCategory} from './redux/public/quantitativecategory';
import {GoSettlement} from './redux/marketsettlement/gosettlement';

// OTC 支付方式设置
import {publicOtcPayment} from './redux/public/otcpayment';
import {publicLawRate} from './redux/public/lawrate';
import {publicChannelBank} from './redux/public/channelbank';
// 业务管理-- OTC管理
import {OtcManageAdvert} from './redux/otcmanage/advert';
import {OtcManageAdvertAddedit} from './redux/otcmanage/advert-addedit';
import {OtcSurvivaLorDerOrderedit} from './redux/otcmanage/survivalorder-orderedit';
import {OtcSurvivaLorDer} from './redux/otcmanage/survivalorder';
import {OtcManageHistoricalorder} from './redux/otcmanage/historicalorder';
import {OtcManageHistoricalorderEdit} from './redux/otcmanage/historicalorder-orderedit';
import {OtcManageComment} from './redux/otcmanage/comment';

// 星球抽奖
import {starLuckyStarMessage} from './redux/biz/starLucky/starMessage';
import {starLuckyStarLuckyUser} from './redux/biz/starLucky/starLuckyUser';
import {starLuckyStarJackpot} from './redux/biz/starLucky/starJackpot';
import {starLuckyStarConfiguration} from './redux/biz/starLucky/starConfiguration';
import {starLuckyStarRules} from './redux/biz/starLucky/starRules';
import {starLuckyStarQuery} from './redux/biz/starLucky/starQuery';
import {starLuckyStarParticipate} from './redux/biz/starLucky/starParticipate';
import {starLuckyStarBonusIncome} from './redux/biz/starLucky/starBonusIncome';
import {starLuckyStarJackpotRecord} from './redux/biz/starLucky/starJackpotRecord';
import {starLuckyStarLegacyRecords} from './redux/biz/starLucky/starLegacyRecords';
import {starLuckyStarRecordRecord} from './redux/biz/starLucky/starRecordRecord';
import {starLuckyStarIntoPool} from './redux/biz/starLucky/starIntoPool';
import {starLuckyTotayScene} from './redux/biz/starLucky/totayScene';

// 归集管理
import {BTCFinanceGJAddress} from './redux/BTC-finance/GJAddress/GJAddress';
import {BTCFinanceGJAddressAddEdit} from './redux/BTC-finance/GJAddress/GJAddress-addedit';
import {BTCFinanceGJAddressQuery} from './redux/BTC-finance/GJAddressQuery/GJAddressQuery';
import {BTCFinanceGJAddressQueryAddEdit} from './redux/BTC-finance/GJAddressQuery/GJAddressQuery-addedit';
import {publicBanner} from './redux/public/banner';
import {publicBannerAddEdit} from './redux/public/banner-addedit';
// 点位管理
import {publicPointPostion} from './redux/public/pointpostion';
// 交易对管理
import {tradingTradMessage} from './redux/trading/tradMessage/tradMessage';
// 补给地址
import {BTCFinanceSupplyAddress} from './redux/BTC-finance/supplyAddress/supplyAddress';
import {BTCFinanceDiviAddressAddedit} from './redux/BTC-finance/diviAddress/diviAddressAddedit';
// 业务管理-- 营销管理
import {StadySettLement} from './redux/marketsettlement/stadysettlement';
import {NoOrder} from './redux/marketsettlement/noorder';
import {StayOrder} from './redux/marketsettlement/stayorder';
import {AlreadySettlement} from './redux/marketsettlement/alreadysettlement';
import {TAG} from './redux/managent/tag';

// 统计分析
import {DropsWater} from './redux/statisticalAnalysis/dropsWater';

// 生态管理
// 三方应用
import {ThreePartyAppCategory} from './redux/ecology/threePartyApp/category';

// 集成生态
import {IntegrationEcology} from './redux/ecology/integrationEcology/integrationEcology/integrationEcology';
import {IntegrationEcologyUserQuery} from './redux/ecology/integrationEcology/userQuery/userQuery';
import {IntegrationEcologyTransferAccountsQuery} from './redux/ecology/integrationEcology/transferAccountsQuery/transferAccountsQuery';
import {IntegrationEcologyBonusPool} from './redux/ecology/integrationEcology/bonusPool/bonusPool';
import {IntegrationEcologyBonusPoolRecord} from './redux/ecology/integrationEcology/bonusPoolRecord/bonusPoolRecord';
import {IntegrationEcologyConfigure} from './redux/ecology/integrationEcology/configure/configure';
import {integrationEcologyOfficial} from './redux/ecology/integrationEcology/integrationEcology/integrationEcologyOfficial';

// 超级节点
import {SuperNodeHome} from './redux/superNode/home';
import {SuperNodeBonusPool} from './redux/superNode/bonusPool';
import {SuperNodeBonusPoolRecordIntoNow} from './redux/superNode/bonusPoolRecordIntoNow';
import {SuperNodeBonusPoolRecordIntoPrev} from './redux/superNode/bonusPoolRecordIntoPrev';
import {SuperNodePeriods} from './redux/superNode/periods';
import {SuperNodeNode} from './redux/superNode/node';
import {SuperNodeCustomer} from './redux/superNode/customer';
import {SuperNodeVoteDistribution} from './redux/superNode/voteDistribution';
import {SuperNodeVoteRecord} from './redux/superNode/voteRecord';
import {SuperNodeBuyBackRecord} from './redux/superNode/buyBackRecord';
import {SuperNodeIncomeRecord} from './redux/superNode/incomeRecord';
import {SuperNodeSetting} from './redux/superNode/setting';
import {SuperNodeLeftOver} from './redux/superNode/leftOver';
import {SuperNodeAdjustment} from './redux/superNode/adjustment';

// 统计分析-- 监控管理 - triggers监控
import { timerMonitor } from './redux/timerManager/timerMonitor/timerMonitor';
// 统计分析-- 监控管理 - triggers性能
import { timerPerformance } from './redux/timerManager/timerPerformance/timerPerformance';
// 散取审核
import { userStatistics } from './redux/userStatistics/userStatistics';
import { InUserStatistics } from './redux/userStatistics/InUserStatistics';
// 转账管理
import {internalTransferEx} from './redux/transferManagement/internalTransferEx';
// 转账管理
import {internalTransferSlt} from './redux/transferManagement/internalTransferSlt';
// 转账管理
import {transferNotThrough} from './redux/transferManagement/transferNotThrough';
// 基础数据管理
import {legalTender} from './redux/biz/quotation/legalTender';
import {legalTenderHistory} from './redux/biz/quotation/legalTenderHistory';
import {quotationCSDHistory} from './redux/biz/quotation/quotationCDSHistory';
import {qutationETHHistory} from './redux/biz/quotation/qutationETHHistory';
import {bizCoin} from './redux/coinList/coinList';

// 超级节点
import {GuessUpsDownsHome} from './redux/guessUpsDowns/home';
import {GuessUpsDownsTotayScene} from './redux/guessUpsDowns/totayScene';
import {GuessUpsDownsQuotation} from './redux/guessUpsDowns/quotation';
import {GuessUpsDownsQuotationShortTerm} from './redux/guessUpsDowns/quotationShortTerm';
import {GuessUpsDownsQuotationHistory} from './redux/guessUpsDowns/quotationHistory';
import {GuessUpsDownsScene} from './redux/guessUpsDowns/scene';
import {GuessUpsDownsScenePage} from './redux/guessUpsDowns/scenePage';
import {GuessUpsDownsScenePreview} from './redux/guessUpsDowns/scenePreview';
import {GuessUpsDownsSceneRecord} from './redux/guessUpsDowns/sceneRecord';
import {GuessUpsDownsRobot} from './redux/guessUpsDowns/robot';
import {robotAccountWater} from './redux/guessUpsDowns/robotAccountWater';
import {robotRecentWater} from './redux/guessUpsDowns/robotRecentWater';
import {robotHistoryWater} from './redux/guessUpsDowns/robotHistoryWater';
import {GuessConfiguration} from './redux/guessUpsDowns/guessConfiguration';
import {destructionPondIn} from './redux/superNode/destructionPondIn';
import {destructionPondOut} from './redux/superNode/destructionPondOut';

// 商城管理
import {storeShopCategory} from './redux/biz/store/shopCategory';
import {storeShopMessage} from './redux/biz/store/shopMessage';
import {storeShopOrder} from './redux/biz/store/shopOrder';
import {storeShopRules} from './redux/biz/store/shopRules';
import {storeShopLabels} from './redux/biz/store/shopLabels';

// 卡卷
import {CardHome} from './redux/card/home';
import {CardConfiguration} from './redux/card/cardConfiguration';
import {CardcardLog} from './redux/card/cardLog';
import {CardCardVolume} from './redux/card/cardVolume';
import {CardSecretKey} from './redux/card/secretKey';

// 营销管理
import {marketRegisterToSend} from './redux/marketingManagement/marketingActivities/registerToSend';
import {marketInvitedDrop} from './redux/marketingManagement/marketingActivities/dropManagement';
import {marketInvitedToSend} from './redux/marketingManagement/marketingActivities/invitedToSend';
import {marketPrepaidPhoneToSend} from './redux/marketingManagement/marketingActivities/prepaidPhoneToSend';
import {marketRightsManagement} from './redux/marketingManagement/regularActivities/rightsManagement';
import {marketReleasePlan} from './redux/marketingManagement/regularActivities/releasePlan';
import {marketInvitedPendingOrder} from './redux/marketingManagement/welfare/pendingOrder';
import {marketInvitedApprovalOrder} from './redux/marketingManagement/welfare/approvalOrder';
import {marketInvitedNotOrder} from './redux/marketingManagement/welfare/notOrder';
import {marketInvitedRewardSubsidiary} from './redux/marketingManagement/marketingDesign/rewardSubsidiary';
import {marketInvitedUserRewards} from './redux/marketingManagement/marketingDesign/userRewards';
import {marketInvitedDailyReport} from './redux/marketingManagement/marketingDesign/dailyReport';
import {marketInvitedUserRewardsSubsidiary} from './redux/marketingManagement/marketingDesign/userRewardsSubsidiary';
import {marketInvitedTotalPool} from './redux/marketingManagement/marketingDesign/totalPool';
import {marketInvitedJackpotRecord} from './redux/marketingManagement/marketingDesign/jackpotRecord';
import {marketInvitedLegacyRecords} from './redux/marketingManagement/marketingDesign/legacyRecords';
import {marketInvitedRecordRecords} from './redux/marketingManagement/marketingDesign/recordRecord';
import {marketInvitedPoolDailyReport} from './redux/marketingManagement/marketingDesign/poolDailyReport';
import {marketInvitedOutInRecord} from './redux/marketingManagement/marketingDesign/outInRecord';

// 资讯管理
import {bizJinseNews} from './redux/biz/news/jinseNews';
import {bizJinseNewsFlash} from './redux/biz/news/jinseNewsFlash';
import {bizNews} from './redux/biz/news/news';
import {bizCategory} from './redux/biz/news/category';

// 行情管理-币种管理
import {bizQuotationCoin} from './redux/biz/news-quotation/coin';

export default combineReducers({
    user,
    menu,
    message,
    modalDetail,
    systemRole,
    systemMenu,
    systemUser,
    systemPwdReset,
    systemSysParam,
    systemDataDict,
    publicCommunityAddEdit,
    // public
    publicAboutus,
    publicQuantitative,
    publicContact,
    publicPrivacy,
    publicMachineProtocol,
    publicRegister,
    publicBuyADS,
    publicSellETH,
    publicTransactionRemind,
    publicCommunity,
    publicNotice,
    publicNoticeAddEdit,
    publicWarmReminding,
    publicLegalDeclaration,
    publicRateExplain,
    publicLhlcxy,
    publicHelpCenter,
    // 会员查询
    userCustomer,
    userCustomerAccount,
    userCustomerEntrustQuery,
    userCustomerLedgerQuery,
    userCustomerAccountSummary,
    userCustomerIdentify,
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
    BTCFinanceDiviAddressAddedit,
    userChannelDealerLowerLevelQuery,
    // 广告位管理
    // public
    publicBanner,
    publicBannerAddEdit,
    publicPointPostion,
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
    acceptCancelOrder,
    // 行情管理
    quotationQuotationBTC,
    quotationQuotationCDS,
    quotationQuotationETH,
    quotationQuotationTRX,
    quotationExchangeRate,
    quotationMarketAdjustment,
    quotationQuotationZP,
    // 活动管理
    // 邀请好友
    activityInvitingFriends,
    activityGoldenMile,
    activityBednReward,
    // 业务规则
    // 广告费规则
    rulesAdvertisingFee,
    // 币币交易手续费规则
    // 提币手续费规则
    BTCFinanceWithdrawRule,
    // 承兑商手续费规则
    rulesAcceptRule,
    // 业务管理 评论管理
    commentKeywords,
    commentCheck,
    commentList,
    // 应用列表管理
    bizApplicationList,
    bizApplicationListHelpSet,
    bizBuyAgreement,
    bizInvestFlow,
    bizInvestFlowAll,
    bizProductsApprove,
    bizProductsRaise,
    bizProductsRaisefail,
    bizProductsCan,
    bizProductsWill,
    biztodayprofit,
    bizProductsBearing,
    bizProductsRaiseSuccess,
    bizProductsRepay,
    bizRepaymentPlan,
    bizProducts,
    bizSetDivRate,
    bizProductsProfit,
    // 红包管理
    bizReceiveQuery,
    bizRedPacketQuery,
    /* BTC 财务管理 */
    // 查询币种
    addressQuery,
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
    BTCFinanceSupplyAddress,
    // OTC系统设置
    publicOtctag,
    publicOtcPayment,
    publicOtcCountry,
    publicLawRate,
    publicChannelBank,
    // 业务管理--OTC管理
    OtcManageAdvert,
    OtcSurvivaLorDer,
    OtcSurvivaLorDerOrderedit,
    OtcManageHistoricalorder,
    OtcManageComment,
    // 营销结算
    StadySettLement,
    OtcManageHistoricalorderEdit,
    NoOrder,
    StayOrder,
    AlreadySettlement,
    quanTitativeCategory,
    AppManagent,
    Alerts,
    DappTrateGy,
    DappManagent,
    TAG,
    // 闪兑
    tradingSdRecord,
    tradingTradMessage,
    cloudMillMessage,
    cloudMillOrder,
    cloudMillOrderIncome,
    cloudRules,
    millMessage,
    millOrder,
    millOrderIncome,
    millRules,
    millUser,
    // 高频量化
    quantitativeAi,
    quantitativeAiOrder,
    quantitativeAiOrderIncome,
    quantitativeAiRule,
    // 统计分析
    DropsWater,
    // 生态管理
    // 三方应用
    ThreePartyAppCategory,
    // 集成生态
    IntegrationEcology,
    integrationEcologyOfficial,
    IntegrationEcologyUserQuery,
    IntegrationEcologyBonusPool,
    IntegrationEcologyTransferAccountsQuery,
    IntegrationEcologyBonusPoolRecord,
    IntegrationEcologyConfigure,
    // 超级节点
    SuperNodeHome,
    SuperNodeBonusPool,
    SuperNodeBonusPoolRecordIntoNow,
    SuperNodeBonusPoolRecordIntoPrev,
    SuperNodePeriods,
    SuperNodeNode,
    SuperNodeCustomer,
    SuperNodeVoteDistribution,
    SuperNodeVoteRecord,
    SuperNodeBuyBackRecord,
    SuperNodeIncomeRecord,
    SuperNodeSetting,
    SuperNodeLeftOver,
    SuperNodeAdjustment,
    destructionPondIn,
    destructionPondOut,
    // 统计分析
    timerMonitor,
    timerPerformance,
    userStatistics,
    InUserStatistics,
    // 闪兑管理
    dailyReport,
    // 内部转账管理
    internalTransferEx,
    internalTransferSlt,
    transferNotThrough,
    // 猜涨跌
    GuessUpsDownsHome,
    GuessUpsDownsTotayScene,
    GuessUpsDownsQuotation,
    GuessUpsDownsQuotationShortTerm,
    GuessUpsDownsQuotationHistory,
    GuessUpsDownsScene,
    GuessUpsDownsScenePage,
    GuessUpsDownsScenePreview,
    GuessUpsDownsSceneRecord,
    GuessUpsDownsRobot,
    robotAccountWater,
    robotRecentWater,
    robotHistoryWater,
    GuessConfiguration,
    // 星球抽奖
    starLuckyStarMessage,
    starLuckyStarLuckyUser,
    starLuckyStarJackpot,
    starLuckyStarConfiguration,
    starLuckyStarRules,
    starLuckyStarQuery,
    starLuckyStarParticipate,
    starLuckyStarBonusIncome,
    starLuckyStarJackpotRecord,
    starLuckyStarLegacyRecords,
    starLuckyStarRecordRecord,
    starLuckyTotayScene,
    starLuckyStarIntoPool,
    // 基础数据管理
    legalTender,
    legalTenderHistory,
    quotationCSDHistory,
    qutationETHHistory,
    bizCoin,
    // 卡卷
    CardHome,
    CardConfiguration,
    CardcardLog,
    CardCardVolume,
    CardSecretKey,
    // 商城管理
    storeShopCategory,
    storeShopMessage,
    storeShopOrder,
    storeShopRules,
    storeShopLabels,
    // 营销管理
    marketRegisterToSend,
    marketInvitedDrop,
    marketInvitedToSend,
    marketPrepaidPhoneToSend,
    marketRightsManagement,
    marketReleasePlan,
    marketInvitedPendingOrder,
    marketInvitedApprovalOrder,
    marketInvitedNotOrder,
    marketInvitedRewardSubsidiary,
    marketInvitedUserRewards,
    marketInvitedDailyReport,
    marketInvitedUserRewardsSubsidiary,
    marketInvitedTotalPool,
    marketInvitedJackpotRecord,
    marketInvitedLegacyRecords,
    marketInvitedRecordRecords,
    marketInvitedPoolDailyReport,
    marketInvitedOutInRecord,
    // 减币管理
    BTCFinanceLoseMoney,
    // 锁仓解仓管理
    BTCFinanceLockout,
    // 锁仓记录
    BTCFinanceLockUp,
    // 解仓记录
    BTCFinanceLockRelease,
    // 资讯管理
    bizJinseNews,
    bizJinseNewsFlash,
    bizNews,
    bizCategory,
    bizQuotationCoin
});
