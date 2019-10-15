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
} from '@redux/biz/starLucky/starLuckyUser';
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
        ...state.starLuckyStarLuckyUser,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarLuckyUser extends React.Component {
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
            title: '星球',
            search: true,
            type: 'select',
            pageCode: '640003',
            keyName: 'id',
            valueName: '{{name.DATA}}-{{symbol.DATA}}',
            searchName: 'starId',
            noVisible: true
        }, {
            field: 'starSymbol',
            title: '币种'
        }, {
            field: 'userId',
            title: '必中用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'userName',
            title: '必中用户'
        }, {
            field: 'createDatetime',
            title: '加入时间',
            type: 'datetime'
        }, {
            field: 'createrName',
            title: '操作人'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '640015',
            deleteCode: '640011'
        });
    }
}

export default StarLuckyUser;