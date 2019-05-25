import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class QuotationZPAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '币种',
            field: 'symbol',
            readonly: true
        }, {
            title: '计价币种',
            field: 'referCurrency',
            readonly: true
        }, {
            title: '行情价格',
            field: 'currency'
        }, {
            title: '来源',
            field: 'origin',
            hidden: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            key: 'id',
            editCode: '650104',
            detailCode: '650106'
        });
    }
}

export default QuotationZPAddedit;
