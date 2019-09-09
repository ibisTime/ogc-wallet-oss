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
} from '@redux/house/profit/profit';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import {Modal, message, Input} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;
const levelData = {
    '-1': '普通用户',
    '1': 'L1节点',
    '2': 'L2节点',
    '3': 'L3节点',
    '4': 'L4节点',
    '5': 'L5节点',
    '6': 'L6节点'
};
@listWrapper(
    state => ({
        ...state.profit,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class profit extends React.Component {
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
            field: 'symbol',
            title: '币种',
            render: function (v, data) {
                return `${v === 'TOSP_JIFEN' ? 'TOSP(积分)' : (v === 'JY' ? '间夜' : v)}`;
            }
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'fpp_income_type',
            search: true
        }, {
            field: 'nodeLevel',
            title: '节点等级',
            type: 'select',
            key: 'user_node_level_fpp',
            render(v, d) {
                return levelData[v];
            }
        }, {
            field: 'incomeCountExpect',
            title: '预计收益',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'incomeCountTax',
            title: '税费',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'incomeCountTaxFee',
            title: '税率'
        }, {
            field: 'incomeCountReal',
            title: '实际收益',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'fpp_income_status',
            search: true
        }, {
            field: 'settleDatetime',
            title: '结算时间',
            type: 'datetime'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610735,
                        btnEvent: {
                            detail: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/house/profit/addedit?v=1&code=${selectedRows[0].id}`);
                                }
                            }
                        }
                    })
                }
            </div>
        );
    }
}

export default profit;
