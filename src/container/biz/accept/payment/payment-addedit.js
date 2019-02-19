import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';
import {SYS_USER, CION_FMVP} from 'common/js/config';

let bankName = '';
@Form.create()
class PaymentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isAlipay = getQueryString('isAlipay', this.props.location.search) || '1';
    }

    render() {
        const fields = [{
            field: 'realName',
            title: '户名',
            required: true
        }, {
            field: 'bankCode',
            title: '银行名称',
            required: true,
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: '{{bankName.DATA}}',
            searchName: 'bankName',
            onChange(v, data) {
                if(Array.isArray(data)) {
                  data.forEach(item => {
                    if(item.bankCode === v) {
                      bankName = item.bankName;
                    }
                  });
                }
            }
        }, {
            field: 'subbranch',
            title: '支行',
            hidden: this.isAlipay === '1'
        }, {
          field: 'bankName',
          title: '银行名称',
          hidden: true
        }, {
            field: 'bankcardNumber',
            title: '卡号',
            required: true
        }, {
          field: 'bindMobile',
          title: '绑定手机号'
        }, {
          field: 'pic',
          title: '收款码',
          type: 'img',
          single: true,
          hidden: this.isAlipay === '0'
        }, {
          field: 'status',
          title: '状态',
          type: 'select',
          required: true,
          key: 'bank_card_status'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: '802022',
            detailCode: '802032',
            beforeSubmit: (params) => {
              if(bankName) {
                params.bankName = bankName;
              }
                return params;
            }
        });
    }
}

export default PaymentAddedit;
