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
} from '@redux/businessmenManager/paymentRules/paymentRules';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.paymentRules,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class paymentRules extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值',
            render(v, data) {
                if(data.ckey === 'fee_location') {
                    if (v === '0') {
                        return '取现金额中';
                    }else {
                        return '余额中';
                    }
                }else{
                    return v;
                }
            }
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630045',
            searchParams: {
                type: 'xxzf'
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/businessmenManager/paymentRules/edit?code=${selectedRowKeys[0]}&ckey=${selectedRows[0].ckey}`);
                    }
                }
            }
        });
    }
}

export default paymentRules;
