import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/starLucky/starMessage';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString,
    getCoinList
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarMessage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarLuckyStarMessage extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '名称'
        }, {
            field: 'symbol',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            search: true
        }, {
            field: 'createDatetime',
            title: '加入时间',
            type: 'datetime'
        }, {
            field: 'createrName',
            title: '操作人'
        }];
        return <div className="superNode-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    pageCode: '640003',
                    deleteCode: '640001',
                    rowKey: 'id',
                    buttons: [{
                        code: 'luckyUser',
                        name: '必中用户',
                        handler: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/starLucky/starLuckyUser?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }, {
                        code: 'starJackpot',
                        name: '奖池查询',
                        handler: (selectedRowKeys, rowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/starLucky/starJackpot?symbol=${rowKeys[0].symbol}`);
                            }
                        }
                    }, {
                        code: 'starConfiguration',
                        name: '配置管理',
                        handler: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/starLucky/starConfiguration?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }, {
                        code: 'starRules',
                        name: '场次规则',
                        handler: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/starLucky/starRules?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }]
                })
            }
        </div>;
    }
}

export default StarLuckyStarMessage;