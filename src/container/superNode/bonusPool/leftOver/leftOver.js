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
} from '@redux/superNode/leftOver';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeLeftOver,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class leftOver extends React.Component {
    constructor(props) {
        super(props);
        this.poolId = getQueryString('poolId', this.props.location.search);
        this.buttons = [{
            name: '返回',
            handler: (param) => {
                this.props.history.go(-1);
            }
        }];
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'count',
            title: '数量',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'remark',
            title: '业务类型'
        }, {
            field: 'createDatetime',
            type: 'date',
            title: '创建时间'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 610830,
            searchParams: {
                poolId: this.poolId
            },
            buttons: this.buttons,
            noSelect: true
        });
    }
}

export default leftOver;
