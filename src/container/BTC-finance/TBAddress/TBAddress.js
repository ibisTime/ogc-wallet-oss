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
} from '@redux/BTC-finance/TBAddress/TBAddress';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.BTCFinanceTBAddress,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TBAddress extends React.Component {
    render() {
        const fields = [{
          field: 'currency',
          title: '币种类型',
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
            field: 'address',
            title: '地址'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'maddress_status',
            search: true
        }, {
            title: '创建日期',
            field: 'createDatetime',
            type: 'datetime'
        // }, {
            // title: '使用次数',
            // field: 'useCount'
        // }, {
        //     field: 'useAmountString',
        //     title: '提币金额',
        //     render: (v, data) => {
        //         return moneyFormat(Number(data.useAmount), '', data.currency);
        //     }
        // }, {
        //     title: '余额',
        //     field: 'balanceString',
        //     render: (v, data) => {
        //         return moneyFormat(Number(data.useAmount), '', data.currency);
        //     }
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802515',
            searchParams: {
                type: 'M'
            },
            btnEvent: {
                add: (selectedRowKeys, selectedRows) => {
                    Modal.confirm({
                        okText: '确认',
                        cancelText: '取消',
                        content: `确认生成提币地址？`,
                        onOk: () => {
                            this.props.doFetching();
                            fetch(802510, {}).then(() => {
                                this.props.getPageData();
                                showSucMsg('操作成功');
                            }).catch(() => {
                                this.props.cancelFetching();
                            });
                        }
                    });
                }
            }
        });
    }
}

export default TBAddress;
