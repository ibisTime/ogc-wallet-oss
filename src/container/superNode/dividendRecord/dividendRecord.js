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
} from '@redux/superNode/dividendRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeDividendRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class DividendRecord extends React.Component {
    render() {
        const fields = [{
            field: 'dappCode',
            title: '应用',
            type: 'select',
            listCode: '625454',
            keyName: 'dappCode',
            valueName: 'name',
            search: true
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'amount',
            title: '数量',
            render(v, d) {
                return v && moneyFormat(v.toString(), '', d.symbol);
            }
        }, {
            field: 'bizNote',
            title: '业务说明'
        }, {
            field: 'createDatetime',
            title: '入池时间',
            type: 'datetime'
        }];
        return (<div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '610841',
                    searchParams: {
                        apiCode: '610840'
                    }
                })
            }
        </div>);
    }
}

export default DividendRecord;
