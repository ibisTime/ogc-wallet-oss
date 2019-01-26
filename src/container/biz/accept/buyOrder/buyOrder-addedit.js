import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@Form.create()
class BuyOrderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isSale = !!getQueryString('isSale', this.props.location.search);
        this.buttons = [{
          title: '返回',
          handler: () => {
            this.props.history.go(-1);
          }
        }];
        if(this.isSale) {
            this.buttons = [{
                title: '确认到账',
                handler: (param) => {
                    param.result = '1';
                    param.code = this.code;
                    param.userId = getUserId();
                    this.doFetching();
                    fetch(625274, param).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '未到账',
                handler: (param) => {
                    param.result = '0';
                    param.code = this.code;
                    param.userId = getUserId();
                    this.doFetching();
                    fetch(625274, param).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: () => {
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
          field: 'receiveBank',
          title: '收款方式'
        }, {
          field: 'receiveCardNo',
          title: '卡号'
        }, {
          title: '手机号/邮箱',
          field: 'loginName',
          formatter(v, data) {
            if(data.user) {
              return data.user.loginName;
            }
            return '-';
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
          title: '附言',
          field: 'postscript'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625286',
            buttons: this.buttons
        });
    }
}

export default BuyOrderAddedit;
