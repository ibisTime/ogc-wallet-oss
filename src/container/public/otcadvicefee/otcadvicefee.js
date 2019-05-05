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
} from '@redux/public/advicefee';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName,
    getQueryString,
    moneyParse,
    getCoinList
} from 'common/js/util';
import fetch from 'common/js/fetch';
@listWrapper(
    state => ({
        ...state.publicOtcadviceFee,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class PublicOtcadviceFee extends React.Component {
    constructor(props) {
        super(props);
        this.paymentCode = getQueryString('paymentCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '付款方式',
            field: 'paymentName'
        }, {
            field: 'symbol',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '费率(%)',
            field: 'feeRate'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625390',
            deleteCode: 625382,
            rowKey: 'id',
            searchParams: {
                paymentCode: this.paymentCode
            },
            buttons: [
                {
                    code: 'add',
                    name: '新增',
                    handler: (keys, items) => {
                        this.props.history.push(`/system/otcadvicefee/add?paymentCode=${this.paymentCode}`);
                    }
                }, {
                    code: 'edit',
                    name: '修改',
                    handler: (keys, items) => {
                        if (!keys.length) {
                            showWarnMsg('请选择记录');
                        } else if (keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            this.props.history.push(`/system/otcadvicefee/edit?paymentCode=${this.paymentCode}&id=${items[0].id}`);
                        }
                    }
                }, {
                    code: 'detail',
                    name: '详情',
                    handler: (keys, items) => {
                        if (!keys.length) {
                            showWarnMsg('请选择记录');
                        } else if (keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            this.props.history.push(`/system/otcadvicefee/edit?v=1&paymentCode=${this.paymentCode}&id=${items[0].id}`);
                        }
                    }
                }, {
                    code: 'delete',
                    name: '删除',
                    delete: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else {
                                Modal.confirm({
                                    okText: '确认',
                                    cancelText: '取消',
                                    content: `确定删除？`,
                                    onOk: () => {
                                        this.props.doFetching();
                                        return fetch(625382, {
                                            id: selectedRows[0].id,
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
                }, {
                    code: 'goBack',
                    name: '返回',
                    check: false,
                    handler: () => {
                        this.props.history.go(-1);
                    }
                }]
        });
    }
}
export default PublicOtcadviceFee;
