import React from 'react';
import { Form } from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/BTC-finance/offlineRecharge/offlineRecharge-detail';
import {getQueryString, moneyFormat, getUserName, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail';
@Form.create()
class OfflineRechargeDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
    }

    render() {
        let fields = [{
            field: 'accountName',
            title: '户名',
            formatter: (v, data) => {
                return data.payer ? data.payer.nickname : '';
            }
        }, {
            field: 'loginName',
            title: '手机号/邮箱',
            formatter: (v, data) => {
                return data.payer ? data.payer.loginName : '-';
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
            title: '打币渠道'
        }, {
            field: 'payCardNo',
            title: '打币地址'
        }, {
            field: 'applyNote',
            title: '充值说明'
        }];

        let buttons = [{
          title: '返回',
          handler: (param) => {
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
                handler: (param) => {
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

export default OfflineRechargeDetail;
