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
} from '@redux/biz/financial/productsWill';
import {listWrapper} from 'common/js/build-list';
import {
  moneyFormat,
  showWarnMsg,
  showSucMsg
} from 'common/js/util';

@listWrapper(
  state => ({
    ...state.bizProductsWill,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ProductsWill extends React.Component {
  render() {
    const fields = [{
      title: '名称（中文简体）',
      field: 'name',
      render: (v, data) => {
        return data.nameZhCn ? data.nameZhCn : '';
      },
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
      render: (v, data) => v,
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
      render: function (v, data) {
        return v * 100;
      }
    }, {
      title: '总募集金额',
      field: 'amount',
      render: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbol);
      }
    }, {
      title: '可售金额',
      field: 'avilAmount',
      render: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbol);
      }
    }, {
      title: '募集成功金额',
      field: 'successAmount',
      render: function (v, data) {
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
      key: 'product_status'
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
        statusList: ['4']
      },
      btnEvent: {
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/bizFinancial/products/detail?v=1&code=${selectedRowKeys[0]}&isDetail=1`);
          }
        }
      }
    });
  }
}

export default ProductsWill;
