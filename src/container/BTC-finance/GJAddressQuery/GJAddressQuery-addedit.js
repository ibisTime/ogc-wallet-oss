import React from 'react';
import { Form } from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/BTC-finance/GJAddressQuery/GJAddressQuery-addedit';
import {getQueryString, moneyFormat} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class GJAddressQueryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        let fields = [{
          field: 'currency',
          title: '币种类型'
        }, {
            field: 'amount',
            title: '交易数量',
            render: (v, data) => {
                console.log(data);
                return moneyFormat(Number(v), '', data.currency);
            }
        }, {
            title: '矿工费',
            field: 'txFee',
            render: (v, data) => {
                // console.log(data.currency);
                return moneyFormat(Number(v), '', data.currency);
            }
        }, {
            field: 'fromAddress',
            title: '来方归集'
        }, {
            title: '去方归集地址',
            field: 'toAddress'
        }, {
            field: 'confirmDatetime',
            title: '区块确认时间',
            type: 'datetime'
        }];

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '802366'
        });
    }
}

export default GJAddressQueryAddedit;
