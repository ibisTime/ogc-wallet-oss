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
} from '@redux/timerManager/timerPerformance/timerPerformance';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.timerPerformance,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class timerMonitor extends React.Component {
    render() {
        const fields = [{
            title: '名称',
            field: 'name'
        }, {
            title: '日期',
            field: 'createDate',
            type: 'date'
        }, {
            title: '任务数量',
            field: 'count'
        }, {
            title: '启动时间',
            field: 'startDatetime',
            type: 'datetime'
        }, {
            title: '结束时间',
            field: 'endDatetime',
            type: 'datetime'
        }, {
            title: '耗时（分）',
            field: 'consuming'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610591,
            searchParams: {
                orderColumn: 'create_date',
                orderDir: 'desc'
            },
            btnEvent: {
                timerLogInfo: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        console.log(selectedRows);
                        this.props.history.push(`/timerManager/timerPerformance/timerLogInfo?v=1&code=${selectedRows[0].id}`);
                    }
                }
            }
        });
    }
}

export default timerMonitor;
