import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class FinishOrderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
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
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625286'
        });
    }
}

export default FinishOrderAddedit;
