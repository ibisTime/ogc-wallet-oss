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
            title: '国际代码',
            field: 'interCode'
        }, {
            title: '国旗图片',
            field: 'pic',
            type: 'img'
        }, {
            title: '中文名称',
            field: 'chineseName'
        }, {
            title: '国际名称',
            field: 'interName'
        }, {
            title: '国际简码',
            field: 'interSimpleCode'
        }, {
            title: '所属洲际',
            field: 'continent'
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
            valueName: 'value'
        }, {
            title: '展示次序',
            field: 'orderNo'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625311
        });
    }
}

export default Otcpayment;
