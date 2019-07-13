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
} from '@redux/user/customer/identify';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg} from 'common/js/util';

@listWrapper(
  state => ({
      ...state.userCustomerIdentify,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class CustomerIdentify extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '订单编号'
        }, {
            field: 'userId',
            title: '手机号',
            render: (v, d) => d && d.user ? d.user.mobile : '',
            type: 'select',
            pageCode: 805120,
            keyName: 'userId',
            valueName: 'mobile',
            searchName: 'mobile',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                dkey: '0',
                dvalue: '待调用三方'
            }, {
                dkey: '1',
                dvalue: '三方认证成功'
            }, {
                dkey: '2',
                dvalue: '三方认证失败待人工认证'
            }, {
                dkey: '3',
                dvalue: '人工认证通过'
            }, {
                dkey: '4',
                dvalue: '人工认证失败'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '805203',
            searchParams: {
                statusList: ['0', '2']
            },
            btnEvent: {
                // 审核
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0' && selectedRows[0].status !== '2') {
                        showWarnMsg('该记录不是待人工认证节点');
                    } else {
                        this.props.history.push(`/user/identify/addedit?code=${selectedRowKeys[0]}&check=1&v=1`);
                    }
                }
            }
        });
    }
}

export default CustomerIdentify;
