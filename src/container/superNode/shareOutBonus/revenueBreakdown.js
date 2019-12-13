import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/superNode/revenueBreakdown';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeRevenueBreakdown,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RevenueBreakdown extends React.Component {
    render() {
        const fields = [{
            field: 'divideBatch',
            title: '期数+分红批次',
            value: '1231期数+分红批次'
        }, {
            field: 'snodeCode',
            title: '节点',
            value: '节点'
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            search: true,
            searchName: 'keyword',
            noVisible: true
        }, {
            field: 'userName',
            title: '用户'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'snode_income_type'
        }, {
            field: 'userDivideAmount',
            title: '收益数量'
        }, {
            field: 'userDivideAmount1',
            title: '税金'
        }, {
            field: 'userDivideAmount2',
            title: '获得分红'
        }, {
            field: 'status',
            title: '结算状态',
            type: 'select',
            key: 'snode_income_status'
        }, {
            field: 'createDatetime',
            title: '生产时间',
            type: 'datetime'
        }, {
            field: 'createDatetime1',
            title: '领取时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610680,
            rowKey: 'id',
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }, {
                code: 'export',
                name: '导出'
            }]
        });
    }
}

export default RevenueBreakdown;