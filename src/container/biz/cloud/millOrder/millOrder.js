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
import {Modal} from 'antd';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat, showSucMsg } from 'common/js/util';
import { Link } from 'react-router-dom';
import fetch from 'common/js/fetch';

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
            field: 'machineCode',
            title: '水滴名称',
            type: 'select',
            pageCode: '610004',
            keyName: 'code',
            valueName: '{{name.DATA}}-{{code.DATA}}',
            searchName: 'machineCode',
            search: true,
            noVisible: true
        }, {
            field: 'machineName',
            title: '水滴名称',
            render(v, d) {
                return d.machine.name;
            }
        }, {
            field: 'symbol',
            title: '水滴购买币种'
        }, {
            field: 'amount',
            title: '每滴价格（CNY）'
        }, {
            field: 'quantity',
            title: '购买数量'
        }, {
            field: 'investCount1',
            title: '花费HEY总额',
            render: function (v, data) {
                if(v || v === 0) {
                    return moneyFormat(v.toString(), '', data.symbol);
                }else {
                    return '-';
                }
            }
        }, {
            field: 'investCount2',
            title: '花费BEDN总额',
            render: function (v, data) {
                if(v || v === 0) {
                    return moneyFormat(v.toString(), '', data.symbol);
                }else {
                    return '-';
                }
            }
        }, {
            field: 'incomeActualStr',
            title: '已获取收益',
            render: function (v, data) {
                if(v) {
                    return moneyFormat(v.toString(), '', 'HEY');
                }else {
                    return '-';
                }
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
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610104',
            singleSelect: false,
            btnEvent: {
                benefitPlan: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/cloud/millOrderIncome?machineOrderCode=${selectedRowKeys[0]}`);
                    }
                },
                speedUp: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定加速？`,
                            onOk: () => {
                                this.props.doFetching();
                                fetch(610109, {codeList: selectedRowKeys}).then(() => {
                                    showSucMsg('操作成功');
                                    this.props.cancelFetching();
                                    setTimeout(() => {
                                        this.props.getPageData();
                                    }, 1000);
                                }).catch(this.props.cancelFetching);
                            }
                        });
                    }
                }
            }
        });
    }
}

export default MillOrder;
