import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.id = getQueryString('id', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'nameEn',
            title: '应用ID',
            value: '0',
            hidden: true
        }, {
            field: 'nameKo',
            title: '应用ID',
            value: '0',
            hidden: true
        }, {
            field: 'id',
            title: '应用ID',
            integer: true,
            required: true
        }, {
            field: 'name',
            title: '名称(中文)',
            required: true
        }, {
            field: 'type',
            key: 'open_dapp_tag_type',
            type: 'select',
            title: '标签分类',
            required: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date',
            hidden: !this.view
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 625477,
            editCode: 625472,
            addCode: 625470,
            deleteCode: 625471 //     beforeSumit: (parms) => {
            // }

        });
    }
}

export default AppmanagentAddedit;
