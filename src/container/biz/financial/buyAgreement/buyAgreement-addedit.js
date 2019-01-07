import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class BuyAgreementAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'remark',
            title: '说明',
            readonly: true,
            required: true
        }, {
            field: 'cvalue',
            title: '内容',
            type: 'textarea',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            detailCode: 630046,
            editCode: 630042,
            beforeSubmit: (data) => {
                data.remark = this.props.pageData.remark;
                return data;
            }
        });
    }
}

export default BuyAgreementAddedit;
