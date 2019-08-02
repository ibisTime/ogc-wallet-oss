import React from 'react';
import {Modal, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/timerManager/timerMonitor/timerMonitor';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.timerMonitor,
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
            title: '触发器名称',
            field: 'jobDetailName',
            search: true
        }, {
            title: 'cron表达式',
            field: 'jobCronExpression'
        }, {
            title: '下次触发时间',
            field: 'nextTriggerTime',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610590'
        });
    }
}

export default timerMonitor;
