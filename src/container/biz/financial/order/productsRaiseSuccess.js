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
} from '@redux/biz/financial/productsRaiseSuccess';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizProductsRaiseSuccess,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ProductsRaiseSuccess extends React.Component {
    render() {
        const fields = [{
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625410',
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                        // } else if (selectedRows[0].status !== '1') {
                        //     showWarnMsg('当前记录不可修改');
                    } else {
                        this.props.history.push(`/biz/applicationList?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ProductsRaiseSuccess;