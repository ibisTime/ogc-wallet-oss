import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class CloudMillOrderDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            hidden: true
        }, {
            field: 'productCode',
            title: '产品编号'
        }, {
            field: 'loginName',
            title: '购买用户',
            formatter(v, d) {
                return d.user && d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'investCount',
            title: '买入数量',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolBuy);
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'pglh_order_status'
        }, {
            field: 'totalIncome',
            title: '产生收益总数',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolIncome);
            }
        }, {
            field: 'startTime',
            title: '开始产生收益时间',
            type: 'datetime'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: true,
            detailCode: '610317'
        });
    }
}

export default CloudMillOrderDetail;
