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
    getQueryString,
    dateFormat
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
    type = getQueryString('type');
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
                        currency: this.currency,
                        type: this.type
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
                        handler: (selectedRowKeys, rows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/marketingDesign/outInRecord?poolId=${rows[0].poolId}&date=${dateFormat(rows[0].createDate)}`);
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
