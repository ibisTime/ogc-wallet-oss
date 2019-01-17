import React from 'react';
import { Form, Modal } from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/BTC-finance/offlineRecharge/offlineRecharge-addedit';
import {getQueryString, moneyFormat, getUserName, showSucMsg} from 'common/js/util';
import {getListUserAccount} from 'api/account';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail';

let accountNumber = null;
let currency = '';
@Form.create()
class OfflineRechargeAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.isapply = !!getQueryString('isapply', this.props.location.search);
    }

    render() {
        let fields = [{
          field: 'currency',
          title: '币种类型',
          type: 'select',
          pageCode: '802005',
          params: {
            status: '0'
          },
          keyName: 'symbol',
          valueName: '{{symbol.DATA}}-{{cname.DATA}}',
          searchName: 'symbol',
          onChange: (v) => {
            currency = v;
          }
        }, {
            field: 'userId',
            title: '充值用户',
            required: true,
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{realName.DATA}}({{nickname.DATA}})-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            onChange: (v, data) => {
                if (v && currency) {
                    getListUserAccount({userId: v, currency: currency}).then((d) => {
                      accountNumber = d[0].accountNumber;
                    });
                }else if(!currency) {
                  Modal.confirm({
                    title: '',
                    content: '请先选择币种类型',
                    onOk() {},
                    onCancel() {}
                  });
                }
            },
            formatter: (v, data) => {
                let mobile = data.payer.mobile ? '-' + data.payer.mobile : '';
                let email = data.payer.email ? '-' + data.payer.email : '';
                return data.payer ? data.payer.nickname + mobile + email : '';
            }
        }, {
            field: 'accountNumber',
            title: '充值账户',
            hidden: true
        }, {
            title: '充值数量',
            field: 'amount',
            required: true,
            coinAmount: true,
            coin: 'BTC',
            formatter: (v, data) => {
                return v ? moneyFormat(v, '', data.currency) : '';
            }
        }, {
            field: 'payCardInfo',
            title: '支付渠道'
        }, {
            field: 'payCardNo',
            title: '支付卡号'
        }, {
            field: 'applyNote',
            title: '充值说明',
            required: true
        }];

        let buttons = [{
          title: '返回',
          handler: () => {
            this.props.history.go(-1);
          }
        }];
        if (this.isCheck || (this.code && !this.isCheck)) {
            fields = fields.concat([{
                field: 'payNote',
                title: '审核意见',
                readonly: !this.isCheck,
                required: true
            }]);
        }
        if (this.isCheck) {
            buttons = [{
                title: '通过',
                handler: (param) => {
                    param.payResult = '1';
                    param.codeList = [this.code];
                    param.payUser = getUserName();
                    this.doFetching();
                    fetch(802341, param).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (param) => {
                    param.payResult = '0';
                    param.codeList = [this.code];
                    param.payUser = getUserName();
                    this.doFetching();
                    fetch(802341, param).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        }
      if (this.isapply) {
        buttons = [{
          title: '确定',
          handler: (param) => {
            param.applyUser = getUserName();
            param.accountNumber = accountNumber;
            this.doFetching();
            fetch(802340, param).then(() => {
              showSucMsg('操作成功');
              this.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.cancelFetching);
          },
          check: true,
          type: 'primary'
        }, {
          title: '返回',
          handler: () => {
            this.props.history.go(-1);
          }
        }];
      }
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '802340',
            detailCode: '802346',
            beforeSubmit: function(data) {
                data.applyUser = getUserName();
                return data;
            },
            buttons: buttons
        });
    }
}

export default OfflineRechargeAddedit;
