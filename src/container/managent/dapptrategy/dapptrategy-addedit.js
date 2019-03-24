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
            field: 'id',
            title: '标题',
            hidden: true,
            required: true
        }, {
            field: 'title',
            title: '标题',
            required: true
        }, {
            field: 'author',
            title: '作者',
            required: true
        }, {
            field: 'content',
            title: '内容',
            type: 'textarea',
            required: true
        }, {
            field: 'language',
            title: '语言',
            hidden: true
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
            field: 'download',
            title: '下载量',
            required: true
        }, {
            field: 'category',
            type: 'select',
            search: true,
            key: 'dapp_category',
            title: '应用分类',
            required: true
        }, {
            field: 'desc',
            title: '描述',
            required: true
        }, {
            field: 'company',
            title: '应用所属厂商',
            required: true
        }, {
            field: 'picScreenshot',
            type: 'img',
            title: '详情图片',
            render: (v, d) => {
                return d.picScreenshotList;
            },
            required: true
        }, {
            field: 'action',
            title: '动作',
            required: true,
            key: 'dapp_action',
            type: 'select'
        }, {
            field: 'picIcon',
            single: true,
            title: '图标',
            type: 'img',
            required: true
        }, {
            field: 'language',
            title: '语言',
            value: 'ZH_CN',
            hidden: true
        }, {
            field: 'location',
            value: '0',
            hidden: true,
            title: '位置'
        }, {
            field: 'name',
            required: true,
            title: '名字'
        }, {
            field: 'picList',
            title: '列表图片',
            single: true,
            type: 'img',
            required: true
        }, {
            field: 'label',
            required: true,
            title: '标签'
        }, {
            field: 'orderNo',
            title: '次序',
            required: true,
            integer: true
        }, {
            title: '状态',
            field: 'status',
            required: true,
            type: 'select',
            data: [{
                'key': '0',
                'value': '隐藏'
            }, {
                'key': '1',
                'value': '显示'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: !this.view
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date',
            hidden: !this.view
        } ];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 625467,
            editCode: 625462,
            addCode: 625450,
            deleteCode: 625451 //     beforeSumit: (parms) => {
            // }

        });
    }
}

export default AppmanagentAddedit;
