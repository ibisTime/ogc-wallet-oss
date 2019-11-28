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
} from '@redux/marketingManagement/marketingDesign/recordRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.marketInvitedRecordRecords,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RecordRecord extends React.Component {
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
        this.direction = getQueryString('direction', this.props.location.search);
        this.starName = sessionStorage.getItem('starName') || '';
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            key: 'pool_biz_type'
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
        }, {
            field: 'createDatetime',
            title: '时间',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            noVisible: true,
            search: true
        }, {
            field: 'remark',
            title: '说明'
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: 806020,
                    buttons: this.buttons,
                    searchParams: {
                        direction: this.direction,
                        poolId: this.poolId
                    }
                })
            }
        </div>;
    }
}

export default RecordRecord;