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
        let fields = [{
            field: 'id',
            title: '编号',
            readonly: true
        }, {
            field: 'symbol',
            title: '币种符号',
            require: true
        }, {
            field: 'withdrawMin',
            title: '取现最小金额',
            require: true
        }, {
            field: 'withdrawFeeType',
            title: '取现手续费类型',
            type: 'select',
            key: 'withdraw_fee_type',
            require: true
        }, {
            field: 'withdrawFee',
            title: '取现手续费数量',
            nonnegative: true,
            require: true
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
