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
            field: 'id',
            title: '应用ID',
            required: true
        }, {
            field: 'category',
            type: 'select',
            search: true,
            key: 'dapp_category',
            title: '应用分类',
            required: true
        }, {
            field: 'name',
            title: '应用名称',
            search: true,
            required: true
        }, {
            field: 'company',
            title: '应用所属厂商',
            required: true
        }, {
            field: 'label',
            title: '应用标签',
            required: true
        }, {
            field: 'desc',
            required: true,
            title: '应用详情描述'
        }, {
            field: 'download',
            title: '下载数量',
            required: true
        }, {
            field: '位置',
            title: 'location',
            required: true
        }, {
            field: 'picIcon',
            title: '图标',
            type: 'img',
            signal: true,
            required: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            required: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            hidden: !this.view
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.view
        } ];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: 625457,
            addCode: 625450,
            deleteCode: 625451,
            editCode: 625452
        });
    }
}

export default AppmanagentAddedit;
