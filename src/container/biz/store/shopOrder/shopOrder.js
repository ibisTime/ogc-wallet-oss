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
} from '@redux/biz/store/shopOrder';
import {listWrapper} from 'common/js/build-list';
import { moneyFormat } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.storeShopOrder,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ShopOrder extends React.Component {
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
        key: 'mall_category_status'
    }];
    return this.props.buildList({
        fields,
        pageCode: 808005
    });
  }
}

export default ShopOrder;
