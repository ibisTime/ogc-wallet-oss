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
            hidden: true
        }, {
            title: '计价币种',
            field: 'currency',
            hidden: true,
            formatter(v, d) {
                return d.referCurrency;
    }
        }, {
            title: '币种',
            field: 'symbol1',
            readonly: true,
            formatter(v, d) {
                return d.symbol;
            }
        }, {
            title: '计价币种',
            field: 'referCurrency1',
            readonly: true,
            formatter(v, d) {
                return d.referCurrency;
            }
        }, {
            title: '行情价格',
            field: 'price',
            formatter: (v, d) => d.lastPrice
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
