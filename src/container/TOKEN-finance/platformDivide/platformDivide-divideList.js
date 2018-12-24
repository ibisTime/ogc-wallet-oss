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
} from '@redux/TOKEN-finance/platformDivide/platformDivide-divideList';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.TOKENFinancePlatformDivideDivideList,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class PlatformDivideDivideList extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('code', this.props.location.search);
        this.buttons = [];
        this.buttons = [{
            code: 'export',
            name: '导出'
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.push(`/TOKEN-finance/platformDivide`);
            }
        }];
    }

    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
                return data.userInfo ? data.userInfo.nickname : '-';
            }
        }, {
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                return data.userInfo ? data.userInfo.mobile : '-';
            }
        }, {
            field: 'amount',
            title: '当时余额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'currency',
            title: '币种'
        }, {
            field: 'diviAmount',
            title: '分红金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'diviDatetime',
            title: '分红时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: '802416',
            searchParams: {
                divideId: this.code
            },
            buttons: this.buttons
        });
    }
}

export default PlatformDivideDivideList;
