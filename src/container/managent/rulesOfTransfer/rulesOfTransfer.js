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
} from '@redux/managent/rulesOfTransfer/rulesOfTransfer';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.rulesOfTransfer,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class rulesOfTransfer extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '应用名称',
            _keys: ['openDapp', 'name']
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'withdrawMin',
            title: '单笔最小值'
        }, {
            field: 'withdrawStep',
            title: '划转步长'
        }, {
            field: 'withdrawMax',
            title: '单笔最大值'
        }, {
            field: 'withdrawLimit',
            title: '每人每日划转上限'
        }, {
            field: 'withdrawFee',
            title: '手续费类型',
            type: 'select',
            key: 'withdraw_fee_type'
        }, {
            field: 'withdrawFee',
            title: '手续费'
        }, {
            field: 'withdrawFeeTakeLocation',
            title: '手续费扣减位置',
            type: 'select',
            key: 'withdraw_fee_take_location'
        }, {
            field: 'withdrawRule',
            title: '提币规则文本'
        }];
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'id',
                        pageCode: 625845
                    })
                }
            </div>
        );
    }
}

export default rulesOfTransfer;
