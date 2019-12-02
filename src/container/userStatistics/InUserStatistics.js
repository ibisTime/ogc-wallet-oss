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
} from '@redux/userStatistics/InUserStatistics';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.InUserStatistics,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class timerMonitor extends React.Component {
    constructor(props) {
        super(props);
        this.userAccountNumber = getQueryString('userAccountNumber', this.props.location.search);
        this.buttons = [];
        this.buttons = [{
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.go(-1);
            }
        }];
    }
    render() {
        const fields = [{
            field: 'createDatetime',
            title: '发生时间',
            type: 'datetime'
        }, {
            field: 'transAmountString',
            title: '变动金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'preAmountString',
            title: '变动前金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'postAmountString',
            title: '变动后金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'bizNote',
            title: '业务类型'
        }, {
            field: 'refNo',
            title: '关联订单号'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 802327,
            searchParams: {
                accountNumber: this.userAccountNumber,
                status: '3'
            },
            buttons: this.buttons
        });
    }
}

export default timerMonitor;
