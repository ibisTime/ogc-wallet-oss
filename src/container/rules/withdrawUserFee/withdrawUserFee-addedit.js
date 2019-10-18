import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class WithdrawRuleAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种符号',
            readonly: true
        }, {
            field: 'withdrawFeeType',
            title: '取现手续费类型',
            type: 'select',
            key: 'withdraw_fee_type',
            required: true
        }, {
            field: 'withdrawFee',
            title: '取现手续费数量',
            nonnegative: true,
            required: true,
            help: '手续费类型如果是绝对值，则直接填写手续费；如果是百分比，请填写小数点x，手续费=实际提现金额*x'
        }, {
            field: 'withdrawFeeTakeLocation',
            title: '手续费扣减位置',
            type: 'select',
            data: [
                {
                    key: '0',
                    value: '取现金额中'
                },
                {
                    key: '1',
                    value: '余额中'
                }
            ],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            field: 'withdrawStep',
            title: '提币步长',
            required: true
        }, {
            field: 'id',
            title: '编号',
            hidden: true
        }, {
            field: 'withdrawMin',
            title: '取现最小金额',
            required: true
        }, {
            field: 'withdrawMax',
            title: '取现最大金额',
            required: true
        }, {
            field: 'withdrawLimit',
            title: '每人每日提币上限',
            required: true
        }, {
            field: 'withdrawRule',
            title: '提币规则文本'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '802017',
            editCode: '802018'
        });
    }
}

export default WithdrawRuleAddedit;
