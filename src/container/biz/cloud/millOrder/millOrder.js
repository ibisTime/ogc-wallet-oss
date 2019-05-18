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
} from '@redux/cloud/millOrder/millOrder';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { Link } from 'react-router-dom';

@listWrapper(
    state => ({
        ...state.cloudMillOrder,
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
                return d.user && d.user.nickname + '-' + d.user.loginName;
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
            field: 'code',
            title: '矿机名称',
            type: 'select',
            pageCode: '610004',
            keyName: 'code',
            valueName: '{{name.DATA}}-{{code.DATA}}',
            searchName: 'code',
            search: true,
            noVisible: true
        }, {
            field: 'machineName',
            title: '矿机名称',
            render(v, d) {
                return d.machine.name;
            }
        }, {
            field: 'symbol',
            title: '矿机购买币种'
        }, {
            field: 'amount',
            title: '单个人民币价格'
        }, {
            field: 'quantity',
            title: '购买数量'
        }, {
            field: 'investAmount',
            title: '花费人民币总金额'
        }, {
            field: 'investCount',
            title: '花费币总额',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            field: 'incomeActual',
            title: '已获取收益',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'machine_order_status',
            type: 'select',
            search: true
        }, {
            field: 'continueFlag',
            title: '是否被连存',
            key: 'machine_order_continue_flag',
            type: 'select',
            search: true
        }, {
            field: 'continueStatus',
            title: '连存状态',
            key: 'machine_order_continue_status',
            type: 'select',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '610104',
            btnEvent: {
                benefitPlan: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/cloud/millOrderIncome?machineOrderCode=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default MillOrder;
