import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';
import {SYS_USER, CION_FMVP} from 'common/js/config';

@Form.create()
class PaymentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isAlipay = getQueryString('isAlipay', this.props.location.search) || '1';
        this.bankName = '';
        this.index = 0;
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
            hidden: this.isAlipay === '1',
            params: {
              type: '0'
            },
            onChange: (v, data) => {
                if(Array.isArray(data)) {
                  data.forEach(item => {
                    if(item.bankCode === v) {
                      this.bankName = item.bankName;
                    }
                  });
                }
            },
            formatter: (v, d) => {
                if(d.bankName && this.index === 0) {
                    this.index++;
                    this.bankName = d.bankName;
                }
                return v;
            }
        }, {
            field: 'subbranch',
            title: '支行',
            hidden: this.isAlipay === '1'
        }, {
            field: 'bankcardNumber',
            title: this.isAlipay === '1' ? '账号' : '卡号',
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
            hidden: true,
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
              if(this.isAlipay === '1') {
                params.bankName = '支付宝';
              }
              if(this.bankName) {
                params.bankName = this.bankName;
              }
                return params;
            }
        });
    }
}

export default PaymentAddedit;
