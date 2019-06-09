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
} from '@redux/candy/candymanagement/candymanagement';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import {Modal, message, Input} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
  state => ({
      ...state.candyCandymanagement,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Candymanagement extends React.Component {
    state = {
        visible: false,
        code: '',
        xyCount: null
    };
    render() {
        const fields = [{
            field: 'name',
            title: '糖果名称',
            search: true
        }, {
            field: 'price',
            title: '购买糖果价格',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol) + data.symbol;
            }
        }, {
            field: 'symbol',
            title: '糖果购买可用币种',
            type: 'select',
            listCode: '802007',
            keyName: 'symbol',
            valueName: 'symbol',
            search: true
        }, {
            field: 'rate',
            title: '糖果甜度'
        }, {
            field: 'status',
            title: '糖果状态',
            type: 'select',
            key: 'candy_product_status'
        }, {
            field: 'inventory',
            title: '总可售数量'
        }, {
            field: 'saleAmount',
            title: '已售数量'
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
                      pageCode: 610415,
                      deleteCode: '610401',
                      btnEvent: {
                          showHide: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  let sName = selectedRows[0].status === '0' ? '上架' : '下架';
                                  confirm({
                                      title: `${sName}糖果`,
                                      content: `是否${sName}该糖果`,
                                      onOk: () => {
                                          let hasMsg = message.loading('');
                                          fetch('610403', {
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

export default Candymanagement;
