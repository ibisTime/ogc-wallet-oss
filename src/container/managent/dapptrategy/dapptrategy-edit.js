import React from 'react';
import { Form } from 'antd';
import { getQueryString, getRealCheckboxVal } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.id = getQueryString('id', this.props.location.search);
        this.label = getQueryString('label', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    componentDidMount() {
        Promise.all([
            fetch(625476, {
                // type: 'B'
            })
        ]).then(([accountData]) => {
            this.setState({
                label: accountData[0]
            });
        }).catch(this.props.cancelFetching);
    }
    render() {
        const fields = [{
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
            field: 'orderNo',
            title: '次序',
            required: true,
            integer: true
        }, {
            field: 'label',
            type: 'checkbox',
            listCode: '625476',
            keyName: 'id',
            valueName: 'name',
            required: true,
            title: '应用标签',
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
            search: true,
            hidden: !this.view
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date',
            hidden: !this.view
        } ];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            label: this.label,
            view: this.view,
            detailCode: 625467,
            editCode: 625462
        });
    }
}

export default AppmanagentAddedit;
