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
} from '@redux/TOKEN-finance/platformDivideHistory/platformDivideHistory';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.TOKENFinancePlatformDivideHistory,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class PlatformDivideHistory extends React.Component {
    render() {
        const fields = [{
            field: 'id',
            title: '分红id'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date',
            rangedate: ['dateEnd', 'dateEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            field: 'divideAmount',
            title: '分红总金额',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'divideProfit',
            title: '分红利润',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'divideDatetime',
            title: '分红时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802415',
            searchParams: {
                status: '1'
            }
        });
    }
}

export default PlatformDivideHistory;
