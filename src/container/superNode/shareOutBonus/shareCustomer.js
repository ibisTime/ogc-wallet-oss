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
} from '@redux/superNode/shareCustomer';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeShareCustomer,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ShareCustomer extends React.Component {
    render() {
        const fields = [{
            field: 'divideBatch',
            title: '期数+分红批次',
            value: '1231期数+分红批次'
        }, {
            field: 'snodeCode',
            title: '节点',
            value: '节点'
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            search: true,
            searchName: 'keyword',
            noVisible: true
        }, {
            field: 'userName',
            title: '用户'
        }, {
            field: 'userWeights',
            title: '个人权重'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'userDivideAmount',
            title: '收益总额',
            render: (v, d) => {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '生产时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610695,
            rowKey: 'id',
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }, {
                code: 'symx',
                name: '收益明细',
                handler: (selectedRowKeys) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/superNode/revenueBreakdown?code=${selectedRowKeys[0]}`);
                    }
                }
            }]
        });
    }
}

export default ShareCustomer;