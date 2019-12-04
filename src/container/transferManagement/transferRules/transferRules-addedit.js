import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat, moneyParse } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class TransferRulesAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            feeType: '0'
        };
    }
    render() {
        let fields = [{
            field: 'symbol',
            title: '币种符号',
            hidden: true
        }, {
            field: 'symbol1',
            title: '币种符号',
            readonly: true,
            required: true,
            formatter(v, d) {
                return d.symbol;
            }
        }, {
            field: 'approveFlag',
            title: '是否审核',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            field: 'withdrawMin',
            title: '单笔最小值',
            number: true,
            required: true
        }, {
            field: 'withdrawMax',
            title: '单笔最大值',
            number: true,
            required: true
        }, {
            field: 'withdrawStep',
            title: '提币步长',
            number: true,
            required: true
        }, {
            field: 'withdrawLimit',
            title: '每人每日提币上限',
            number: true,
            required: true
        }, {
            field: 'withdrawFeeTakeLocation',
            title: '手续费扣除位置',
            required: true,
            data: [{
                key: '1',
                value: '余额中'
            }, {
                key: '0',
                value: '取现金额中'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select'
        }, {
            field: 'withdrawFeeType',
            title: '手续费类型',
            required: true,
            data: [{
                key: '1',
                value: '百分比'
            }, {
                key: '0',
                value: '绝对值'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select',
            onChange: (v) => {
                if(v) {
                    this.setState({
                        feeType: v
                    });
                }
            }
        }, {
            field: 'withdrawFee',
            title: '提币手续费',
            number: true,
            required: true,
            hidden: this.state.feeType !== '0',
            formatter: (v, d) => {
                if(d.withdrawFeeType === '0') {
                    return d.withdrawFee;
                }
            }
        }, {
            field: 'withdrawFee01',
            title: '提币手续费(0-100%)',
            number: true,
            required: true,
            hidden: this.state.feeType !== '1',
            formatter: (v, d) => {
                if(d.withdrawFeeType === '1') {
                    return +d.withdrawFee * 100;
                }
            }
        }, {
            field: 'withdrawRule',
            title: '提币规则',
            type: 'textarea',
            required: true,
            normalArea: true
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '802027',
            editCode: '802020',
            beforeSubmit: (params) => {
                if(params.withdrawFeeType === '1') {
                    params.withdrawFee = params.withdrawFee01 / 100;
                }
                delete params.withdrawFee01;
                return true;
            }
        });
    }
}

export default TransferRulesAddedit;
