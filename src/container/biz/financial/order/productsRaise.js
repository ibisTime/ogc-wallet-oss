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
} from '@redux/biz/financial/productsRaise';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizProductsRaise,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ProductsRaise extends React.Component {
    render() {
      const fields = [{
        title: '名称（中文简体）',
        field: 'nameZhCn',
        search: true
      }, {
        title: '币种',
        field: 'symbol',
        type: 'select',
        pageCode: '802005',
        params: {
          status: '0'
        },
        keyName: 'symbol',
        valueName: '{{symbol.DATA}}-{{cname.DATA}}',
        searchName: 'symbol',
        search: true
      }, {
        title: '类型',
        field: 'type',
        type: 'select',
        key: 'product_type',
        search: true
      }, {
        title: '产品期限（天）',
        field: 'limitDays'
      }, {
        title: '预期年化收益率(%)',
        field: 'expectYield',
        formatter: function (v, data) {
          return v * 100;
        }
      }, {
        title: '总募集金额',
        field: 'amount',
        formatter: function (v, data) {
          return moneyFormat(v.toString(), '', data.symbol);
        }
      }, {
        title: '可售金额',
        field: 'avilAmount',
        formatter: function (v, data) {
          return moneyFormat(v.toString(), '', data.symbol);
        }
      }, {
        title: '募集成功金额',
        field: 'successAmount',
        formatter: function (v, data) {
          return moneyFormat(v.toString(), '', data.symbol);
        }
      }, {
        title: '总份数',
        field: 'totalFen'
      }, {
        title: '限购份数',
        field: 'limitFen'
      }, {
        title: '状态',
        field: 'status',
        type: 'select',
        key: 'product_status',
        required: true
      }, {
        title: '更新时间',
        field: 'updateDatetime',
        type: 'datetime'
      }, {
        title: '备注',
        field: 'remark'
      }];
      return this.props.buildList({
        fields,
        pageCode: '625510',
        searchParams: {
          statusList: ['4', '5', '6']
        },
        btnEvent: {
          detail: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/bizFinancial/products/addedit?v=1&code=${selectedRowKeys[0]}`);
            }
          },
          investFlowAll: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              var statusList = {'5': '5', '6': '6', '7': '7', '8': '8', '9': '9'};
              if (!statusList[selectedRows[0].status]) {
                showWarnMsg('该产品还未开始募集！');
                return;
              }
              this.props.history.push(`/bizFinancial/investFlowAll?code=${selectedRows[0].code}&menu=raise`);
            }
          }
        }
      });
    }
}

export default ProductsRaise;