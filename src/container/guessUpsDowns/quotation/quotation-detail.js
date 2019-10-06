import React from 'react';
import { Form } from 'antd';
import { getQueryString, dateTimeFormat, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class QuotationDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'jyd',
            title: '交易对'
        }, {
            field: 'jyd',
            title: 'k线类型'
        }, {
            field: 'createDatetime',
            title: 'k线时间',
            type: 'datetime'
        }, {
            field: 'cjl',
            title: '成交量',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'ksgd',
            title: '开，收，高，低'
        }, {
            field: 'ly',
            title: '来源'
        }, {
            field: 'xg',
            title: '是否修改'
        }, {
            field: 'createDatetime1',
            title: '抓取时间',
            type: 'datetime'
        }, {
            field: 'createDatetime2',
            title: '修改时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            key: 'id',
            editCode: '650104',
            detailCode: '650106'
        });
    }
}

export default QuotationDetail;
