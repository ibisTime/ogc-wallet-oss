import React from 'react';
import {Modal, Input, message, Form, Select} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/marketingManagement/welfare/notOrder';
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
        ...state.marketInvitedNotOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class NotOrder extends React.Component {
    render() {
        const fields = [{
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
            valueName: 'value'
        }, {
            title: '针对用户',
            field: 'userName',
            render(v, d) {
                return d.userInfo && d.userInfo.nickname + '-' + d.userInfo.loginName;
            }
        }, {
            field: 'userId',
            title: '针对用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
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
            title: '申请划转数量',
            field: 'amount'
        }, {
            title: '发放说明',
            field: 'bizNote'
        }, {
            title: '审核人',
            field: 'approveUserName'
        }, {
            title: '审核时间',
            field: 'approveDatetime',
            type: 'datetime'
        }];
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '806055',
                    singleSelect: false,
                    searchParams: {
                        status: '2'
                    }
                })
            }
        </div>;
    }
}

export default NotOrder;
