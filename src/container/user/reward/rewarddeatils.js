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
import {dateTimeFormat, getQueryString, showWarnMsg, dateFormat, showSucMsg} from 'common/js/util';
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
        this.buttons = [{
            name: '返回',
            handler: () => {
                this.props.history.go(-1);
            }
        }];
    }
    render() {
        const fields = [{
            field: 'realName',
            title: '用户',
            search: true
        }, {
            field: 'loginName',
            title: '手机号/邮箱',
            render: (v, data) => {
                if (data.loginName) {
                    return data.email ? data.loginName + '-' + data.email : data.loginName + '-' + '';
                }
            }
        }, {
            field: 'currency',
            title: '币种'
        }, {
            field: 'totalAward',
            title: '奖励总数量'
        }];
        return (<div>
            {this.props.buildList({
                fields,
                rowKey: 'id',
                pageCode: '802401',
                searchParams: {
                    userId: this.userId
                },
                buttons: this.buttons
            })}
        </div>);
    }
}

export
default
Rewarddeatil;
