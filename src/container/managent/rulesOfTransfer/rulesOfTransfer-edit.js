import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class rulesOfTransferAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'withdrawMin',
            title: '单笔最小值'
        }, {
            field: 'withdrawStep',
            title: '提币步长'
        }, {
            field: 'withdrawMax',
            title: '单笔最大值'
        }, {
            field: 'withdrawLimit',
            title: '每人每日划转上限'
        }, {
            field: 'withdrawFee',
            title: '手续费'
        }, {
            field: 'withdrawFeeType',
            title: '手续费类型',
            type: 'select',
            key: 'withdraw_fee_type'
        }, {
            field: 'withdrawFeeTakeLocation',
            title: '手续费扣减位置',
            type: 'select',
            key: 'withdraw_fee_take_location'
        }, {
            field: 'withdrawRule',
            title: '提币规则文本'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '710040',
            editCode: '625841',
            detailCode: '625846'
        });
    }
}

export default rulesOfTransferAddedit;
