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
} from '@redux/public/otcpayment';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.publicOtcPayment,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Otcpayment extends React.Component {
    render() {
        const fields = [
            {
                title: '中文名称',
                field: 'name'
            }, {
                title: '英文名称',
                field: 'nameEn'
            }, {
                title: '类型',
                field: 'type',
                type: 'select',
                search: true,
                key: 'payment_method'
            }, {
                title: '状态',
                field: 'status',
                type: 'select',
                data: [{
                    key: '0',
                    value: '禁用'
                }, {
                    key: '1',
                    value: '启用'
                }],
                keyName: 'key',
                valueName: 'value',
                search: true
            }, {
                title: '次序',
                field: 'orderNo'
            }];
        return this.props.buildList({
            fields,
            pageCode: '625351',
            singleSelect: false,
            btnEvent: {
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let codeList = [];
                        for (let i = 0, len = selectedRows.length; i < len; i++) {
                            if (selectedRows[i].status !== '0') {
                                showWarnMsg(selectedRows[i].name + '不是可以启用的状态');
                                codeList = [];
                                return;
                            }
                            codeList.push(selectedRows[i].code);
                        }
                        if (codeList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定启用该付款方式？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return fetch(625342, {
                                        codeList: codeList,
                                        updater: getUserName()
                                    }).then(() => {
                                        this.props.getPageData();
                                        showSucMsg('操作成功');
                                    }).catch(() => {
                                        this.props.cancelFetching();
                                    });
                                }
                            });
                        }
                    }
                },
                down: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let codeList = [];
                        for (let i = 0, len = items.length; i < len; i++) {
                            if (items[i].status !== '1') {
                                showWarnMsg(items[i].name + '不是可以禁用的状态');
                                codeList = [];
                                return;
                            }
                            codeList.push(items[i].code);
                        }
                        if (codeList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定禁用该付款方式？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return fetch(625343, {
                                        codeList: codeList,
                                        updater: getUserName()
                                    }).then(() => {
                                        this.props.getPageData();
                                        showSucMsg('操作成功');
                                    }).catch(() => {
                                        this.props.cancelFetching();
                                    });
                                }
                            });
                        }
                    }
                },
                fee: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/otcadvicefee?&paymentCode=${items[0].code}`);
                    }
                }
            }
        });
    }
}

export default Otcpayment;
