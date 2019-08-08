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
} from '@redux/biz/quotation/legalTenderHistory';
import {listWrapper} from 'common/js/build-list';
import {formatDate, dateTimeFormat2} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.legalTenderHistory,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class legalTenderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [];
        this.buttons = [{
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.push(`/quotation/legalTender`);
            }
        }];
    }
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
            type: 'date',
            search: true
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802035',
            buttons: this.buttons
        });
    }
}

export default legalTenderHistory;
