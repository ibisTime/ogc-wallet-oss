import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
@Form.create()
class FinishOrderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [
            {
                field: 'remark',
                title: '备注',
                hidden: true,
                value: '0'
            }, {
                field: 'code',
                title: '编号',
                readonly: true
            }, {
                title: '原告',
                field: 'sellUser',
                formatter: (v, data) => {
                    return data.sellUserInfo ? data.sellUserInfo.nickname + '-卖家' : '';
                },
                readonly: true
            }, {
                title: '被告',
                field: 'buyUser',
                formatter: (v, data) => {
                    return data.buyUserInfo ? data.buyUserInfo.nickname + '-买家' : '';
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
                readonly: true,
                formatter: (v, d) => {
                    return d.tradeAmount + '-' + d.tradeCurrency;
                }
            }, {
                title: '申请原因',
                field: 'complaintReason',
                readonly: true
            }, {
                field: 'complaintCreateDatetime',
                title: '申请时间',
                type: 'datetime',
                readonly: true
            }, {
                title: '处理说明',
                field: 'arbitrateResult',
                type: 'textarea',
                normalArea: true,
                required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625251',
            buttons: [{
                title: '处理',
                handler: (param) => {
                    param.result = '1';
                    param.code = this.code;
                    this.doFetching();
                    fetch(625291, param).then(() => {
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
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default FinishOrderAddedit;
