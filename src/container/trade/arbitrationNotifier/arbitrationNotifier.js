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
} from '@redux/trade/arbitrationNotifier/arbitrationNotifier';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.tradeArbitrationNotifier,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ArbitrationNotifier extends React.Component {
    render() {
        const fields = [{
            field: 'dvalue',
            title: '仲裁通知手机号'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            deleteCode: '630031',
            pageCode: '630035',
            searchParams: {
                parentKey: 'zc_sms_notice'
            }
        });
    }
}

export default ArbitrationNotifier;
