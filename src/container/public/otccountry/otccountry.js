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
} from '@redux/public/otccountry';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.publicOtcCountry,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Otcpayment extends React.Component {
    render() {
        const fields = [{
            title: '编号',
            field: 'code'
        }, {
            title: '国际编号',
            field: 'interCode'
        }, {
            title: '中文名称',
            field: 'chineseName'
        }, {
            title: '英文名称',
            field: 'interName'
        }, {
            title: '国际简称',
            field: 'interSimpleCode'
        }, {
            title: '排序',
            field: 'orderNo'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '禁用'
            }, {
                key: '1',
                value: '启用'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 625311
        });
    }
}

export default Otcpayment;
