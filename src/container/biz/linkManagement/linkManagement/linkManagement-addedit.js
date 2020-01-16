import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId} from 'common/js/util';

@Form.create()
class CloudMessageAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            isUrl: false
        };
    }
    render() {
        const fields = [{
            field: 'name',
            title: '名称',
            required: true
        }, {
            field: 'enName',
            title: '英文名称',
            search: true
        }, {
            field: 'category',
            title: '类型',
            type: 'select',
            key: 'friend_link_category',
            required: true
        }, {
            field: 'action',
            title: '动作',
            type: 'select',
            key: 'dopen_app_action',
            required: true,
            onChange: (v) => {
                if(v === '1') {
                    this.setState({
                        isUrl: true
                    });
                }else {
                    this.setState({
                        isUrl: false
                    });
                }
            }
        }, {
            field: 'location',
            title: 'UI位置',
            type: 'select',
            key: 'dopen_app_location',
            required: true
        }, {
            field: 'orderNo',
            title: 'UI次序',
            required: true
        }, {
            field: 'url',
            title: '跳转地址',
            required: true,
            hidden: this.state.isUrl
        }, {
            field: 'isTop',
            title: '是否置顶',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select',
            required: true
        }, {
            field: 'picList',
            title: '图片(多)',
            type: 'img',
            required: true
        }, {
            field: 'status',
            title: '状态',
            data: [{
                key: '1',
                value: '显示'
            }, {
                key: '0',
                value: '隐藏'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select',
            readonly: true,
            hidden: !this.code
        }, {
            field: 'desc',
            title: '中文描述',
            type: 'textarea',
            normalArea: true
        }, {
            field: 'enDesc',
            title: '英文描述',
            type: 'textarea',
            normalArea: true
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '802040',
            editCode: '802041',
            detailCode: '802056',
            beforeSubmit: (params) => {
                if(this.state.isUrl) {
                    delete params.url;
                }
                return true;
            }
        });
    }
}

export default CloudMessageAddedit;
