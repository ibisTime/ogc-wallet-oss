import React from 'react';
import {Modal, message, Form, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/rightsInterests/bonusPools/bonusPoolsRules';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.rightsInterestsBonusPoolsRules,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsBonusPoolsRules extends React.Component {
    code = getQueryString('code', this.props.location.search);
    render() {
        const fields = [{
            title: '币种',
            field: 'symbol'
        }, {
            title: '变动金额',
            field: 'count',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        // }, {
        //     title: '业务类型',
        //     field: 'bizType',
        //     type: 'select',
        //     key: 'pool_biz_type',
        //     search: true
        }, {
            title: '关联业务编号',
            field: 'refNo'
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 500023,
            searchParams: {
                dappId: this.code
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default RightsInterestsBonusPoolsRules;
