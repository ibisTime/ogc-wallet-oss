import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.label = getQueryString('label', this.props.location.search);
        this.dappId = getQueryString('dappId', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'id',
            title: 'id',
            hidden: true,
            required: true
        }, {
            field: 'dappId',
            title: 'dappId',
            hidden: true,
            required: true
        }, {
            field: 'title',
            title: '标题',
            required: true
        }, {
            field: 'author',
            readonly: true,
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
            field: 'label',
            type: 'checkbox',
            listCode: '625476',
            keyName: 'id',
            valueName: 'name',
            required: true,
            title: '应用标签',
            params: {type: 0},
            formatter(v, d) {
                return v;
            }
        }, {
            field: 'scanCountFake',
            title: '起始浏览数量',
            required: true
        }, {
            field: 'likeCountFake',
            title: '起始点赞数量',
            required: true
        }, {
            field: 'desc',
            title: '描述',
            required: true
        }, {
            field: 'orderNo',
            title: '次序',
            required: true,
            integer: true
        }, {
            title: '状态',
            field: 'status',
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
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.view
        } ];
        return this.buildDetail({
            fields,
              key: 'id',
              id: this.dappId,
            code: this.code,
            view: this.view,
            detailCode: 625467
        });
    }
}

export default AppmanagentAddedit;
