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
} from '@redux/house/houseOrder/houseOrder';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { Link } from 'react-router-dom';

@listWrapper(
    state => ({
        ...state.houseOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class HouseOrder extends React.Component {
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
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
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
            field: 'name',
            title: '产权名称',
            search: true
        }, {
            field: 'price',
            title: '单价'
        }, {
            field: 'quantity',
            title: '购买数量'
        }, {
            field: 'totalCount',
            title: '花费币总额',
            render: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v, '', 'ETH')} (${data.symbolIn})`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'isDeduct',
            title: '是否抵扣',
            render: function (v, data) {
                if(v === '0') {
                    return '否';
                }else {
                    return '是';
                }
            }
        }, {
            field: 'deductCount',
            title: '抵扣金额',
            render: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v.toString(), '', 'ETH')} (${data.deductSymbol})`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'realCount',
            title: '实际支付金额'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610715',
            btnEvent: {
                benefitPlan: (selectedRowKeys) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/house/houseOrderIncome?minerOrderCode=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default HouseOrder;
