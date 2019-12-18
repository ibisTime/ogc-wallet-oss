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
} from '@redux/parkingSpace/parkingRecord/stickRecord';
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
        ...state.parkingSpaceStickRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StickRecord extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '贴条用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render(v, d) {
                return v && d.user ? `${d.user.nickname}-${d.user.loginName}` : '-';
            }
        }, {
            field: 'carCode',
            title: '车编号'
        }, {
            title: '贴条时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '贴条时间起',
            field: 'dateStart',
            type: 'datetime',
            search: true,
            noVisible: true
        }, {
            title: '贴条时间止',
            field: 'dateEnd',
            type: 'datetime',
            search: true,
            noVisible: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 200142
        });
    }
}

export default StickRecord;
