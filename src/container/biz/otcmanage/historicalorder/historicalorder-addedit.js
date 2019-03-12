import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/otcmanage/historicalorder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
@listWrapper(
    state => ({
        ...state.OtcManageHistoricalorder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Advert extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号'
        }, {
            title: '买家',
            field: 'buyUser',
            formatter: (v, data) => {
                if (data.buyUserInfo) {
                    return data.buyUserInfo.loginName + '(' + data.buyUserInfo.nickname + ')';
                }
            },
            search: true
        }, {
            title: '卖家',
            field: 'sellUser',
            formatter: (v, data) => {
                if (data.sellUserInfo) {
                    return data.sellUserInfo.loginName + '(' + data.sellUserInfo.nickname + ')';
                }
            },
            search: true
        }, {
            title: '广告编号',
            field: 'adsCode'
        }, {
            title: '交易价格',
            field: 'tradePrice'
        }, {
            title: '交易数量',
            field: 'countString',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + data.tradeCoin;
            }
        }, {
            title: '交易金额',
            field: 'tradeAmount'
        }, {
            title: '广告费',
            field: 'feeString',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + data.tradeCoin;
            }
        }, {
            title: '交易虚拟币币种',
            field: 'tradeCoin',
            type: 'select',
            search: true
        }, {
            title: '交易法币币种',
            field: 'tradeCurrency',
            type: 'select',
            key: 'currency'
        }, {
            title: '支付方式',
            field: 'payType',
            type: 'select',
            key: 'pay_type'
        }, {
            title: '下单时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '支付失效时间',
            field: 'invalidDatetime',
            type: 'datetime'
        }, {
            title: '买家标记时间',
            field: 'markDatetime',
            type: 'datetime'
        }, {
            title: '卖家释放时间',
            field: 'releaseDatetime',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'trade_order_status'
        }, {
            title: '买家对卖家的评价',
            field: 'bsComment',
            type: 'select',
            key: 'comment_result'
        }, {
            title: '卖家对买家的评价',
            field: 'sbComment',
            type: 'select',
            key: 'comment_result'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625251'
        });
    }
}

export default Advert;
