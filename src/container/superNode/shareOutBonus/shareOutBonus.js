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
} from '@redux/superNode/shareOutBonus';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeShareOutBonus,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ShareOutBonus extends React.Component {
    render() {
        const fields = [{
            field: 'divideBatch',
            title: '期数+分红批次',
            render(v, d) {
                return `第${d.nodePlanBatch}期节点计划，第${d.divideBatch}次分红`;
            }
        }, {
            field: 'batch',
            title: '期数',
            type: 'select',
            listCode: '610642',
            keyName: 'batch',
            valueName: '{{planName.DATA}}',
            search: true,
            noVisible: true
        }, {
            field: 'poolAmount',
            title: '分红池',
            render: (v, d) => {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'snodeCode',
            title: '节点',
            pageCode: '610610',
            type: 'select',
            keyName: 'code',
            valueName: '{{nodePlanName.DATA}}-{{orderNo.DATA}}号节点',
            searchName: 'orderNo',
            search: true,
            noVisible: true
        }, {
            field: 'orderNo',
            title: '节点',
            render(v, d) {
                return v && `第${v}号节点`;
            }
        }, {
            field: 'snodeAmount',
            title: '节点投票数',
            render: (v, d) => {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'snodeDivedeAmount',
            title: '分红额',
            render: (v, d) => {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'snodeTotalWeights',
            title: '成员总权重',
            render: (v, d) => {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '生成时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610691,
            rowKey: 'id',
            btnEvent: {
                userDivided: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/superNode/shareCustomer?code=${selectedRowKeys[0]}&nodePlanBatch=${selectedRows[0].nodePlanBatch}&divideBatch=${selectedRows[0].divideBatch}&orderNo=${selectedRows[0].orderNo}`);
                    }
                }
            }
        });
    }
}

export default ShareOutBonus;