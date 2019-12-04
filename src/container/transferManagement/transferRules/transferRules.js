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
} from '@redux/transferManagement/transferRules';
import { listWrapper } from 'common/js/build-list';
import { moneyFormat } from 'common/js/util';

@listWrapper(
  state => ({
      ...state.TransferTransferRules,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class TransferRules extends React.Component {
    render() {
        const fields = [{
            field: 'id',
            title: '编号',
            noVisible: true
        }, {
            field: 'symbol',
            title: '币种符号'
        }, {
            field: 'approveFlag',
            title: '是否审核',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'withdrawMin',
            title: '单笔最小值'
        }, {
            field: 'withdrawStep',
            title: '提币步长'
        }, {
            field: 'withdrawMax',
            title: '单笔最大值'
        }, {
            field: 'withdrawLimit',
            title: '每人每日提币上限'
        }, {
            field: 'withdrawFee',
            title: '提币手续费',
            render(v, d) {
                return d && d.withdrawFeeType === '0' ? v : (+v) * 100 + '%';
            }
        }, {
            field: 'withdrawFeeTakeLocation',
            title: '手续费扣除位置',
            data: [{
                key: '1',
                value: '余额中'
            }, {
                key: '0',
                value: '取现金额中'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select'
        }, {
            field: 'withdrawRule',
            title: '提币规则',
            type: 'textarea'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802025'
        });
    }
}

export default TransferRules;
