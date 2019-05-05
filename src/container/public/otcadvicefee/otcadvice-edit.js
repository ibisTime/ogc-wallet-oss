import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat, moneyParse, getCoinList } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class OtccountryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.id = getQueryString('id', this.props.location.search);
        this.code = getQueryString('paymentCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '付款方式',
            field: 'paymentName',
            readonly: true
        }, {
            field: 'symbol',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            readonly: true,
            valueName: 'value'
        }, {
            title: '费率',
            field: 'feeRate',
            number3: true,
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.id,
            view: this.view,
            key: 'id',
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
