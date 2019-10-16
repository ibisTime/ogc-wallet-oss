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
} from '@redux/biz/starLucky/starRecordRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarRecordRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarRecordRecord extends React.Component {
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
        this.direction = getQueryString('direction', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            render: (v, data) => v,
            search: true
        }, {
            field: 'bizType',
            title: '业务类型'
        }, {
            field: 'count',
            title: '数额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'createDatetime1',
            title: '时间',
            render: (v, data) => {
                return dateTimeFormat(data.createDatetime);
            }
        }, {
            field: 'createDatetime',
            title: '时间',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            noVisible: true,
            search: true
        }];
        return <div className="superNode-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: 806020,
                    buttons: this.buttons,
                    searchParams: {
                        direction: this.direction,
                        poolId: this.poolId
                    }
                })
            }
        </div>;
    }
}

export default StarRecordRecord;