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
import {formatDate, dateTimeFormat2} from 'common/js/util';

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
            title: '汇率来源',
            field: 'origin',
            type: 'select',
            key: 'rate_origin'
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
                today: () => {
                    this.props.history.push(`/quotation/legalTender`);
                }
            }
        });
    }
}

export default legalTender;
