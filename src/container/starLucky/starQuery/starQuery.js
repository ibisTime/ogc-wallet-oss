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
            field: 'name',
            title: '星球',
            search: true
        }, {
            field: 'userName',
            title: '场次'
        }, {
            field: 'userName1',
            title: '参与开始时间',
            type: 'datetime'
        }, {
            field: 'userName2',
            title: '参与结束时间',
            type: 'datetime'
        }, {
            field: 'userName3',
            title: '开奖时间',
            type: 'datetime'
        }, {
            field: 'userName4',
            title: '中奖人数百分比'
        }, {
            field: 'userName5',
            title: '中奖金额的随机数'
        }];
        return this.props.buildList({
            fields,
            pageCode: '623010',
            searchParams: {
                redPacketCode: this.code
            }
        });
    }
}

export default StarQuery;