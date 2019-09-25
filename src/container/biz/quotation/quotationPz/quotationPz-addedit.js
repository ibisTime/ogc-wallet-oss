import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class QuotationPzAddedit extends DetailUtil {
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
            title: '行情调整比例',
            field: 'marketAdjust'
        }, {
            title: '是否获取第三方行情',
            field: 'marketFlag',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            type: 'select',
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '第三方行情来源',
            field: 'marketSource',
            key: 'market_source',
            type: 'select'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            key: 'id',
            editCode: '802019',
            detailCode: '802006'
        });
    }
}

export default QuotationPzAddedit;
