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
} from '@redux/biz/starLucky/starIntoPool';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarIntoPool,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarIntoPool extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '630045',
                    searchParams: {
                        type: 'star'
                    },
                    buttons: [{
                        code: 'goBack',
                        name: '返回',
                        handler() {
                            window.history.go(-1);
                        }
                    }, {
                        code: 'edit',
                        name: '修改',
                        handler: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/starLucky/configuration/addedit?code=${selectedRowKeys[0]}&type=type_card&cType=${selectedRows[0].ckey}`);
                            }
                        }
                    }]
                })
            }
        </div>;
    }
}

export default StarIntoPool;