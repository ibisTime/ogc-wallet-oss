import React from 'react';
import {Form} from 'antd';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class withdrawUserFeeAddedit extends DetailUtil {
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
            readonly: true,
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
            require: true,
            help: '手续费类型如果是绝对值，则直接填写手续费；如果是百分比，请填写小数点x，手续费=实际提现金额*x'
        }, {
            field: 'withdrawWarn',
            title: '散取地址报警阀值',
            nonnegative: true,
            help: '散取地址低于该值，发送短信告警'
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

export default withdrawUserFeeAddedit;
