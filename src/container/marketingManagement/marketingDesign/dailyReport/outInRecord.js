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
} from '@redux/marketingManagement/marketingDesign/outInRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.marketInvitedOutInRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class OutInRecord extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [{
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.go(-1);
            }
        }, {
            code: 'export',
            name: '导出'
        }];
        this.poolId = getQueryString('poolId', this.props.location.search);
        this.date = getQueryString('date', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'remark',
            title: '业务类型'
        }, {
            field: 'count',
            title: '数额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'createDatetime1',
            title: '时间',
            render: (v, data) => {
                return dateTimeFormat(data.createDatetime);
            }
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: 806020,
                    buttons: this.buttons,
                    searchParams: {
                        poolId: this.poolId,
                        createDatetimeStart: this.date,
                        createDatetimeEnd: this.date
                    }
                })
            }
        </div>;
    }
}

export default OutInRecord;