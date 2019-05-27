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
            title: '矿机购买订单编号'
        }, {
            field: 'userId',
            title: '购买用户编号',
            formatter(v, d) {
                return d.user && d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'machineName',
            title: '矿机名称',
            formatter(v, d) {
                return d.machine.name;
            }
        }, {
            field: 'symbol',
            title: '矿机购买币种'
        }, {
            field: 'amount',
            title: '单个人民币价格'
        }, {
            field: 'quantity',
            title: '购买数量'
        }, {
            field: 'investAmount',
            title: '花费人民币总金额'
        }, {
            field: 'investCount',
            title: '花费币总额',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            field: 'incomeActual',
            title: '已获取收益',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'machine_order_status',
            type: 'select'
        }, {
            field: 'continueFlag',
            title: '是否可以被连存',
            key: 'machine_order_continue_flag',
            type: 'select'
        }, {
            field: 'continueStatus',
            title: '连存状态',
            key: 'machine_order_continue_status',
            type: 'select'
        }, {
            field: 'continueLifeTime',
            title: '已连存寿命',
            type: 'datetime'
        }, {
            field: 'continueOutput',
            title: '连存后日产能（%）'
        }, {
            field: 'continuePrevCode',
            title: '连存上一条订单号'
        }, {
            field: 'continueNextCode',
            title: '连存下一条订单号'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }, {
            field: 'startTime',
            title: '挖矿开始时间',
            type: 'datetime'
        }, {
            field: 'endTime',
            title: '挖矿结束时间（到期时间）',
            type: 'datetime'
        }, {
            field: 'speedDays',
            title: '加速天数'
        }, {
            field: 'speedEndTime',
            title: '加速后到期时间',
            type: 'datetime'
        }, {
            field: 'continueStartTime',
            title: '连存开始时间',
            type: 'datetime'
        }, {
            field: 'continueEndTime',
            title: '连存结束时间',
            type: 'datetime'
        }, {
            field: 'speedEndTime',
            title: '加速后到期时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: true,
            detailCode: '610103'
        });
    }
}

export default CloudMillOrderDetail;
