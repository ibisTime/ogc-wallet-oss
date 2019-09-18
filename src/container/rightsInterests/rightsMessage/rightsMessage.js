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
} from '@redux/rightsInterests/rightsMessage/rightsMessage';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.rightsInterestsRightsMessage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsRightsMessage extends React.Component {
    render() {
        const fields = [{
            title: '序号',
            field: 'orderNo'
        }, {
            title: '名称',
            field: 'name',
            search: true
        }, {
            title: '图标',
            field: 'icon',
            type: 'img'
        }, {
            title: '点击执行动作',
            field: 'action'
        }, {
            title: '点击执行路径',
            field: 'url'
        }, {
            title: '更新人',
            field: 'updaterName'
        }, {
            title: '更新时间',
            field: 'updateTime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 805423,
            deleteCode: '805421'
        });
    }
}

export default RightsInterestsRightsMessage;
