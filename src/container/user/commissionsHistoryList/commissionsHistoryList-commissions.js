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
} from '@redux/user/commissionsHistoryList/commissionsHistoryList-commissions';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat, dateTimeFormat} from 'common/js/util';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.userCommissionsHistoryListCommissions,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CommissionsHistoryListCommissions extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search) || 'U201809132051177878296';
        this.buttons = [];
        this.buttons = [{
            code: 'export',
            name: '导出'
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.push(`/user/commissionsHistoryList`);
            }
        }];
    }

    render() {
        const fields = [{
            field: 'count',
            title: '佣金',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'currency',
            title: '币种'
        }, {
            field: 'refType',
            title: '佣金类型',
            type: 'select',
            key: 'award_ref_type'
        }, {
            field: 'refNote',
            title: '佣金说明'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                key: '0',
                value: '待结算'
            }, {
                key: '1',
                value: '已结算'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '产生时间',
            type: 'date',
            rangedate: ['dateStart', 'dateEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            field: 'handleDatetime',
            title: '结算时间',
            type: 'datetime'
        }, {
            field: 'refCode',
            title: '关联单号'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: '802395',
            searchParams: {
                userId: this.userId,
                userKind: 'C'
            },
            buttons: this.buttons
        });
    }
}

export default CommissionsHistoryListCommissions;
