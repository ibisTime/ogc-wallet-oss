import React from 'react';
import {Form} from 'antd';
import {getQueryString} from 'common/js/util';
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
            field: 'location',
            title: '位置',
            required: true
        }, {
            field: 'picIcon',
            title: '图标',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            type: 'select',
            data: [{
                'key': '0',
                'value': '是'
            }, {
                'key': '1',
                'value': '否'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            field: 'orderNo',
            title: '次序'
        }, {
            field: 'picScreenshot',
            type: 'img',
            title: '图片',
            render: (v, d) => {
                return d.picScreenshotList[0];
        }
        }, {
            field: 'action',
            title: '图片'
        }, {
            field: 'language',
            title: '语言'
        }, {
            field: 'picList',
            type: 'img',
            title: '图片'
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
        }];
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
