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
} from '@redux/biz/store/shopLabels';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.storeShopLabels,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ShopLabels extends React.Component {
    render() {
        const fields = [{
            field: 'dvalue',
            title: '类别'
        }, {
            field: 'updater',
            title: '修改人'
        }, {
            field: 'updateDatetime',
            title: '修改时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630035,
            deleteCode: 630031,
            rowKey: 'id',
            searchParams: {
                parentKey: 'mall_product_tag'
            }
        });
    }
}

export default ShopLabels;
