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
} from '@redux/TOKEN-finance/specialRewardHistory/specialRewardHistory';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, dateFormat} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.TOKENFinanceSpecialRewardHistory,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SpecialRewardHistory extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            }
        }, {
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                return data.user ? data.user.mobile : '-';
            }
        }, {
            field: 'email',
            title: '邮箱',
            render: (v, data) => {
                return data.user ? data.user.email : '-';
            }
        }, {
            field: 'userKind',
            title: '用户类型',
            type: 'select',
            data: [{
                'key': 'C',
                'value': '会员'
            }, {
                'key': 'Q',
                'value': '渠道商'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'count',
            title: '佣金',
            coin: CION_FMVP,
            coinAmount: true
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
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802395',
            searchParams: {
                status: '1',
                refType: '4'
            },
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/TOKEN-finance/specialRewardHistory/addedit?isDetail=1&v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default SpecialRewardHistory;
