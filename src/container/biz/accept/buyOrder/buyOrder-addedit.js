import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/accept/buyOrder/buyOrder-addedit';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.acceptBuyOrderAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class BuyOrderAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isSale = !!getQueryString('isSale', this.props.location.search);
        this.buttons = [];
        if(this.isSale) {
            this.buttons = [{
                title: '确认到账',
                handler: (param) => {
                    param.result = '1';
                    param.code = this.code;
                    param.userId = getUserId();
                    this.props.doFetching();
                    fetch(625274, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '未到账',
                handler: (param) => {
                    param.result = '0';
                    param.code = this.code;
                    param.userId = getUserId();
                    this.props.doFetching();
                    fetch(625274, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
    }

    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '下单人',
            field: 'nickname',
            formatter: (v, data) => {
                return data.user ? data.user.nickname : '';
            }
        }, {
            title: '手机号',
            field: 'userMobile',
            formatter: (v, data) => {
                return data.user ? data.user.mobile : '';
            }
        }, {
            field: 'tradeCoin',
            title: '币种'
        }, {
            title: '单价',
            field: 'tradePrice'
        }, {
            title: '数量',
            field: 'count',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            title: '总金额',
            field: 'tradeAmount'
        }, {
            title: '手续费',
            field: 'fee',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'accept_order_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '下单时间',
            type: 'datetime'
        }, {
            field: 'receiveBank',
            title: '付款方式'
        }, {
            field: 'receiveCardNo',
            title: '付款账号'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625286',
            buttons: this.buttons
        });
    }
}

export default BuyOrderAddedit;
