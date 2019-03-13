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
} from '@redux/user/channelDealerCommissions/channelDealerSettleHistory';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, dateFormat, showSucMsg} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';
import CommissionsSettlement from 'component/commissions-settlement/commissions-settlement';
import fetch from 'common/js/fetch';

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
class Userreward extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            search: true,
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
            title: '手机号/邮箱',
            render: (v, data) => {
                if (data.user) {
                    return data.user.email ? data.user.mobile + '-' + data.user.email : data.user.mobile + '-' + '';
                }
            }
            }, {
            field: 'currency',
            title: '币种'
        }, {
            field: 'count',
            title: '奖励总数量'
        }];
        return (<div>
            {this.props.buildList({
                fields,
                rowKey: 'id',
                pageCode: '802395',
                // searchParams: {
                //     userKind: 'C'
                // },
                btnEvent: {
                    reward: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            this.props.history.push(`/user/rewarddeatil`);
                        }
                    }
                }
            })}
        </div>);
    }
    }

    export
    default
    Userreward;
