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
    getQueryString,
    dateFormat
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
        this.origin = getQueryString('origin', this.props.location.search);
        this.buttons = [{
            code: 'add',
            name: '新增',
            handler: (selectedRowKeys) => {
                this.props.history.push(`/starLucky/starQuery/add`);
            }
        }, {
            code: 'edit',
            name: '修改',
            handler: (selectedRowKeys) => {
                if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                    showWarnMsg('请选择一条记录');
                } else {
                    this.props.history.push(`/starLucky/starQuery/edit?code=${selectedRowKeys[0]}&isNot=1`);
                }
            }
        }, {
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
        }];
        if(this.origin === 'home') {
            this.buttons.unshift({
                code: 'goBack',
                name: '返回',
                handler: () => {
                    window.history.go(-1);
                }
            });
        }
    }
    render() {
        const fields = [{
            field: 'starName',
            title: '星球名称',
            render(v, d) {
                return v && `${v}(${d.symbol})`;
            }
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
            title: '场次',
            render(v, d) {
                return d ? `${d.symbol} ${dateFormat(d.date)} 第${d.batch}场` : '';
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'session_status'
        }, {
            field: 'startTime',
            title: '开始时间',
            render(v, d) {
                return (v || v === 0) && `${dateFormat(d.date)} ${v}:00:00`;
            }
        }, {
            field: 'endTime',
            title: '参与结束时间',
            render(v, d) {
                return (v || v === 0) && `${dateFormat(d.date)} ${v}:00:00`;
            }
        }, {
            field: 'openDatetime',
            title: '开奖时间',
            render(v, d) {
                return (v || v === 0) && `${dateFormat(d.date)} ${v}:00:00`;
            }
        }, {
            field: 'fitRate',
            title: '中奖人数比例'
        }, {
            field: 'randomRange',
            title: '中奖金额的随机数',
            render(v) {
                return v && `(0, ${v})`;
            }
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '640030',
                    buttons: this.buttons
                })
            }
        </div>;
    }
}

export default StarQuery;
