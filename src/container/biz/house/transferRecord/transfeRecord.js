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
} from '@redux/house/transferRecord/transfeRecord';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import {Modal, message, Input} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.transfeRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class propertyRight extends React.Component {
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
            field: 'fromCurrency',
            title: '转入币种'
        }, {
            field: 'toCurrency',
            title: '转出币种'
        }, {
            field: 'amount',
            title: '金额',
            render: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v.toString(), '', 'ETH')}`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'realAmount',
            title: '实际金额',
            render: function (v, data) {
                if(v || v === 0) {
                    return `${moneyFormat(v.toString(), '', 'ETH')}`;
                }else {
                    return '-';
                }
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'transfer_order_status',
            type: 'select'
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'datetime'
        }];
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610775,
                        deleteCode: '610751',
                        btnEvent: {
                            examine: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/house/transferRecord/examine?v=1&code=${selectedRows[0].code}`);
                                }
                            }
                        }
                    })
                }
            </div>
        );
    }
}

export default propertyRight;
