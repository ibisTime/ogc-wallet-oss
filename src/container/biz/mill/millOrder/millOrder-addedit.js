import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class MillOrderDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.show = false;
    }
    render() {
        const fields = [{
            field: 'code',
            title: '订单编号'
        }, {
            field: 'loginName',
            title: '购买用户',
            formatter(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'name',
            title: '矿机名称'
        }, {
            field: 'type',
            title: '矿机类型',
            key: 'miner_type',
            type: 'select'
        }, {
            field: 'price',
            title: '单价'
        }, {
            field: 'quantity',
            title: '购买数量'
        }, {
            field: 'investCount',
            title: '花费币总额',
            formatter: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v.toString(), '', data.buySymbol)} (${data.buySymbol})`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'incomeActualStr',
            title: '已获取收益',
            formatter: function (v) {
                if(v) {
                    return moneyFormat(v.toString(), '', 'WIS') + ' (' + 'WIS' + ')';
                }else {
                    return '0';
                }
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'miner_order_status',
            type: 'select'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: true,
            detailCode: '610525'
        });
    }
}

export default MillOrderDetail;
