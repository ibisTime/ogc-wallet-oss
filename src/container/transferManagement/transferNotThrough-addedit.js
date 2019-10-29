import React from 'react';
import { Form } from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/BTC-finance/TBunderline/TBunderline-addedit';
import {getQueryString, moneyFormat, getUserId, showSucMsg, dateTimeFormat} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail';
@Form.create()
class TransferNotThroughAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
    }

    render() {
        let fields = [{
            field: 'currency',
            title: '币种',
            formatter(v, d) {
                return d && d.withdraw.currency;
            }
        }, {
            field: 'accountName',
            title: '发起账号',
            formatter: (v, data) => {
                if (data.withdraw && data.withdraw.applyUserInfo) {
                    const applyUserInfo = data.withdraw.applyUserInfo;
                    let tmpl = applyUserInfo.mobile ? applyUserInfo.mobile : applyUserInfo.email;
                    return applyUserInfo.nickname + '(' + tmpl + ')';
                }
                return '';
            }
        }, {
            field: 'amount',
            title: '提币数量',
            formatter: (v, data) => {
                if(data) {
                    return moneyFormat(data.withdraw.amount, '', data.withdraw.currency);
                }
            }
        }, {
            field: 'fee',
            title: '手续费',
            required: true,
            formatter: (v, data) => {
                if(data) {
                    return moneyFormat(data.withdraw.fee, '', data.withdraw.currency);
                }
            }
        }, {
            title: '实到数量',
            field: 'actualAmount',
            formatter(v, d) {
                return d && moneyFormat(d.withdraw.actualAmount, '', d.withdraw.currency);
            }
        }, {
            field: 'toUserInfo',
            title: '接收账号',
            formatter: (v, data) => {
                if (data.withdraw && data.withdraw.toUserInfo) {
                    const toUserInfo = data.withdraw.toUserInfo;
                    let tmpl = toUserInfo.mobile ? toUserInfo.mobile : toUserInfo.email;
                    return toUserInfo.nickname + '(' + tmpl + ')';
                }
                return '';
            }
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'date',
            formatter(v, d) {
                return d && dateTimeFormat(d.withdraw.applyDatetime);
            }
        }, {
            field: 'approveUser',
            title: '审核人',
            formatter: (v, data) => {
                return data.withdraw && data.withdraw.approveUserInfo ? data.withdraw.approveUserInfo.loginName : '';
            }
        }, {
            field: 'approveDatetime',
            title: '审核时间',
            type: 'date',
            rangedate: ['approveDateStart', 'approveDateEnd'],
            formatter: (v, d) => {
                return d && dateTimeFormat(d.withdraw.approveDatetime);
            }
        }, {
            field: 'applyNote',
            title: '申请说明',
            formatter: (v, data) => {
                return data.withdraw.applyNote;
            }
        }, {
            field: 'approveNote',
            title: '审核意见',
            formatter: (v, d) => {
                return d && d.withdraw.approveNote;
            }
        }, {
            field: 'payCardInfo',
            title: '区块链类型',
            value: 'BTC',
            readonly: true,
            required: true,
            formatter: (v, data) => {
                return data.withdraw.payCardInfo;
            }
        }, {
            field: 'payCardNo',
            title: '提现地址',
            required: true,
          formatter: (v, data) => {
            return data.withdraw.payCardNo;
          }
        }];

        if (!this.isCheck && this.view) {
            fields = fields.concat([{
                field: 'payFee',
                title: '矿工费',
                formatter: (v, data) => {
                    return moneyFormat(data.withdraw.payFee, '', data.withdraw.currency);
                }
            }]);
        }

        let buttons = [{
          title: '返回',
          handler: () => {
            this.props.history.go(-1);
          }
        }];
        if (this.isCheck) {
            fields = fields.concat([{
                field: 'approveNote',
                title: '审核意见',
                readonly: !this.isCheck,
                required: true,
              formatter: (v, data) => {
                return data.withdraw.approveNote;
              }
            }]);
            buttons = [{
                title: '通过',
                handler: (param) => {
                    param.approveResult = '1';
                    param.codeList = [this.code];
                    param.approveUser = getUserId();
                    this.doFetching();
                    fetch(802352, param).then(() => {
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
                    param.approveResult = '0';
                    param.codeList = [this.code];
                    param.approveUser = getUserId();
                    this.doFetching();
                    fetch(802352, param).then(() => {
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
            _keys: ['withdraw'],
            detailCode: '802356',
            beforeSubmit: function(data) {
                data.applyUser = getUserId();
                return data;
            },
            buttons: buttons
        });
    }
}

export default TransferNotThroughAddedit;
