import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class ConfigureAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'dappname',
            title: '应用名称',
            formatter: (v, data) => {
                return data.openDapp.name;
            },
            readonly: true
        }, {
            field: 'name',
            title: '名称',
            readonly: true
        }, {
            field: 'value',
            title: '数值'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            editCode: 625012,
            detailCode: 625015
        });
    }
}

export default ConfigureAddedit;
