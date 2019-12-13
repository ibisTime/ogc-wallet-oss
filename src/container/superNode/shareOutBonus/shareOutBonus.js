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
            title: '期数+分红批次'
            // render(v, d) {
            //     return v + d.batch;
            // }
        }, {
            field: 'batch',
            title: '期数',
            type: 'select',
            pageCode: '610601',
            keyName: 'batch',
            valueName: '第{{batch.DATA}}期',
            searchName: 'batch',
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
            search: true
        }, {
            field: 'snodeAmount',
            title: '起购数额',
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
            title: '成员总权重'
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
                        this.props.history.push(`/superNode/shareCustomer?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ShareOutBonus;