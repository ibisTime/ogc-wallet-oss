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
} from '@redux/biz/starLucky/starLegacyRecords';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarLegacyRecords,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarLegacyRecords extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [{
            code: 'export',
            name: '导出'
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.go(-1);
            }
        }];
        this.poolId = getQueryString('poolId', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'count',
            title: '遗留数量',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '遗留时间',
            type: 'datetime'
        }, {
            field: 'updaterName',
            title: '操作人'
        }];
        return this.props.buildList({
            fields,
            pageCode: 806010,
            rowKey: 'id',
            buttons: this.buttons,
            searchParams: {
                poolId: this.poolId
            }
        });
    }
}

export default StarLegacyRecords;