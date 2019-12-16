import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class MillMessageAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
          ...this.state,
            buyType: true
        };
        this.index = 0;
    }
    render() {
        const fields = [{
            field: 'code',
            title: '矿机编号',
            hidden: !this.view
        }, {
            field: 'type',
            title: '矿机类型',
            key: 'miner_type',
            type: 'select',
            required: true
        }, {
            field: 'name',
            title: '矿机名称',
            required: true
        }, {
            field: 'price',
            title: '单价（E-USDT币本位）',
            required: true
        }, {
            field: 'daysLimit',
            title: '有效期限（天）',
            required: true
        }, {
            field: 'dailyOutput',
            title: '日收益（DYJ）',
            required: true
        }, {
            field: 'stockTotal',
            title: '总库存',
            required: true
        }, {
            field: 'orderNo',
            title: '显示顺序',
            required: true,
            help: '数字越小越靠前'
        }, {
            field: 'status',
            title: '状态',
            key: 'exchange_symbol_pair_statis',
            type: 'select',
            hidden: !this.view
        }, {
            field: 'creatorName',
            title: '创建人',
            hidden: !this.view
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.view
        }, {
            field: 'updaterName',
            title: '更新人',
            hidden: !this.view
        }, {
            field: 'updateTime',
            title: '更新时间',
            type: 'datetime',
            hidden: !this.view
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '610500',
            editCode: '610502',
            detailCode: '610505',
            beforeSubmit: (params) => {
                params.buySymbol1 = 'HEY';
                if(!this.state.buyType) {
                    params.buySymbol2 = 'BEDN';
                }else {
                    delete params.buyMixRatio;
                }
                return params;
            }
        });
    }
}

export default MillMessageAddedit;
