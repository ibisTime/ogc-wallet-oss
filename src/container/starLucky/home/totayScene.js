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
} from '@redux/biz/starLucky/totayScene';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString,
    formatDate,
    dateFormat
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyTotayScene,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TotayScene extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'starName',
            title: '星球名称',
            render(v, d) {
                return v && `${v}(${d.symbol})`;
            }
        }, {
            field: 'batch',
            title: '场次'
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
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '640030',
            noSelect: true,
            searchParams: {
                date: formatDate(new Date())
            }
        });
    }
}

export default TotayScene;