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
} from '@redux/accept/payment/payment';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    showWarnMsg
} from 'common/js/util';
import {
    SYS_USER
} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.acceptPayment,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Payment extends React.Component {
    render() {
        const fields = [{
            field: 'type',
            title: '收款类型',
            type: 'select',
            key: 'bank_card_type',
            search: true
        }, {
            field: 'currency',
            title: '币种'
        }, {
            field: 'realName',
            title: '户名'
        }, {
            field: 'bankcardNumber',
            title: '卡号',
            search: true
        }, {
            field: 'bankName',
            title: '名称'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                'key': '0',
                'value': '不可用'
            }, {
                'key': '1',
                'value': '可用'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 802025,
            deleteCode: 802021,
            searchParams: {
                userId: SYS_USER
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        let isAlipay = '0';
                        if (selectedRows[0].bankCode === 'alipay') {
                            isAlipay = '1';
                        }
                        this.props.history.push(`/accept/payment/addedit?code=${selectedRowKeys[0]}&isAlipay=${isAlipay}`);
                    }
                }
            }
        });
    }
}

export default Payment;
