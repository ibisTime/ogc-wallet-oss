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
} from '@redux/trade/otclanguage/otclanguage';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.otclanguage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class otclanguage extends React.Component {
    render() {
        const fields = [{
            field: 'dvalue',
            title: '中文'
        }, {
            field: 'enDvalue',
            title: '英文'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            deleteCode: '630031',
            pageCode: '630035',
            searchParams: {
                parentKey: 'often_sentence'
                // type: 0
            }
        });
    }
}

export default otclanguage;
