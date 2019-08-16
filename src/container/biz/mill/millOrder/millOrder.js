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
} from '@redux/mill/millOrder/millOrder';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { Link } from 'react-router-dom';

@listWrapper(
    state => ({
        ...state.millOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class MillOrder extends React.Component {
    render() {
        const fields = [{
            field: 'loginName',
            title: '购买用户',
            render(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            params: {
                limit: 1000
            },
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true
        }, {
            field: 'name',
            title: '矿机名称',
            search: true
        }, {
            field: 'price',
            title: '单价'
        }, {
            field: 'quantity',
            title: '购买数量'
        }, {
            field: 'investCount',
            title: '花费币总额',
            render: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v.toString(), '', data.buySymbol)} (${data.buySymbol})`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'incomeActualStr',
            title: '已获取收益',
            render: function (v) {
                if(v) {
                    return moneyFormat(v.toString(), '', 'WIS') + ' (' + 'WIS' + ')';
                }else {
                    return '0';
                }
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'miner_order_status',
            type: 'select',
            search: true
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610523',
            btnEvent: {
                benefitPlan: (selectedRowKeys) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/mill/millOrderIncome?minerOrderCode=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default MillOrder;
