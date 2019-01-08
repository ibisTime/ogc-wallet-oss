import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class RateExplainAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'id',
            hidden: true
        }, {
            field: 'remark',
            title: '内容',
            readonly: true,
            required: true
        }, {
            title: '内容',
            field: 'cvalue',
            type: 'textarea',
            required: true
        }];
        return this.buildDetail({
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

export default RateExplainAddedit;
