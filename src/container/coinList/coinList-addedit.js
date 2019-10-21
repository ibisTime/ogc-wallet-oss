import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class coinListAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isDetail = !!getQueryString('isDetail', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '符号',
            field: 'symbol',
            required: true
        }, {
            title: '英文名称',
            field: 'ename',
            required: true
        }, {
            title: '中文名称',
            field: 'cname',
            required: true
        }, {
            title: '图标',
            field: 'icon',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '钱包水印图标',
            field: 'pic1',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '流水加钱图标',
            field: 'pic2',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '流水减钱图标',
            field: 'pic3',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '单位',
            field: 'unit',
            required: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'coin_type',
            required: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'coin_status',
            required: true
        }, {
            title: 'UI序号',
            field: 'orderNo',
            required: true
        }, {
            title: '归集阀值',
            field: 'collectStart',
            required: true
        }, {
            title: '取现手续费',
            field: 'withdrawFee',
            required: true
        }, {
            title: '合约地址',
            field: 'contractAddress',
            required: true
        }, {
            title: '合约ABI',
            field: 'contractABI',
            required: true
        }, {
            title: '更新人',
            field: 'updater',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '802000',
            editCode: '802002',
            detailCode: '802008',
            beforeSubmit: function(data) {
                data.withdrawFee = 0;
                return data;
            }
        });
    }
}

export default coinListAddedit;
