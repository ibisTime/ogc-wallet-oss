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
} from '@redux/biz/store/shopCategory';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, showSucMsg, moneyFormat } from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.storeShopCategory,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ShopCategory extends React.Component {
  render() {
    const fields = [{
        field: 'name',
        title: '名称',
        search: true
    }, {
        field: 'pic',
        title: '图片',
        type: 'img'
    }, {
        field: 'orderNo',
        title: '顺序'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'mall_category_status',
        search: true
    }];
    return <div>
        {
            this.props.buildList({
                fields,
                pageCode: 808005,
                deleteCode: '808001',
                btnEvent: {
                    up: (selectedRowKeys, rows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (rows[0].status === '1') {
                            showWarnMsg('该状态下不能进行该操作');
                        } else {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定上架？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    fetch('808003', {
                                        code: selectedRowKeys[0]
                                    }).then(() => {
                                        this.props.form.resetFields();
                                        showSucMsg('操作成功');
                                        this.props.getPageData();
                                    }).catch(this.props.cancelFetching);
                                }
                            });
                        }
                    },
                    down: (selectedRowKeys, rows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (rows[0].status !== '1') {
                            showWarnMsg('该状态下不能进行该操作');
                        } else {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定下架？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    fetch(808004, {code: selectedRowKeys[0]}).then(() => {
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

export default ShopCategory;
