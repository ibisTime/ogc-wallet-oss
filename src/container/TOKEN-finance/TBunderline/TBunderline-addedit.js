import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/TOKEN-finance/TBunderline/TBunderline-addedit';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import {CION_FMVP} from 'common/js/config';

@DetailWrapper(
    state => state.TOKENFinanceTBunderlineAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class TBunderlineAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
    }

    render() {
        let fields = [{
            field: 'accountNumber',
            title: '充值账户',
            required: true,
            type: 'select',
            pageCode: '802300',
            params: {
                currency: CION_FMVP,
                type: 'C'
            },
            keyName: 'accountNumber',
            valueName: '{{realName.DATA}}',
            searchName: 'accountNumber',
            help: '支持户名查询',
            formatter: (v, data) => {
                if (data.applyUserInfo) {
                    let tmpl = data.applyUserInfo.mobile ? data.applyUserInfo.mobile : data.applyUserInfo.email;
                    return data.applyUserInfo.realName ? data.applyUserInfo.realName : data.applyUserInfo.nickname + '(' + tmpl + ')';
                }
                return '';
            }
        }, {
            field: 'amount',
            title: '取现金额',
            required: true,
            coinAmount: true,
            coin: 'TOKEN',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'fee',
            title: '手续费',
            required: true,
            formatter: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'actualAmount',
            title: '到账金额',
            required: true,
            formatter: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'payCardInfo',
            title: '区块链类型',
            value: 'TOKEN',
            readonly: true,
            required: true
        }, {
            field: 'payCardNo',
            title: '提现地址',
            required: true
        }];

        if (!this.isCheck && this.view) {
            fields = fields.concat([{
                field: 'channelOrder',
                title: '交易hash'
            }, {
                field: 'payFee',
                title: '矿工费',
                formatter: (v, data) => {
                    return moneyFormat(v, '', 'ETH');
                }
            }]);
        }

        fields = fields.concat([{
            field: 'applyNote',
            title: '申请说明'
        }]);

        let buttons = [];
        if (this.isCheck) {
            fields = fields.concat([{
                field: 'approveNote',
                title: '审核意见',
                readonly: !this.isCheck,
                required: true
            }]);
            buttons = [{
                title: '通过',
                handler: (param) => {
                    param.approveResult = '1';
                    param.codeList = [this.code];
                    param.approveUser = getUserId();
                    this.props.doFetching();
                    fetch(802352, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (param) => {
                    param.approveResult = '0';
                    param.codeList = [this.code];
                    param.approveUser = getUserId();
                    this.props.doFetching();
                    fetch(802352, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
        return this.props.buildDetail({
            fields,
            _keys: ['withdraw'],
            code: this.code,
            view: this.view,
            detailCode: '802356',
            beforeSubmit: function(data) {
                data.applyUser = getUserId();
                return data;
            },
            buttons: buttons
        });
    }
}

export default TBunderlineAddedit;
