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
} from '@redux/house/rules/rules';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { Link } from 'react-router-dom';

@listWrapper(
  state => ({
      ...state.millRules,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Rules extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值',
            render: (v, d) => {
                if(d.ckey === 'transfer_out_approve_flag' || d.ckey === 'transfer_in_approve_flag') {
                    if(v === '0') {
                        return '否';
                    }else {
                        return '是';
                    }
                }else {
                    return v;
                }
            }
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630045',
            searchParams: {
                type: 'fpp'
            },
            buttons: [{
                code: 'userInvestFlow',
                name: '修改',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push('/house/rules/addedit?code=' + selectedRowKeys[0] + '&ctype=' + selectedRows[0].ckey);
                    }
                },
                check: true
            }]
        });
    }
}

export default Rules;
