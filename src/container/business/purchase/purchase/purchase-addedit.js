import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyParse,
    moneyFormat,
    showWarnMsg
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

const SYSTEM_COIN = window.SYSTEM_COIN;

@Form.create()
class PurchaseAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.totalAmount = 0;
        this.singleAmount = 0;
        this.symbolList = [];
        this.state = {
            ...this.state,
            isChange: false
        };
    }
    getSymbolList = (callbackFn) => {
        fetch(802013).then(data => {
            this.symbolList = data;
            callbackFn && callbackFn('symbol', data);
        });
    };
    componentDidMount() {
        if(this.code) {
            // fetch(650214, {code: this.code}).then(data => {
            //     this.totalAmount = moneyFormat(data.totalAmount, '', data.symbol);
            //     this.singleAmount = moneyFormat(data.singleAmount, '', SYSTEM_COIN);
            //     this.totalQuantity = moneyFormat(data.totalAmount, '', data.symbol) / (data.price * moneyFormat(data.singleAmount, '', SYSTEM_COIN));
            // });
        }
    }
    render() {
        const fields = [{
            field: 'code',
            title: '标的编号',
            hidden: !this.view
        }, {
            field: 'type',
            title: '申购类型',
            type: 'select',
            key: 'purchase_product_type',
            required: true
        }, {
            field: 'symbol',
            title: '币种名称',
            listCode: '802013',
            type: 'select',
            keyName: 'symbol',
            valueName: 'symbol',
            required: true
        }, {
            field: 'totalAmount',
            title: '申购总数量',
            required: true,
            positive: true,
            onChange: (v) => {
                this.totalAmount = v;
                if(v && this.singleAmount > 0) {
                    const totalQuantity = v / (this.singleAmount);
                    this.props.form.setFieldsValue({
                        totalQuantity
                    });
                }
            }
        }, {
            field: 'singleAmount',
            title: `每份数量`,
            positive: true,
            required: true,
            onChange: (v) => {
                if(v) {
                    this.singleAmount = v;
                    const totalQuantity = this.totalAmount / v;
                    this.props.form.setFieldsValue({
                        totalQuantity
                    });
                }
            }
        }, {
            field: 'totalQuantity',
            title: '总份数',
            disabled: true
        }, {
            field: 'price',
            title: '币单价（USDT）',
            required: true,
            positive: true,
            help: `一个当前币可以价值多少USDT`
        }, {
            field: 'remainQuantity',
            title: '剩余份数',
            hidden: !this.view
        }, {
            field: 'personPayQuantityMax',
            title: `单人申购上限(份)`,
            integer: true,
            required: true
        }, {
            field: 'orderNo',
            title: '展示次序',
            hidden: !this.view
        }, {
            field: 'showStatus',
            title: '展示状态',
            key: 'purchase_product_show_status',
            type: 'select',
            hidden: !this.view
        }, {
            field: 'productStatus',
            title: '申购状态',
            key: 'purchase_product_status',
            type: 'select',
            hidden: !this.view
        }, {
            field: 'startDatetime',
            title: '开始时间',
            required: true,
            type: 'datetime',
            isHours: true
        }, {
            field: 'endDatetime',
            title: '结束时间',
            required: true,
            type: 'datetime',
            isHours: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '650300',
            editCode: '650301',
            detailCode: '650314',
            beforeSubmit: (params) => {
                params.startDatetime = params.startDatetime.substr(0, params.startDatetime.length - 6);
                params.endDatetime = params.endDatetime.substr(0, params.endDatetime.length - 6);
                return 1;
            }
        });
    }
}
export default PurchaseAddedit;
