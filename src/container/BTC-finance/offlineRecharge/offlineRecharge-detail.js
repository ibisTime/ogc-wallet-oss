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
import {getQueryString, moneyFormat, getUserName, showSucMsg, dateTimeFormat} from 'common/js/util';
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
            field: 'channelOrder',
            title: '充值编号'
        }, {
            field: 'currency',
            title: '币种类型'
        }, {
            field: 'accountNumber',
            title: '充值账户',
            hidden: true
        }, {
            field: 'amount',
            title: '充值金额',
            formatter: (v, data) => {
                return moneyFormat(Number(v), '', data.currency);
            }
        }, {
            field: 'bizNote',
            title: '充值说明'
        }, {
            field: 'payDatetime',
            title: '到账时间',
            type: 'date'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'charge_status',
            search: true
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
                required: true,
                hidden: this.view
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
