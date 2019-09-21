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
} from '@redux/biz/store/shopMessage';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, showSucMsg, moneyFormat, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
import {getDictList} from 'api/dict';

@listWrapper(
  state => ({
    ...state.storeShopMessage,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ShopMessage extends React.Component {
    productLocation = [];
    componentDidMount() {
        getDictList({
            parentKey: 'product_location'
        }).then(data => {
            this.productLocation = data;
        });
    }
  render() {
    const fields = [{
        field: 'name',
        title: '产品名称',
        search: true
    }, {
        field: 'type',
        title: '所属类别',
        search: true,
        type: 'select',
        listCode: '808007',
        keyName: 'code',
        valueName: 'name',
        params: {
            status: '1'
        }
    }, {
        field: 'specsName1',
        title: '规格1'
    }, {
        field: 'specsName2',
        title: '规格2'
    }, {
        field: 'orderNo',
        title: '展示顺序'
    }, {
        field: 'location',
        title: '展示位置',
        type: 'select',
        key: 'product_location',
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'mall_product_status',
        search: true
    }];
    return <div>
        {
            this.props.buildList({
                fields,
                pageCode: 808025,
                btnEvent: {
                    edit: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            this.props.history.push(`/store/shopMessage/addedit?code=${selectedRowKeys[0]}`);
                        }
                    },
                    up: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (selectedRows[0].status === '3') {
                            showWarnMsg('该状态下不能进行该操作');
                        } else {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定上架？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    fetch(808013, {
                                        code: selectedRowKeys[0],
                                        boughtCount: '0',
                                        updater: getUserId()
                                    }).then(() => {
                                        showSucMsg('操作成功');
                                        this.props.cancelFetching();
                                        setTimeout(() => {
                                            this.props.getPageData();
                                        }, 1000);
                                    }).catch(this.props.cancelFetching);
                                }
                            });
                        }
                    },
                    down: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (selectedRows[0].status !== '3') {
                            showWarnMsg('该状态下不能进行该操作');
                        } else {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定下架？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    fetch(808014, {code: selectedRowKeys[0], updater: getUserId()}).then(() => {
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
            })
        }
    </div>;
  }
}

export default ShopMessage;
