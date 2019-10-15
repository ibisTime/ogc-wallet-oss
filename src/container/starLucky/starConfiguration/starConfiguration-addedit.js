import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class StarConfigurationAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'bestHandCount',
            title: '手气最佳金额'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: '640062',
            detailCode: '640061'
        });
    }
}

export default StarConfigurationAddedit;