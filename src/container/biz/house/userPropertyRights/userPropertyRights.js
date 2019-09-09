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
} from '@redux/house/userPropertyRights/userPropertyRights';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { Link } from 'react-router-dom';

@listWrapper(
    state => ({
        ...state.userPropertyRights,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class userPropertyRights extends React.Component {
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
            title: '产权名称',
            search: true
        }, {
            field: 'priceType',
            title: '购买方式',
            render: (v, d) => {
                console.log('symbolOutType', d);
                if(v === '1') {
                    return '币本位';
                }else {
                    return `金本位(${d.priceCurrency})`;
                }
            }
        }, {
            field: 'price',
            title: '单价'
        }, {
            field: 'totalCount',
            title: '花费币总额',
            render: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v.toString(), '', 'ETH')} (${data.symbolIn === 'TOSP_JIFEN' ? 'TOSP(积分)' : (data.symbolIn === 'JY' ? '间夜' : data.symbolIn)})`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'repayStatus',
            title: '回购状态',
            render: function (v, data) {
                if(v === '0') {
                    return '未回购';
                }else {
                    return '已回购';
                }
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'fpp_order_record_status',
            type: 'select',
            search: true
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610725',
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

export default userPropertyRights;
