import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/TOKEN-finance/gameOutQuery/gameOutQuery';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.TOKENFinanceGameOutQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GameOutQuery extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号'
        }, {
            title: '用户',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            params: {
                updater: ''
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return data.userInfo ? data.userInfo.nickname : '';
            }
        }, {
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                return data.userInfo ? data.userInfo.mobile : '';
            }
        }, {
            field: 'email',
            title: '邮箱',
            render: (v, data) => {
                return data.userInfo ? data.userInfo.email : '';
            }
        }, {
            title: '划转个数',
            field: 'count',
            render: (v, data) => {
                return moneyFormat(v, '', 'FMVP');
            }
        }, {
            title: '划转币种',
            field: 'currency'
        }, {
            title: '订单编号',
            field: 'gameTradeNo'
        }, {
            title: '日期',
            field: 'createDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '802705',
            searchParams: {
                bizType: 'game_out'
            }
        });
    }
}

export default GameOutQuery;
