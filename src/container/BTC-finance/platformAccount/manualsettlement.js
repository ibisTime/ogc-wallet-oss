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
import {getQueryString, getUserName, showSucMsg, moneyParse, moneyFormat} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class GJAddressQueryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.accountNumber = getQueryString('code', this.props.location.search) || '';
        this.settleAmount = getQueryString('settleAmount', this.props.location.search) || '';
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search) || '';
        if (this.symbol) {
            this.bizType = this.bizType + '_' + this.symbol.toLowerCase();
        }
        this.settleAmount = moneyParse(this.settleAmount, '', this.bizType);
    }

    render() {
        const fields = [{
            title: '币种',
            readonly: false,
            hidden: true,
            field: 'currency'
        }, {
            field: 'creator',
            hidden: true
        }, {
            readonly: false,
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
            readonly: false,
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
            field: 'payCardNo',
            readonly: false
        }, {
            field: 'settleAmount',
            title: '结算数量',
            formatter: (v, d) => {
                return moneyFormat(this.settleAmount, '', this.bizType) + '-BTC';
            }
        }];

        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            buttons: [{
                title: '保存',
                check: true,
                handler: (params) => {
                    // console.log(params);
                    // this.settleAmount = moneyFormat(this.settleAmount, '', this.bizType);
                    params.settleAmount = this.settleAmount;
                    params.creator = params.updater;
                     params.currency = this.bizType;
                    this.doFetching();
                    fetch(802820, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
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
