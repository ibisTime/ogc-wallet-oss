import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/finance/TBunderline/TBunderline';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    moneyFormatSubtract,
    getCoinList,
    dateTimeFormat,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.financeTBunderline,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TBunderline extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            field: 'accountName',
            title: '账号',
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
            field: 'amount',
            title: '提现金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
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
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'withdraw_status',
            search: true
        }, {
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
                currency: 'ETH'
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
                        this.props.history.push(`/finance/TBunderline/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
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
                        this.props.history.push(`/finance/TBunderline/multiCheck?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default TBunderline;
