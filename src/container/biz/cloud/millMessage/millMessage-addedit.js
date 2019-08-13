import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class CloudMessageAddedit extends DetailUtil {
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
            title: '水滴编号',
            hidden: !this.view
        }, {
            field: 'name',
            title: '水滴名称',
            required: true
        }, {
            field: 'buyType',
            title: '购买币种',
            type: 'select',
            key: 'machine_buy_type',
            required: true,
            onChange: (v) => {
                if(v === '1') {
                    this.setState({
                        buyType: false
                    });
                }else {
                    this.setState({
                        buyType: true
                    });
                }
            },
            formatter: (v) => {
                if(v === '1') {
                    if(this.index === 0) {
                        this.index++;
                        this.setState({
                            buyType: false
                        });
                    }
                }
                return v;
            }
        }, {
            field: 'priceCount1',
            title: 'HEY数量（币本位）',
            required: true
        }, {
            field: 'priceCount2',
            title: 'BEDN数量（币本位）',
            required: !this.state.buyType,
            hidden: this.state.buyType
        }, {
            field: 'daysLimit',
            title: '期限（天）',
            required: true
        }, {
            field: 'dailyOutput',
            title: '日产能（%）',
            required: true,
            formatter: (v) => {
                if(v) {
                    return (v * 100).toFixed(2);
                }
            }
        }, {
            field: 'stockTotal',
            title: '库存总量',
            required: true
        }, {
            field: 'stockOut',
            title: '已售总量',
            hidden: !this.view
        }, {
            field: 'stockOutFake',
            title: '虚拟已售总量',
            hidden: !this.view
        }, {
            field: 'status',
            title: '状态',
            key: 'exchange_symbol_pair_statis',
            type: 'select',
            hidden: !this.view
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime',
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
            addCode: '610000',
            editCode: '610002',
            detailCode: '610003',
            beforeSubmit: (params) => {
                params.dailyOutput = (+params.dailyOutput / 100).toFixed(4);
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

export default CloudMessageAddedit;
