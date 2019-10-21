import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    getCoinList
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class StarMessageAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'symbol',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            readonly: this.code,
            required: true
        }, {
            field: 'name',
            title: '星球名称',
            required: true
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '640000',
            editCode: '640002',
            detailCode: '640004'
        });
    }
}

export default StarMessageAddedit;