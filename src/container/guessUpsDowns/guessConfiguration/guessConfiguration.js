import React from 'react';
import { Tabs } from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/guessUpsDowns/guessConfiguration';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessConfiguration,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GuessConfiguration extends React.Component {
    state = {
        activeKey: sessionStorage.getItem('activeKey') || 'betting_fee'
    };
    callback = (ev) => {
        const target = ev.target;
        const activeKey = target.getAttribute('data-key');
        if(activeKey) {
            sessionStorage.setItem('activeKey', activeKey);
            this.setState({
                activeKey
            }, () => {
                this.props.getPageData();
            });
        }
    };
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        const {activeKey} = this.state;
        return <div className="guessUpsDowns-listPage-wrapper">
            <div className="superNode-listPage-header" onClick={this.callback}>
                <span className={activeKey === 'betting_fee' ? 'set_config' : ''} data-key="betting_fee">手续费规则</span>
                <span className={activeKey === 'open_time' ? 'set_config' : ''} data-key="open_time">猜涨跌时间</span>
                <span className={activeKey === 'kline_trade' ? 'set_config' : ''} data-key="kline_trade">k线规则</span>
                <span className={activeKey === 'betting_plat_dist' ? 'set_config' : ''} data-key="betting_plat_dist">平台抽成</span>
                <span className={activeKey === 'betting_divide' ? 'set_config' : ''} data-key="betting_divide">团队分成</span>
                <span className={activeKey === 'other' ? 'set_config' : ''} data-key="other">其他配置</span>
            </div>
            <div>
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'id',
                        pageCode: '630045',
                        searchParams: {
                            type: activeKey
                        },
                        buttons: [{
                            code: 'edit',
                            name: '修改',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/configuration/addedit?code=${selectedRowKeys[0]}&type=type_card&cType=${selectedRows[0].ckey}`);
                                }
                            }
                        }]
                    })
                }
            </div>
        </div>;
    }
}

export default GuessConfiguration;
