import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '首创玩法',
            required: true
        }, {
            field: 'description',
            title: '首创玩法概要介绍',
            required: true
        }, {
            field: 'slogan',
            title: '提示',
            required: true
        }, {
            field: 'icon',
            title: '图标',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'location',
            title: '位置',
            type: 'select',
            required: true,
            key: 'banner_location',
            search: true
        }, {
            field: 'position',
            title: '链接',
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            required: true
        }, {
            field: 'status',
            title: '状态',
            hidden: !this.view
        }, {
            field: 'remark',
            title: '备注',
            hidden: !this.view
        }, {
            field: 'updateDatetime',
            hidden: !this.view,
            type: 'datetime',
            title: '更新时间'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 625411,
            editCode: 625402
        });
    }
}

export default AppmanagentAddedit;
