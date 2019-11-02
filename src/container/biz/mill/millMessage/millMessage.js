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
} from '@redux/mill/millMessage/millMessage';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import {Modal, message, Input} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.millMessage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class MillMessage extends React.Component {
    state = {
        visible: false,
        code: '',
        xyCount: null,
        amountVisible: false,
        amountVal: ''
    };
    amountChagne = e => {
        if (/^[\d.]*$/.test(e.target.value)) {
            this.setState({ amountVal: e.target.value });
        }
    };
    render() {
        const { visible, amountVisible, amountVal } = this.state;
        const fields = [{
            field: 'type',
            title: '矿机类型',
            key: 'miner_type',
            type: 'select',
            search: true
        }, {
            field: 'name',
            title: '矿机名称'
        }, {
            field: 'buySymbol',
            title: '购买币种'
        }, {
            field: 'minerSymbol',
            title: '出矿币种'
        }, {
            field: 'price',
            title: '单价（币本位）'
        }, {
            field: 'daysLimit',
            title: '有效期限（天）'
        }, {
            field: 'dailyOutput',
            title: '日收益'
        }, {
            field: 'stockTotal',
            title: '总库存'
        }, {
            field: 'stockOut',
            title: '售出总量'
        }, {
            field: 'status',
            title: '状态',
            key: 'exchange_symbol_pair_statis',
            type: 'select',
            search: true
        }, {
            field: 'orderNo',
            title: '显示顺序'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      pageCode: 610503,
                      deleteCode: '610501',
                      btnEvent: {
                          showHide: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  let sName = selectedRows[0].status === '0' ? '显示' : '隐藏';
                                  confirm({
                                      title: `${sName}矿机`,
                                      content: `是否${sName}该矿机`,
                                      onOk: () => {
                                          let hasMsg = message.loading('');
                                          fetch('610508', {
                                              code: selectedRowKeys[0]
                                          }).then(() => {
                                              hasMsg();
                                              message.success('操作成功', 1, () => {
                                                  this.props.getPageData();
                                              });
                                          }, hasMsg);
                                      },
                                      okText: '确定',
                                      cancelText: '取消'
                                  });
                              }
                          }
                      }
                  })
              }
          </div>
        );
    }
}

export default MillMessage;
