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
} from '@redux/biz/starLucky/starBonusIncome';
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
        ...state.starLuckyStarBonusIncome,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarBonusIncome extends React.Component {
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
            title: '用户'
        }, {
            field: 'userName2',
            title: '奖金类型'
        }, {
            field: 'userName3',
            title: '数额'
        }, {
            field: 'userName4',
            title: '币种'
        }, {
            field: 'userName5',
            title: '状态'
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

export default StarBonusIncome;