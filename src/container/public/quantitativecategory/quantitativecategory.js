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
} from '@redux/public/quantitativecategory';
import {listWrapper} from 'common/js/build-list';
import {
  showSucMsg,
  showWarnMsg,
  getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.quanTitativeCategory,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Quantitative extends React.Component {
  render() {
    const fields = [{
      field: 'title',
      title: '标题'
    }, {
      field: 'type',
      title: '分类名称',
      type: 'select',
      listCode: '802860',
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      field: 'orderNo',
      title: '次序'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      data: [{
        key: '0',
        value: '待上架'
      }, {
        key: '1',
        value: '上架中'
      }, {
        key: '2',
        value: '已下架'
      }],
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      field: 'updater',
      title: '最新更新人'
    }, {
      field: 'updateDatetime',
      title: '最新更新时间',
      type: 'datetime'
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: '802881',
      btnEvent: {
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/public/quantitativecategory/addedit?v=1&code=${selectedRows[0].code}`);
          }
        },
        edit: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status === '1') {
            showWarnMsg('不能修改已上架文章');
          }else {
            this.props.history.push(`/public/quantitativecategory/addedit?&code=${selectedRows[0].code}`);
          }
        },
        up: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status === '1') {
            showWarnMsg('不是可以上架的状态');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: `确定上架该文章？`,
              onOk: () => {
                this.props.doFetching();
                return fetch(802872, {
                  code: selectedRows[0].code,
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
        down: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status === '2') {
            showWarnMsg('不是可以下架的状态');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: `确定下架该文章？`,
              onOk: () => {
                this.props.doFetching();
                return fetch(802873, {
                  code: selectedRows[0].code,
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
    });
  }
}

export default Quantitative;
