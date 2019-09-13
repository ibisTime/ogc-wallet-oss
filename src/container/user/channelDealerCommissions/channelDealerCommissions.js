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
} from '@redux/user/channelDealerCommissions/channelDealerCommissions';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, dateFormat} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.userChannelDealerCommissions,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ChannelDealerCommissions extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '渠道商',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'Q'
            },
            keyName: 'userId',
            valueName: '{{realName.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            },
            search: true
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
            field: 'settleCount',
            title: '结算金额',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'unsettleCount',
            title: '未结算金额',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'nosettleCount',
            title: '不结算金额',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'nextUnsettleCount',
            title: '下月未结算数量',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'date',
            title: '时间',
            render: (v, data) => {
                return dateFormat(data.startDate) + '至' + dateFormat(data.endDate);
            }
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802396',
            searchParams: {
                userKind: 'Q',
                status: ''
            },
            btnEvent: {
                checklist: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/channelDealerCommissions/checklist`);
                    }
                }
            }
        });
    }
}

export default ChannelDealerCommissions;
