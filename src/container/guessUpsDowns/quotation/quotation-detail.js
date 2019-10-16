import React from 'react';
import { Form } from 'antd';
import { getQueryString, dateTimeFormat, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

function fixed8(val) {
    if(val) {
        return (Math.floor(+val * 1e8) / 1e8).toFixed(8);
    }else {
        return '';
    }
}

@Form.create()
class QuotationDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = getQueryString('v', this.props.location.search);
        this.isHis = getQueryString('type', this.props.location.search) === 'his';
    }
    render() {
        const fields = [{
            field: 'fromPlat',
            title: '来源'
        }, {
            field: 'symbol01',
            title: '交易对',
            formatter(v, d) {
                return d && `${d.symbol}/${d.toSymbol}`;
            }
        }, {
            field: 'period',
            title: 'k线时间',
            type: 'select',
            data: [{
                key: '1min',
                value: '1min'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'quantity',
            title: '成交笔数',
            formatter(v) {
                return v && parseInt(v);
            }
        }, {
            field: 'volume',
            title: '成交量',
            formatter(v) {
                return fixed8(v);
            }
        }, {
            field: 'amount',
            title: '成交金额',
            formatter(v) {
                return fixed8(v);
            }
        }, {
            field: 'ksgd',
            title: '开，收，高，低',
            formatter(v, d) {
                return d && `开：${fixed8(d.open)}，收：${fixed8(d.close)}，高：${fixed8(d.high)}，低：${fixed8(d.low)}`;
            }
        }, {
            field: 'modifyFlag',
            title: '是否修改',
            type: 'select',
            data: [{
                key: '1',
                value: '修改'
            }, {
                key: '0',
                value: '未修改'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'xg_ksgd',
            title: '修改后（开，收，高，低）',
            formatter(v, d) {
                return d && d.modifyFlag === '1' ? `开：${fixed8(d.modifyOpen)}，收：${fixed8(d.modifyClose)}，高：${fixed8(d.modifyHigh)}，低：${fixed8(d.modifyLow)}` : '-';
            }
        }, {
            field: 'klineDatetime',
            title: '产生时间',
            type: 'datetime'
        }, {
            field: 'grabDatetime',
            title: '抓取时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            key: 'id',
            detailCode: this.isHis ? '620033' : '620031',
            view: this.view
        });
    }
}

export default QuotationDetail;
