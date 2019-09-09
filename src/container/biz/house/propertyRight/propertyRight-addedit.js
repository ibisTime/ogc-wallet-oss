import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class propertyRightAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            buyType: true,
            isShow: false,
            isJb: true,
            isPc: true,
            isJb2: true
        };
        this.index = 0;
    }
    render() {
        const {isShow} = this.state;
        const fields = [{
            field: 'name',
            title: '产权名称',
            required: true
        }, {
            field: 'code',
            title: '产权编号',
            hidden: !this.view
        }, {
            field: 'symbolIn',
            title: '买入币种',
            type: 'select',
            key: 'fpp_symbol_in',
            required: true
        }, {
            field: 'priceType',
            title: '买入方式',
            type: 'select',
            data: [{
                'key': '1',
                'value': '币本位'
            }, {
                'key': '2',
                'value': '金本位'
            }],
            keyName: 'key',
            valueName: 'value',
            onChange: (v) => {
                if(v === '1') {
                    this.setState({
                        isJb: false,
                        isPc: true
                    });
                }else {
                    this.setState({
                        isPc: false,
                        isJb: true
                    });
                }
            },
            required: true
        }, {
            field: 'priceCurrency',
            title: '金本位标价法币币种',
            type: 'select',
            key: 'fpp_symbol_out_currency',
            hidden: this.state.isPc,
            required: true
        }, {
            field: 'price',
            title: '购买单价',
            help: '金本位则是法币数量，币本位则是数字货币数量。举例:如果购买方式是金本位（USD），购买币种是TOSP，则根据TOSP的USD行情实时计算购买数量；如果购买方式是币本位（TOSP）,则直接是TOSP的数量。',
            required: true
        }, {
            field: 'symbolOut',
            title: '收益币种',
            type: 'select',
            key: 'fpp_symbol_out',
            required: true
        }, {
            field: 'symbolOutType',
            title: '收益方式',
            type: 'select',
            data: [{
                'key': '1',
                'value': '币本位'
            }, {
                'key': '2',
                'value': '金本位'
            }],
            keyName: 'key',
            valueName: 'value',
            onChange: (v) => {
                if(v === '2') {
                    this.setState({
                        isJb2: false
                    });
                }else {
                    this.setState({
                        isJb2: true
                    });
                }
            },
            required: true
        }, {
            field: 'symbolOutCurrency',
            title: '金本位收益法币币种',
            type: 'select',
            key: 'fpp_symbol_out_currency',
            hidden: this.state.isJb2,
            required: true
        }, {
            field: 'dailyRate',
            title: '日息',
            help: '金本位则是法币数量，币本位则是数字货币数量。举例:如果收益方式是金本位（USD），收益币种是TOSP，则根据TOSP的USD行情实时计算收益数量；如果收益方式是币本位（TOSP）,则直接产出对应数量的TOSP。',
            required: true
        }, {
            field: 'daysLimit',
            title: '期限（天）',
            required: true
        }, {
            field: 'deductFlag',
            title: '是否支持抵扣',
            type: 'select',
            data: [{
                'key': '0',
                'value': '否'
            }, {
                'key': '1',
                'value': '是'
            }],
            keyName: 'key',
            valueName: 'value',
            onChange: (v) => {
                if(v === '0') {
                    this.setState({
                        isShow: false
                    });
                }else {
                    this.setState({
                        isShow: true
                    });
                }
            },
            required: true
        }, {
            field: 'deductSymbol',
            title: '抵扣币种',
            type: 'select',
            key: 'fpp_symbol_deduct',
            hidden: !isShow
        }, {
            field: 'deductRate',
            title: '抵扣汇率',
            help: '支付币种兑抵扣币种。举例：如果汇率是10，则10个抵扣币种可以抵扣1个支付币种',
            hidden: !isShow
        }, {
            field: 'deductLimit',
            title: '抵扣上限（支付币种）',
            hidden: !isShow
        }, {
            field: 'outFeeType',
            type: 'select',
            data: [{
                'key': '1',
                'value': '绝对值'
            }, {
                'key': '2',
                'value': '百分比'
            }],
            keyName: 'key',
            valueName: 'value',
            title: '提前退出手续费类型',
            required: true
        }, {
            field: 'outFee',
            title: '提前退出手续费',
            required: true
        }, {
            field: 'stockTotal',
            title: '总库存',
            required: true
        }, {
            field: 'buyLimit',
            title: '单人购买次数上限',
            required: true
        }, {
            field: 'orderNo',
            title: '显示顺序'
        }, {
            field: 'description',
            title: '描述'
        }, {
            field: 'remark',
            title: '备注'
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
            addCode: '610700',
            editCode: '610702',
            detailCode: '610706',
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

export default propertyRightAddedit;
