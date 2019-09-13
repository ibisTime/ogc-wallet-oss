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
} from '@redux/user/channelDealer/channelDealer-lowerLevelQuery';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, dateTimeFormat, moneyFormat} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.userChannelDealerLowerLevelQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ChannelDealerLowerLevelQuery extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '用户名',
            field: 'userName',
            render: (v, data) => {
                return data.realName ? data.realName : data.nickname;
            }
        }, {
            title: '手机号',
            field: 'mobile',
            search: true
        }, {
            title: '邮箱',
            field: 'email',
            search: true
        }, {
            title: '注册时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '交易总额',
            field: 'tradeCount',
            render: (v, data) => {
                return v === '0' ? '0' : moneyFormat(v, '', CION_FMVP);
            }
        }, {
            title: '交易佣金',
            field: 'tradeAwardCount',
            render: (v, data) => {
                return v === '0' ? '0' : moneyFormat(v, '', CION_FMVP);
            }
        }, {
            title: '注册佣金',
            field: 'regAwardCount',
            render: (v, data) => {
                return v === '0' ? '0' : moneyFormat(v, '', CION_FMVP);
            }
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: '802399',
            searchParams: {
                userId: this.userId
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                check: false,
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default ChannelDealerLowerLevelQuery;
