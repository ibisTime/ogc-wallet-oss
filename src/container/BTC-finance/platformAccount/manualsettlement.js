import React from 'react';
import { Form } from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/marketsettlement/manualsettlement';
import {getQueryString, moneyFormat} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class GJAddressQueryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.accountNumber = getQueryString('code', this.props.location.search) || '';
        this.isPlat = !!getQueryString('isPlat', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search) || '';
        if(this.symbol) {
            this.bizType = this.bizType + '_' + this.symbol.toLowerCase();
        }
    }
    render() {
        const fields = [{
            field: 'bizType',
            title: '结算类型'
        }, {
            field: 'currency',
            title: '具体业务'
        }, {
            title: '打币地址',
            field: 'payCardNo'
        }, {
            field: 'settleAmount',
            title: '结算数量'
        }];

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            searchParams: {
                isPlat: this.isPlat,
                bizType: this.bizType,
                currency: this.symbol,
                accountNumber: this.accountNumber
            },
            addCode: '802820'
        });
    }
}

export default GJAddressQueryAddedit;
