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
} from '@redux/user/historyDivideList/historyDivideList';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.userHistoryDivideList,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class HistoryDivideList extends React.Component {
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
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                'key': '0',
                'value': '待分红'
            }, {
                'key': '1',
                'value': '已分红'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802415',
            btnEvent: {
                divideList: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/historyDivideList/divideList`);
                    }
                },
                divide: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是待分红的状态');
                    } else {
                        this.props.history.push(`/user/historyDivideList/divide?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default HistoryDivideList;
