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
} from '@redux/biz/starLucky/starQuery';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarQuery extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'starName',
            title: '星球名称'
        }, {
            field: 'starId',
            title: '星球名称',
            search: true,
            type: 'select',
            pageCode: '640003',
            keyName: 'id',
            valueName: '{{name.DATA}}-{{symbol.DATA}}',
            searchName: 'starId',
            noVisible: true
        }, {
            field: 'batch',
            title: '场次'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'session_status'
        }, {
            field: 'date',
            title: '场次日期',
            type: 'date'
        }, {
            field: 'startTime',
            title: '开始时间'
        }, {
            field: 'endTime',
            title: '参与结束时间'
        }, {
            field: 'openDatetime',
            title: '开奖时间'
        }, {
            field: 'fitRate',
            title: '中奖人数比例'
        }, {
            field: 'randomRange',
            title: '中奖金额的随机数'
        }];
        return <div className="superNode-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '640030',
                    buttons: [{
                        code: 'starParticipate',
                        name: '参与记录',
                        handler: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/starLucky/starParticipate?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }, {
                        code: 'starBonusIncome',
                        name: '奖金收益',
                        handler: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/starLucky/starBonusIncome?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }]
                })
            }
        </div>;
    }
}

export default StarQuery;