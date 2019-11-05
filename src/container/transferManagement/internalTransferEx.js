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
} from '@redux/transferManagement/internalTransferEx';
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
import { getDictList } from 'api/dict';

let currency = '';
@listWrapper(
    state => ({
        ...state.internalTransferEx,
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
        getDictList({ parentKey: 'withdraw_biz_type' }).then(data => {
            console.log('withdraw_biz_type', data);
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
            field: 'accountName',
            title: '发起账号',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
                if (data.applyUserInfo) {
                    let tmpl = data.applyUserInfo.mobile ? data.applyUserInfo.mobile : data.applyUserInfo.email;
                    return (data.applyUserInfo.realName ? data.applyUserInfo.realName : data.applyUserInfo.nickname) + '(' + tmpl + ')';
                }
                return '';
            },
            search: true
        }, {
            field: 'amount',
            title: '提币数量',
            render: (v, data) => {
                if(v) {
                    return moneyFormat(v, '', data.currency);
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
                    return data.toUserInfo.nickname + '(' + tmpl + ')';
                }
                return '';
            }
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'date',
            rangedate: ['applyDateStart', 'applyDateEnd'],
            render: dateTimeFormat
        }, {
            title: '系统初判',
            field: 'isWarnning',
            render(v) {
                return v ? '已到预警线' : '未到预警线';
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: '802355',
            searchParams: {
                currency,
                status: '1',
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
                        // this.props.history.push(`/BTC-finance/TBunderline/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                        this.props.history.push(`/BTC-finance/TBunderline/userStatistics?applyUser=${selectedRows[0].applyUser}&code=${selectedRows[0].code}&symbol=${selectedRows[0].currency}`);
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
                    }
                }
            }
        });
    }
}

export default TBunderline;
