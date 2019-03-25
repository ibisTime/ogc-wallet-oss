import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.dappId = getQueryString('dappId', this.props.location.search);
        this.id = getQueryString('id', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
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
            field: 'label',
            type: 'checkbox',
            listCode: '625476',
            keyName: 'id',
            valueName: 'name',
            required: true,
            title: '应用标签'
        }, {
            field: 'desc',
            title: '描述',
            required: true
        }, {
            field: 'scanCountFake',
            title: '起始浏览数量',
            required: true
        }, {
            field: 'likeCountFake',
            title: '起始点赞数量',
            required: true
        }, {
            field: 'orderNo',
            title: '次序',
            required: true,
            integer: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date',
            hidden: !this.view
        } ];
        return this.buildDetail({
            fields,
            key: 'id',
            id: this.id,
            code: this.code,
            view: this.view,
            detailCode: 625463,
            editCode: 625462,
            addCode: 625460,
            deleteCode: 625461,
            beforeSubmit: (params) => {
                params.dappId = this.dappId;
                return params;
            }
        });
    }
}

export default AppmanagentAddedit;
