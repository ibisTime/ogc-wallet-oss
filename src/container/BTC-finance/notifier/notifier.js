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
} from '@redux/BTC-finance/notifier/notifier';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.notifier,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class notifier extends React.Component {
    render() {
        const fields = [{
            title: '类型',
            field: 'type'
        }, {
            title: '通知时间',
            field: 'startDate'
        }, {
            title: '通知人',
            field: 'name'
        }, {
            title: '通知手机号',
            field: 'phone'
        }];
        return this.props.buildList({
            fields,
            deleteCode: '802891',
            pageCode: '802895'
        });
    }
}

export default notifier;
