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
} from '@redux/rules/acceptRule/acceptRule';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.rulesAcceptRule,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class dailyActList extends React.Component {
    render() {
        const fields = [{
            field: 'symbolPair',
            title: '交易对',
            search: true
        }, {
            field: 'countOutTotal',
            title: '总兑出数量'
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'countOut',
            title: '实际兑出数量'
        }, {
            field: 'countIn',
            title: '兑入数量'
        }];
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'id',
                        pageCode: '620021',
                        buttons: [{
                            code: 'back',
                            name: '返回',
                            handler: () => {
                                this.props.history.go(-1);
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default dailyActList;
