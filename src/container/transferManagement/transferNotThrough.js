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
} from '@redux/transferManagement/transferNotThrough';
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
        ...state.transferNotThrough,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class transferNotThrough extends React.Component {
    componentDidMount() {
        let clearParams = document.getElementById('clearParams');
        clearParams.addEventListener('click', () => {
            currency = '';
        });
    }
    render() {
        const fields = [{
            field: 'currency',
            title: '币种',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            render: (v) => v,
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
            field: 'applyUser',
            title: '发起账号',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                if (data.applyUserInfo) {
                    let tmpl = data.applyUserInfo.mobile ? data.applyUserInfo.mobile : data.applyUserInfo.email;
                    return (data.applyUserInfo.realName ? data.applyUserInfo.realName : data.applyUserInfo.nickname) + '(' + tmpl + ')';
                }
                return '';
            }
        }, {
            field: 'amount',
            title: '转账总额',
            render: (v, data) => {
                if(data.amount) {
                    return moneyFormat(data.amount, '', data.currency);
                }
            }
        }, {
            field: 'fee',
            title: '手续费',
            required: true,
            render: (v, data) => {
                if(v) {
                    return moneyFormat(v, '', data.currency);
                }
            }
        }, {
            title: '实到数量',
            field: 'actualAmount',
            render(v, d) {
                return v && moneyFormat(v, '', d.currency);
            }
        }, {
            field: 'toUserInfo',
            title: '接收账号',
            render: (v, data) => {
                if (data.toUserInfo) {
                    let tmpl = data.toUserInfo.mobile ? data.toUserInfo.mobile : data.toUserInfo.email;
                    if (data.toUserInfo.kind === 'Q') {
                        return data.toUserInfo.realName + '(' + tmpl + ')';
                    }
                    return data.toUserInfo.nickname + '(' + tmpl + ')';
                }
                return '';
            }
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
        }, {
            field: 'approveNote',
            title: '审核意见'
        }];
        return this.props.buildList({
            fields,
            pageCode: '802355',
            searchParams: {
                status: '2',
                bizType: 'transfer'
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
                        this.props.history.push(`/BTC-finance/nopassquery/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
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

export default transferNotThrough;
