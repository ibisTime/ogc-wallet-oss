import React from 'react';
import { Form } from 'antd';
import { getQueryString, showSucMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
@Form.create()
class CommunityAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'status',
            value: 1,
            hidden: true
        }, {
            field: 'parentCode',
            value: 0,
            hidden: true
        }, {
            title: '名称',
            field: 'name',
            required: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'commit_type',
            required: true
        }, {
            title: '图标',
            field: 'pic',
            type: 'img',
            required: true,
            single: true
        }, {
            title: '社群号',
            field: 'url',
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            help: '数字越小，排序越靠前',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '630500',
            detailCode: '630507',
            buttons: [{
                title: '保存',
                check: true,
                handler: (params) => {
                    params.location = 'community';
                    params.enPic = params.pic;
                    this.doFetching();
                    fetch(630502, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default CommunityAddedit;
