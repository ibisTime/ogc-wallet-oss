import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';
import fetch from 'common/js/fetch';

@Form.create()
class millCardManagerAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            required: true
        }, {
            field: 'quantity',
            title: '数量',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '610580',
            editCode: '610580',
            detailCode: '610580'
        });
    }
}

export default millCardManagerAddedit;
