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
} from '@redux/biz/financial/investFlowAll';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizInvestFlowAll,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class InvestFlowAll extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.menu = getQueryString('menu', this.props.location.search);
        this.menuList = {
            'raise': '/bizFinancial/productsRaise',
            'raisefail': '/bizFinancial/productsRaisefail',
            'raiseSuccess': '/bizFinancial/productsRaiseSuccess',
            'repay': '/bizFinancial/productsRepay'
        };
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
            formatter: function (v, data) {
                return data.userInfo.nickname;
            },
            search: true
        }, {
            title: '认购用户手机号',
            field: 'mobile',
            formatter: function (v, data) {
                return data.userInfo.mobile;
            }
        }, {
            title: '产品名称',
            field: 'name',
            formatter: function (v, data) {
                return data.productInfo.nameZhCn;
            }
        }, {
            title: '产品币种',
            field: 'symbol',
            formatter: function (v, data) {
                return data.productInfo.symbol;
            }
        }, {
            title: '投资总金额',
            field: 'investAmount',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.productInfo.symbol);
            }
        }, {
            title: '投资次数',
            field: 'investNum'
        }, {
            title: '预期收益',
            field: 'expectIncome',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.productInfo.symbol);
            }
        }, {
            title: '实际到账收益',
            field: 'income',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.productInfo.symbol);
            }
        }, {
            title: '认购状态',
            field: 'status',
            type: 'select',
            key: 'invest_status',
            required: true,
            search: true
        }, {
            title: '最后认购时间',
            field: 'lastInvestDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625525',
            searchParams: {
              productCode: this.code
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
                        this.props.history.push('/bizFinancial/productsRaise/investFlow');
                    }
                },
                check: true
            }, {
                code: 'goBack',
                name: '返回',
                check: false,
                handler: () => {
                    this.props.history.push(this.menuList[this.menu]);
                }
            }]
        });
    }
}

export default InvestFlowAll;