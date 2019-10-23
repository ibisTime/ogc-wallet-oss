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
} from '@redux/biz/quotation/legalTender';
import {listWrapper} from 'common/js/build-list';
import {formatDate, dateTimeFormat2, showWarnMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.legalTender,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class legalTender extends React.Component {
    render() {
        const fields = [{
            title: '币种',
            field: 'currency'
        }, {
            title: '参照币种',
            field: 'referCurrency'
        }, {
            title: '汇率',
            field: 'rate'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802035',
            searchParams: {
                startDatetime: formatDate(new Date()) + ' 00:00'
            },
            btnEvent: {
                history: () => {
                    this.props.history.push(`/quotation/legalTenderHistory`);
                },
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        console.log(selectedRows);
                        this.props.history.push(`/quotation/legalTender/edit?code=${selectedRows[0].id}&currency=${selectedRows[0].currency}&referCurrency=${selectedRows[0].referCurrency}&rate=${selectedRows[0].rate}`);
                    }
                }
            }
        });
    }
}

export default legalTender;
