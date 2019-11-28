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
} from '@redux/marketingManagement/marketingDesign/jackpotRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.marketInvitedJackpotRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class JackpotRecord extends React.Component {
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
        this.starName = sessionStorage.getItem('starName') || '';
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'count',
            title: '调额数量',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '调额时间',
            type: 'datetime'
        }, {
            field: 'updaterName',
            title: '操作人'
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    pageCode: 806000,
                    buttons: this.buttons,
                    searchParams: {
                        poolId: this.poolId
                    }
                })
            }
        </div>;
    }
}

export default JackpotRecord;