import React from 'react';
import { Form } from 'antd';
import { getQueryString, getCoinList } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class OtccountryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.paymentCode = getQueryString('paymentCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '费率',
            field: 'feeRate',
            required: true,
            number3: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 625380,
            detailCode: 625392,
            editCode: 625381,
            beforeSubmit: (params) => {
                params.paymentCode = this.paymentCode;
                return params;
            }
        });
    }
}

export default OtccountryAddedit;
