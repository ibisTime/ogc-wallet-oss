import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/BTC-finance/TBunderline/TBunderline';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    moneyFormatSubtract,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

let currency = '';
@listWrapper(
    state => ({
        ...state.BTCFinanceTBunderline,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TBunderline extends React.Component {
      componentDidMount() {
        let clearParams = document.getElementById('clearParams');
        clearParams.addEventListener('click', () => {
          currency = '';
        });
      }
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
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
          render: (v, data) => v,
          search: true,
          onChange: (v) => {
            setTimeout(() => {
              let clearSpan = document.querySelector('.ant-select-selection__clear');
              clearSpan.addEventListener('click', () => {
                currency = '';
              });
            }, 0);
            currency = v;
          }
        }, {
            field: 'accountName',
            title: '账号',
            render: (v, data) => {
                if (data.applyUserInfo) {
                    let tmpl = data.applyUserInfo.email ? data.applyUserInfo.email : data.applyUserInfo.mobile;
                    return data.applyUserInfo.realName ? data.applyUserInfo.realName : data.applyUserInfo.nickname + '(' + tmpl + ')';
                }
                return '';
            }
        }, {
            field: 'amount',
            title: '提现金额',
            render: (v, data) => {
                return moneyFormat(data.amount, '', data.currency);
            }
        }, {
            field: 'actualAmount',
            title: '实际到账金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'channelType',
            title: '渠道',
            type: 'select',
            key: 'channel_type',
            search: true
        }, {
            title: '区块链类型',
            field: 'payCardInfo'
        }, {
            title: '提现地址',
            field: 'payCardNo'
        }, {
            field: 'applyUser',
            title: '申请人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                if (data.applyUserInfo) {
                    let tmpl = data.applyUserInfo.mobile ? data.applyUserInfo.mobile : data.applyUserInfo.email;
                    if (data.applyUserInfo.kind === 'Q') {
                        return data.applyUserInfo.realName + '(' + tmpl + ')';
                    }
                    return data.applyUserInfo.nickname + '(' + tmpl + ')';
                }
                return '';
            }
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'date',
            rangedate: ['applyDateStart', 'applyDateEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '申请说明',
            field: 'applyNote'
        }, {
            title: '状态',
            field: 'status',
            search: true,
            type: 'select',
            data: [{
                'key': '3',
                'value': '审批通过待广播'
            }, {
                'key': '4',
                'value': '广播中'
            }],
            keyName: 'key',
            valueName: 'value'
        },
            {
            field: 'approveNote',
            title: '审核意见'
        }, {
            field: 'approveUser',
            title: '审核人',
            render: (v, data) => {
                return data.approveUserInfo ? data.approveUserInfo.loginName : '';
            }
        }, {
            field: 'approveDatetime',
            title: '审核时间',
            type: 'date',
            rangedate: ['approveDateStart', 'approveDateEnd'],
            render: dateTimeFormat,
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '802355',
            searchParams: {
                currency,
                statusList: ['3', '4'],
                bizType: 'withdraw'
            },
            btnEvent: {
                multiCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是待审核的记录');
                    } else {
                        this.props.history.push(`/BTC-finance/TBunderline/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                    }
                },
                sp: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '3') {
                        showWarnMsg('不是可广播的记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定广播？`,
                            onOk: () => {
                                this.props.doFetching();
                                let params = {};
                                params.code = selectedRowKeys[0];
                                params.approveUser = getUserId();
                                this.props.doFetching();
                                fetch(802353, params).then(() => {
                                    showSucMsg('操作成功');
                                    this.props.cancelFetching();
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 1000);
                                }).catch(this.props.cancelFetching);
                            }
                        });
                        // this.props.history.push(`/BTC-finance/TBunderline/multiCheck?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default TBunderline;
