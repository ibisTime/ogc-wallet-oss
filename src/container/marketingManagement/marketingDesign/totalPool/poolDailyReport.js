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
} from '@redux/marketingManagement/marketingDesign/poolDailyReport';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg,
    getCoinType,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.marketInvitedPoolDailyReport,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class PoolDailyReport extends React.Component {
    currency = getQueryString('currency');
    render() {
        const fields = [{
            title: '日期',
            field: 'createDate',
            type: 'date',
            search: true
        }, {
            title: '营销活动',
            field: 'type',
            type: 'select',
            key: 'pool_market_type'
        }, {
            title: '币种',
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
            title: '币种',
            field: 'currency1',
            render(v, d) {
                return d && d.currency;
            }
        }, {
            title: '发放总额',
            field: 'amount'
        }];
        return <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '806065',
                    searchParams: {
                        currency: this.currency
                    },
                    buttons: [{
                        code: 'goBack',
                        name: '返回',
                        handler: () => {
                            this.props.history.go(-1);
                        }
                    }, {
                        code: 'subsidiary',
                        name: '发放明细',
                        handler: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/marketingDesign/outInRecord?poolId=${selectedRowKeys[0]}`);
                            }
                        }
                    }, {
                        code: 'export',
                        name: '导出'
                    }]
                })
            }
        </div>;
    }
}

export default PoolDailyReport;
