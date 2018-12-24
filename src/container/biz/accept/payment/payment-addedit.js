import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/accept/payment/payment-addedit';
import {getQueryString, moneyFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {SYS_USER, CION_FMVP} from 'common/js/config';

@DetailWrapper(
    state => state.acceptPaymentAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class PaymentAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isAlipay = getQueryString('isAlipay', this.props.location.search) || '1';
    }

    render() {
        const fields = [{
            field: 'userId',
            title: '收款类型',
            value: 'SYS_USER',
            hidden: true
        }, {
            field: 'type',
            title: '收款类型',
            value: '1',
            hidden: true
        }, {
            field: 'currency',
            title: '币种',
            required: true,
            value: CION_FMVP,
            hidden: true
        }, {
            field: 'realName',
            title: '户名'
        }, {
            field: 'bankCode',
            title: '名称',
            required: true,
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: '{{bankName.DATA}}',
            searchName: 'bankName',
            value: 'alipay',
            readonly: true,
            onChange: (v, data) => {
                if (v === 'alipay') {
                    this.isAlipay = '1';
                } else {
                    this.isAlipay = '0';
                }
                this.props.form.setFieldsValue({
                    'subbranch': data.bankName,
                    'bankName': data.bankName
                });
            }
        }, {
            field: 'bankName',
            title: '银行名称',
            required: true,
            value: '支付宝',
            hidden: true
        }, {
            field: 'subbranch',
            title: '支行',
            required: true,
            value: '支付宝',
            hidden: this.isAlipay === '1'
        }, {
            field: 'bankcardNumber',
            title: '卡号'
        }, {
            field: 'pic',
            title: '二维码图片',
            type: 'img',
            single: true,
            required: true,
            hidden: this.isAlipay !== '1'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '802020',
            editCode: '802022',
            detailCode: '802027',
            beforeSubmit: (params) => {
            //     let bank = this.props.selectData.bankCode.find(v => v.bankCode === params.bankCode);
                params.bankCode = this.props.pageData.bankCode;
                params.bankName = '支付宝';
            //     if (this.isAlipay === '1') {
                params.subbranch = '支付宝';
            //     }
                return params;
            }
        });
    }
}

export default PaymentAddedit;
