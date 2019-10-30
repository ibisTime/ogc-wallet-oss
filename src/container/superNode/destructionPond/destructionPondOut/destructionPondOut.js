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
} from '@redux/superNode/destructionPondOut';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.destructionPondOut,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class destructionPondOut extends React.Component {
    isGetPage = true;
    timer = null;
    shouldComponentUpdate(nextProps) {
        if(nextProps.setTab !== this.props.setTab && nextProps.setTab === '2') {
            if(this.isGetPage) {
                this.isGetPage = false;
                this.props.getPageData();
                if(this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.isGetPage = true;
                }, 1000);
            }
        }
        return true;
    }
    componentWillUnmount() {
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }
    render() {
        const fields = [{
            field: 'createDatetime',
            title: '入池时间',
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
        }, {
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
            render: (v, data) => v
        }, {
            field: 'count',
            title: '数额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610670,
            rowKey: 'id',
            noSelect: true,
            searchParams: {
                direction: '0',
                poolType: 'snodeDestroy'
            }
        });
    }
}

export default destructionPondOut;
