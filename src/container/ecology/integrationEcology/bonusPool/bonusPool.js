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
} from '@redux/ecology/integrationEcology/bonusPool/bonusPool';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.IntegrationEcologyBonusPool,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BonusPool extends React.Component {
    render() {
        const fields = [{
            field: 'dappname',
            title: '应用名称',
            render: (v, data) => {
                return data.openDapp.name;
            }
        }, {
            field: 'dappId',
            title: '应用',
            type: 'select',
            pageCode: '625455',
            keyName: 'id',
            valueName: '{{name.DATA}}',
            searchName: 'name',
            noVisible: true,
            search: true
        }, {
            field: 'symbol',
            title: '币池',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            render: (v, data) => v,
            search: true
        }, {
            field: 'count',
            title: '余额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'countOut',
            title: '累计出',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'countIn',
            title: '累计进',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '加入时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625033,
            rowKey: 'id',
            searchParams: {
            },
            btnEvent: {
                // 进池记录
                getIntoRecord: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/integrationEcology/bonusPoolRecord?direction=1&dappPoolId=${selectedRows[0].id}`);
                    }
                },
                // 出池记录
                getOutRecord: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/integrationEcology/bonusPoolRecord?direction=0&dappPoolId=${selectedRows[0].id}`);
                    }
                }
            }
        });
    }
}

export default BonusPool;