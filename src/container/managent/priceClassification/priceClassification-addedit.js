import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AcceptRuleAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '数值',
            field: 'cvalue',
            required: true,
            number: true
        }, {
            title: '数值',
            field: 'cvalue',
            required: true,
            number: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '630030',
            editCode: '630032',
            detailCode: '630037',
            beforeSubmit: function(data) {
                data.type = 'dopen_app_category';
                return data;
            }
        });
    }
}

export default AcceptRuleAddedit;
