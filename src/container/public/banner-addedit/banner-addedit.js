import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class BannerAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            dkey: '',
            url: false,
            directUser: false
        };
    }
    render() {
        const fields = [{
            field: 'status',
            hidden: true,
            value: 1
        }, {
            field: 'type',
            value: 2,
            hidden: true
        }, {
            title: 'banner名称',
            field: 'name',
            required: true
        }, {
            title: '位置',
            field: 'location',
            type: 'select',
            key: 'banner_location',
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            help: '数字越小，排序越靠前',
            required: true
        }, {
            title: 'banner图片',
            field: 'pic',
            type: 'img',
            help: '690*300',
            required: true,
            single: true
        }, {
            field: 'type',
            title: '动作',
            type: 'select',
            key: 'banner_action',
            required: true,
            onChange: (v) => {
                this.setState({dkey: v});
            }
        }, {
            title: 'url地址',
            field: 'url',
            hidden: this.state.dkey !== '1',
            required: this.state.dkey === '1'
        }, {
            title: '应用',
            field: 'id',
            type: 'select',
            pageCode: 625455,
            params: {
                status: '1'
            },
            keyName: 'id',
            valueName: 'name',
            hidden: this.state.dkey !== '2',
            required: this.state.dkey === '2'
        }, {
            title: '备注',
            field: 'remark',
            maxlength: 250
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 630500,
            editCode: 630502,
            detailCode: 630507,
            beforeSumit: (params) => {
                params.type = this.type;
                return params;
            }
        });
    }
}

export default BannerAddEdit;
