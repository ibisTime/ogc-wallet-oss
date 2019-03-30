import React from 'react';
import {Form} from 'antd';
import {getQueryString, moneyFormat, showSucMsg, getUserId} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class ArbitrationOrderResolve extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            readonly: true
        }, {
            title: '被告',
            field: 'sellUser',
            formatter: (v, data) => {
                return data ? data.sellUser + '-卖家' : '';
            },
            readonly: true
        }, {
            title: '原告',
            field: 'buyUser',
            formatter: (v, data) => {
                return data ? data.buyUser + '-买家' : '';
            },
            readonly: true
        }, {
            title: '交易对',
            type: 'select',
            formatter: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            },
            search: true,
            readonly: true
        }, {
            field: 'tradePrice',
            title: '涉案金额',
            readonly: true
        }, {
            title: '申请原因',
            field: 'arbitrateReason',
            readonly: true
        }, {
            field: 'arbitrateCreateDatetime',
            title: '申请时间',
            type: 'datetime',
            readonly: true
        }, {
            title: '处理说明',
            field: 'remark',
            type: 'textarea',
            normalArea: true,
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625266',
            buttons: [{
                title: '通过',
                handler: (param) => {
                    param.result = '1';
                    param.updater = getUserId();
                    this.doFetching();
                    fetch(625260, param).then(() => {
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
                title: '不通过',
                handler: (param) => {
                    param.result = '0';
                    param.updater = getUserId();
                    this.doFetching();
                    fetch(625260, param).then(() => {
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
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default ArbitrationOrderResolve;