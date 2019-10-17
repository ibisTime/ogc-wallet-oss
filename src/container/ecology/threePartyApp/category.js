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
} from '@redux/ecology/threePartyApp/category';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.ThreePartyAppCategory,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Category extends React.Component {
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
            rowKey: 'id',
            searchParams: {
                parentKey: 'dopen_app_category'
            }
        });
    }
}

export default Category;
