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
} from '@redux/marketingManagement/marketingDesign/rewardSubsidiary';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg,
    getCoinType
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.marketInvitedRewardSubsidiary,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RewardSubsidiary extends React.Component {
    render() {
        const fields = [{
            title: '用户',
            field: 'userName',
            render(v, d) {
                return d.userInfo && d.userInfo.nickname + '-' + d.userInfo.loginName;
            }
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'type',
            title: '活动类型',
            type: 'select',
            data: [{
                key: '1',
                value: '注册送'
            }, {
                key: '2',
                value: '邀请送'
            }, {
                key: '3',
                value: '充值送'
            }, {
                key: '4',
                value: '空投'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '活动币种',
            field: 'currency',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            search: true,
            noVisible: true
        }, {
            title: '活动币种',
            field: 'currency1',
            render(v, d) {
                return d && d.currency;
            }
        }, {
            title: '奖励数量',
            field: 'amount'
        }, {
            title: '发放时间',
            field: 'approveDatetime',
            type: 'datetime'
        }, {
            title: '发放说明',
            field: 'bizNote'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '待领取'
            }, {
                key: '1',
                value: '待审核'
            }, {
                key: '2',
                value: '已发放'
            }, {
                key: '3',
                value: '审核失败'
            }],
            keyName: 'key',
            valueName: 'value'
        }];
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '806055',
                    singleSelect: false
                })
            }
        </div>;
    }
}

export default RewardSubsidiary;
