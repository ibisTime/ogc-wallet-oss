import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class userPropertyRightsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'orderCode',
            title: '产权订单编号',
            required: true
        }, {
            field: 'productCode',
            title: '产品编号'
        }, {
            field: 'loginName',
            title: '购买用户',
            formatter(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'name',
            title: '产品名称'
        }, {
            field: 'symbolIn',
            title: '购买币种',
            type: 'select',
            key: 'fpp_symbol_in'
        }, {
            field: 'symbolOutType',
            title: '收益方式',
            formatter: (v, d) => {
                console.log('symbolOutType', d);
                if(v === '1') {
                    return '币本位';
                }else {
                    return '金本位';
                }
            }
        }, {
            field: 'symbolOut',
            title: '收益币种',
            type: 'select',
            key: 'fpp_symbol_in'
        }, {
            field: 'priceType',
            title: '买入方式',
            formatter: (v, d) => {
                if(v === '1') {
                    return '币本位';
                }else {
                    return '金本位';
                }
            }
        }, {
            field: 'price',
            title: '购买单价'
        }, {
            field: 'daysLimit',
            title: '期限（天）'
        }, {
            field: 'dailyRate',
            title: '日息'
        }, {
            field: 'deductFlag',
            title: '是否支持抵扣',
            formatter: (v, d) => {
                if(v === '0') {
                    return '否';
                }else {
                    return '是';
                }
            }
        }, {
            field: 'deductSymbol',
            title: '抵扣币种'
        }, {
            field: 'deductRate',
            title: '抵扣汇率'
        }, {
            field: 'deductLimit',
            title: '抵扣上限'
        }, {
            field: 'outFee',
            title: '提前退出手续费'
        }, {
            field: 'outFeeType',
            title: '提前退出手续费类型',
            formatter: (v, d) => {
                if(v === '1') {
                    return '绝对值';
                }else {
                    return '百分比';
                }
            }
        }, {
            field: 'totalCount',
            title: '花费币总个数'
        }, {
            field: 'isDeduct',
            title: '是否抵扣',
            formatter: (v, d) => {
                if(v === '0') {
                    return '否';
                }else {
                    return '是';
                }
            }
        }, {
            field: 'outFee',
            title: '抵扣金额',
            formatter: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v.toString(), '', data.deductSymbol)} (${data.deductSymbol})`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'realCount',
            title: '实际支付金额'
        }, {
            field: 'status',
            title: '状态',
            formatter: (v, d) => {
                if(v === '0') {
                    return '待结算';
                }else if(v === '1') {
                    return '已退出';
                }else if(v === '2') {
                    return '已结算';
                }
            }
        }, {
            field: 'repayStatus',
            title: '回购状态',
            formatter: (v, d) => {
                if(v === '0') {
                    return '未回购';
                }else if(v === '1') {
                    return '已回购';
                }
            }
        }, {
            field: 'settleDate',
            title: '结算日期',
            type: 'datetime'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '610728'
        });
    }
}

export default userPropertyRightsAddedit;
