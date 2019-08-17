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
} from '@redux/mill/millOrder/millOrderIncome';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, getQueryString, moneyFormat } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.millOrderIncome,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class MillOrderIncome extends React.Component {
    constructor(props) {
        super(props);
        this.minerOrderCode = getQueryString('minerOrderCode', props.location.search);
    }
    componentDidMount() {
        this.props.getPageData();
    }
    render() {
        const fields = [{
            field: 'loginName',
            title: '收益用户',
            render(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'name',
            title: '矿机名称',
            render(v, d) {
                return d.miner && d.miner.name;
            }
        }, {
            field: 'incomeCount',
            title: '实际收益数量',
            render: function (v, data) {
                if(v) {
                    return `${moneyFormat(v.toString(), '', data.symbol)} (${data.symbol})`;
                }else {
                    return '0';
                }
            }
        }, {
            field: 'incomeTime',
            title: '收益时间',
            type: 'datetime'
        }, {
            field: 'status',
            title: '收益状态',
            type: 'select',
            data: [{
                key: '0',
                value: '未结算'
            }, {
                key: '1',
                value: '已结算'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'type',
            title: '收益类型',
            type: 'select',
            key: 'miner_income_type',
            search: true
        }];
        return this.props.buildList({
            rowKey: 'id',
            fields,
            pageCode: 610543,
            searchParams: {
                minerOrderCode: this.minerOrderCode
            },
            buttons: [{
                code: 'bank',
                name: '返回',
                handler: () => {
                    this.props.history.goBack();
                }
            }]
        });
    }
}

export default MillOrderIncome;
