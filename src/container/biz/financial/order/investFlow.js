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
} from '@redux/biz/financial/investFlow';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getQueryString,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.bizInvestFlow,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class InvestFlow extends React.Component {
    constructor(props) {
        super(props);
        this.investCode = getQueryString('investCode', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '认购用户',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C',
                updater: ''
            },
            keyName: 'userId',
            valueName: '{{mobile.DATA}}--{{nickname.DATA}}',
            searchName: 'mobile',
            render: function (v, data) {
                return data.userInfo.nickname;
            },
            search: true
        }, {
            title: '认购用户手机号',
            field: 'mobile',
            render: function (v, data) {
                return data.userInfo.mobile;
            }
        }, {
            title: '产品名称',
            field: 'name',
            render: function (v, data) {
                return data.productInfo.name;
            }
        }, {
            title: '产品币种',
            field: 'symbol',
            render: function (v, data) {
                return data.productInfo.symbol;
            }
        }, {
            title: '认购金额',
            field: 'amount',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.productInfo.symbol);
            }
        }, {
            title: '认购预期收益',
            field: 'income',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.productInfo.symbol);
            }
        }, {
            title: '认购本金',
            field: 'principal',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.productInfo.symbol);
            }
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625530',
            searchParams: {
                investCode: this.investCode,
                type: '0'
            },
            buttons: [{
                code: 'userInvestFlow',
                name: '认购明细',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push('-1');
                    }
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default InvestFlow;