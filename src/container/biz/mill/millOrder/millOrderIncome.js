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
        this.machineOrderCode = getQueryString('machineOrderCode', props.location.search);
    }
    componentDidMount() {
        this.props.getPageData();
    }
    render() {
        const fields = [{
            field: 'loginName',
            title: '购买用户',
            render(v, d) {
                return d.user && d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'name',
            title: '矿机名称'
        }, {
            field: 'buySymbol',
            title: '出矿币种'
        }, {
            field: 'incomeCountActual',
            title: '实际收益数量',
            render: function (v, data) {
                if(v) {
                    return moneyFormat(v.toString(), '', data.symbol);
                }else {
                    return '0';
                }
            }
        }, {
            field: 'incomeTimeActual',
            title: '实际收益时间',
            type: 'datetime'
        }, {
            field: 'status',
            title: '收益状态',
            type: 'select',
            data: [{
                key: '0',
                value: '待出'
            }, {
                key: '1',
                value: '已出'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'type',
            title: '收益类型',
            type: 'select',
            key: 'machine_income_type',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 610144,
            searchParams: {
                machineOrderCode: this.machineOrderCode
            },
            buttons: [{
                code: 'bank',
                name: '返回',
                handler: () => {
                    window.history.go(-1);
                }
            }]
        });
    }
}

export default MillOrderIncome;
