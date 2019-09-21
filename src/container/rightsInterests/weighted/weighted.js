import React from 'react';
import {Modal, message, Form, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/rightsInterests/weighted/weighted';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.rightsInterestsWeighted,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsWeighted extends React.Component {
    render() {
        const fields = [{
            field: 'loginName',
            title: '收益人用户',
            render(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'userId',
            title: '收益人用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            params: {
                limit: 1000
            },
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true
        }, {
            title: '收益币种',
            field: 'symbol'
        }, {
            title: '收益数量',
            field: 'incomeCount',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            title: '权重',
            field: 'weight'
        }, {
            title: '收益类型',
            field: 'type',
            type: 'select',
            data: [{
                key: '0',
                value: '自我权重奖励'
            }, {
                key: '1',
                value: '团队权重奖励'
            }, {
                key: '2',
                value: '馈赠权重奖励'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '关联订单编号',
            field: 'refCode'
        }, {
            title: '收益状态',
            field: 'status',
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
            title: '创建时间',
            field: 'createTime',
            type: 'datetime'
        }, {
            title: '实际结算时间',
            field: 'settleTime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 805503
        });
    }
}

export default RightsInterestsWeighted;
