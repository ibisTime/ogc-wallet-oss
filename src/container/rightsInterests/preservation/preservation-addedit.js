import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, showSucMsg} from 'common/js/util';

@Form.create()
class PreservationAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '产品名称',
            field: 'name',
            required: true
        }, {
            title: '购买币种',
            field: 'symbolIn',
            required: true,
            type: 'select',
            key: 'right_product_symbol_in'
        }, {
            title: '释放币种',
            field: 'symbolOut',
            required: true,
            type: 'select',
            key: 'right_product_symbol_out'
        }, {
            title: '购买数量',
            field: 'amountIn',
            required: true
        }, {
            title: '释放数量',
            field: 'amountOut',
            required: true
        }, {
            title: '有效期限（天）',
            field: 'daysLimit',
            required: true
        }, {
            title: '显示顺序',
            field: 'orderNo',
            required: true
        }, {
            title: '显示位置',
            field: 'location',
            required: true,
            type: 'select',
            key: 'right_product_location'
        }, {
            title: '状态',
            field: 'status',
            data: [{
                key: '1',
                value: '显示'
            }, {
                key: '0',
                value: '不显示'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select',
            readonly: true,
            hidden: !this.code
        }, {
            title: '创建人',
            field: 'creatorName',
            readonly: true,
            hidden: !this.code
        }, {
            title: '创建人时间',
            field: 'createTime',
            readonly: true,
            hidden: !this.code,
            type: 'datetime'
        }, {
            title: '更新人',
            field: 'updaterName',
            readonly: true,
            hidden: !this.code
        }, {
            title: '更新人时间',
            field: 'updateTime',
            readonly: true,
            hidden: !this.code,
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '805465',
            editCode: '805462',
            addCode: '805460'
        });
    }
}

export default PreservationAddedit;
