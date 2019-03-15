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
} from '@redux/trade/notifierofwithdrawal/notifierofwithdrawal';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.NotifierofWithdrawal,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Notifierofwithdrawal extends React.Component {
    render() {
        const fields = [{
            title: '通知时间',
            render: (v, data) => {
                return data ? data.startDate + '点-' + data.endDate + '点' : '';
            }
        }, {
            field: 'name',
            title: '通知人'
        }, {
            field: 'phone',
            title: '通知手机号'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            deleteCode: '802891',
            pageCode: '802895',
            searchParams: {
                // parentKey: 'zc_sms_notice'
                type: 0
            }
        });
    }
}

export default Notifierofwithdrawal;
