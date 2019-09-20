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
import { moneyFormat, showWarnMsg } from 'common/js/util';

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
        field: 'loginName',
        title: '下单人',
        render(v, d) {
            return d.user && d.user.loginName;
        }
    }, {
        field: 'applyUser',
        title: '下单人',
        type: 'select',
        pageCode: '805120',
        keyName: 'userId',
        valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
        searchName: 'keyword',
        search: true,
        params: {
            limit: 1000
        },
        render: (v, data) => {
            if (data.refereeUser) {
                let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                if (data.refereeUser.kind === 'Q') {
                    let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                    return name + '(' + tmpl + ')';
                }
                return data.refereeUser.nickname + '(' + tmpl + ')';
            }
            return '';
        },
        noVisible: true
    }, {
        field: 'paySymbol',
        title: '支付币种',
        search: true
    }, {
        field: 'payAmount',
        title: '支付金额',
        render(v, d) {
            return v && moneyFormat(v, '', d.paySymbol) + `(${d.paySymbol})`;
        }
    }, {
        field: 'dkAmount',
        title: '抵扣金额',
        render(v) {
            return v && moneyFormat(v, '', 'USDT') + '(USDT)';
        }
    }, {
        field: 'postFee',
        title: '邮费',
        render(v) {
            return v && moneyFormat(v, '', 'USDT') + '(USDT)';
        }
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'mall_order_status',
        search: true
    }, {
        field: 'payDatetime',
        title: '支付时间',
        type: 'datetime'
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        type: 'datetime'
    }];
    return this.props.buildList({
        fields,
        pageCode: 808065,
        btnEvent: {
            logisticsDelivery: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                    showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '2') {
                    showWarnMsg('该状态下不能进行该操作');
                } else {
                    this.props.history.push(`/store/shopOrder-logistics?code=${selectedRowKeys[0]}`);
                }
            }
        }
    });
  }
}

export default ShopOrder;
