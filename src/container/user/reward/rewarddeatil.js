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
import {dateTimeFormat, getQueryString, showWarnMsg, dateFormat, showSucMsg, moneyFormat} from 'common/js/util';
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
class Rewarddeatil extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            direct: false
        };
    }
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
                    return data.user.mobile ? data.user.mobile + '-' + data.user.email : '-' + '' + data.user.email;
                } else if(data.user) {
                    return data.user.email ? data.user.mobile + '-' + data.user.email : data.user.mobile + '-' + '';
                }
            }
        }, {
            field: 'currency',
            title: '币种',
            render: (v, d) => v
        }, {
            field: 'count',
            render: (v, d) => {
             return moneyFormat(v, '', d.currency);
            },
            title: '奖励总数量'
        }];
        return (<div>
            {this.props.buildList({
                fields,
                rowKey: 'id',
                pageCode: '802395',
                // searchParams: {
                //     userId: this.userId
                // },
                buttons: []
            })}
        </div>);
    }
}

export
default
Rewarddeatil;
