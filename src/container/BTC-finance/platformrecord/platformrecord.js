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
} from '@redux/marketsettlement/platformrecord';
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
        ...state.PlatFormRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class PlatFormrecord extends React.Component {
    render() {
        const fields = [
            {
                field: 'bizType',
                title: '结算类型',
                type: 'select',
                search: 'true',
                data: [{
                    key: '0',
                    value: '营销结算'
                }],
                keyName: 'key',
                valueName: 'value'
            }, {
                field: 'type',
                title: '具体业务',
                type: 'select',
                search: 'true',
                data: [{
                    key: '0',
                    value: '划转结算'
                }],
                keyName: 'key',
                valueName: 'value'
            }, {
                title: '打币地址',
                field: 'payCardNo'
            }, {
                field: 'settleAmount',
                title: '结算数量'
            }];
        return this.props.buildList({
            fields,
            pageCode: 802830
        });
    }
}

export default PlatFormrecord;
