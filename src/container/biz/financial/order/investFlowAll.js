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
    showSucMsg
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
            buttons: [{
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default InvestFlowAll;