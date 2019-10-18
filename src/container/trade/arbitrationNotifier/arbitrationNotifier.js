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
} from '@redux/trade/arbitrationNotifier/arbitrationNotifier';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.tradeArbitrationNotifier,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ArbitrationNotifier extends React.Component {
    render() {
        const fields = [{
            field: 'type',
            title: '类型',
            type: 'select',
            data: [{
                key: '0',
                value: '申请通知人'
            }, {
                key: '1',
                value: '广播通知人'
            }, {
                key: '2',
                value: '预警通知人'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
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
            pageCode: '802895'
        });
    }
}

export default ArbitrationNotifier;
