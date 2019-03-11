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
} from '@redux/otcmanage/advert';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import {Modal} from 'antd';
@listWrapper(
    state => ({
        ...state.OtcManageAdvert,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Advert extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '发布人'
        }, {
            field: 'cvalue',
            title: '交易对'
        }, {
            field: 'cvalue',
            title: '付款方式'
        }, {
            field: 'cvalue',
            title: '已有总量'
        }, {
            field: 'cvalue',
            title: '溢价率'
        }, {
            field: 'cvalue',
            title: '保护价'
        }, {
            field: 'cvalue',
            title: '单笔最大量'
        }, {
            field: 'cvalue',
            title: '单笔最小量'
        }, {
            field: 'cvalue',
            title: '付款期限'
        }, {
            field: 'cvalue',
            title: '状态'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            // rowKey: 'id',
            pageCode: '625225',
            btnEvent: {
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是可以上架的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定上架该广告？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625223, {
                                    adsCode: selectedRows[0].adsCode,
                                    user: selectedRows[0].user,
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
                },
                down: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].status !== '1') {
                        showWarnMsg('该广告不可下架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定下架该广告？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625222, {
                                    adsCode: items[0].adsCode,
                                    user: items[0].user,
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
            }
            // searchParams: {
            //     type: 'coin_price_x'
            // }
        });
    }
}

export default Advert;
