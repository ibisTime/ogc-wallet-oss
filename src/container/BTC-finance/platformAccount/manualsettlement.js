import React from 'react';
import {Form} from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/marketsettlement/manualsettlement';
import {getQueryString, getUserName, showSucMsg, moneyFormat} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class GJAddressQueryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.accountNumber = getQueryString('code', this.props.location.search) || '';
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search) || '';
        if (this.symbol) {
            this.bizType = this.bizType + '_' + this.symbol.toLowerCase();
        }
    }

    render() {
        const fields = [{
            title: '币种',
            hidden: true,
            field: 'currency'
        }, {
            value: getUserName(),
            required: true,
            field: 'creator',
            hidden: true
        }, {
            required: true,
            field: 'bizType',
            title: '结算类型',
            type: 'select',
            data: [{
                key: '0',
                value: '营销结算'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            required: true,
            field: 'type',
            title: '具体业务',
            type: 'select',
            data: [{
                key: '0',
                value: '划转结算'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            required: true,
            title: '打币地址',
            field: 'payCardNo'
        }, {
            required: true,
            field: 'settleAmount',
            title: '结算数量'
        }];

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            buttons: [{
                title: '保存',
                check: true,
                handler: (params) => {
                    console.log(params);
                    params.currency = this.symbol;
                    this.doFetching();
                    fetch(802820, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                    }).catch(this.cancelFetching);
                }
            }, {
                code: 'goBack',
                title: '返回',
                check: false,
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default GJAddressQueryAddedit;
