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
} from '@redux/user/channelDealerCommissions/channelDealerSettleHistory';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, dateFormat, formatDate} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.userChannelDealerSettleHistory,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ChannelDealerSettleHistory extends React.Component {
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
            field: 'preUnSettleCount',
            title: '上个月未结算数量',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'preSettleCount',
            title: '上个月结算数量',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'preNoSettleCount',
            title: '上个月不结算数量',
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
                dataEnd: formatDate(new Date(), 'yyyy-MM-01')
            },
            btnEvent: {
                commissions: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/channelDealerSettleHistory/commissions`);
                    }
                }
            }
        });
    }
}

export default ChannelDealerSettleHistory;
