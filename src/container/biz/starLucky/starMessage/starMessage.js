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
} from '@redux/biz/starLucky/starMessage';
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
        ...state.starLuckyStarMessage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarLuckyStarMessage extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '名称'
        }, {
            field: 'symbol',
            title: '币种',
            search: true
        }, {
            field: 'updateName',
            title: '加入时间',
            type: 'datetime'
        }, {
            field: 'updateName',
            title: '操作人'
        }, {
            field: 'remark',
            title: '备注'
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

export default StarLuckyStarMessage;