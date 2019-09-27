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
} from '@redux/superNode/setting';
import {listWrapper} from 'common/js/build-list';
import { Link } from 'react-router-dom';
import {showWarnMsg, showSucMsg, dateTimeFormat, moneyFormat, formatMoney, getQueryString} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.SuperNodeSetting,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Setting extends React.Component {
    constructor(props) {
        super(props);
        let tabType = sessionStorage.getItem('tabType');
        this.state = {
            type: tabType || 'node_rate',
            isSelect: tabType !== 'node_rate',
            nodeRateArr: []
        };
    }
    // 分红比例配置
    setNodeRate = () => {
        this.setState({
            type: 'node_rate',
            isSelect: false
        }, () => {
            this.props.getPageData();
        });
    }
    // 节点周期
    setNodePlan = () => {
        this.setState({
            type: 'node_plan',
            isSelect: true
        }, () => {
            this.props.getPageData();
        });
    }
    // 赎回手续费配置
    setNodeRedeem = () => {
        this.setState({
            type: 'node_redeem',
            isSelect: true
        }, () => {
            this.props.getPageData();
        });
    }
    // 推荐分红奖励
    setNodeRefereeRate = () => {
        this.setState({
            type: 'node_referee_rate',
            isSelect: true
        }, () => {
            this.props.getPageData();
        });
    }
    // 交税比例配置
    setNodeTaxRate = () => {
        this.setState({
            type: 'node_tax_rate',
            isSelect: true
        }, () => {
            this.props.getPageData();
        });
    }
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值',
            render: (v, data) => {
                if(data.type === 'node_plan' && data.id === 1) {
                    return v === '0' ? '否' : '是';
                }
                return v;
            }
        }];
        const {type, isSelect} = this.state;
        return (
            <div className="superNode-listPage-wrapper">
                <div className="superNode-listPage-wrapper-tab-box">
                    <a className="superNode-listPage-wrapper-tab" onClick={this.setNodeRate}>分红比例配置</a>
                    <a className="superNode-listPage-wrapper-tab" onClick={this.setNodePlan}>节点周期配置</a>
                    <a className="superNode-listPage-wrapper-tab" onClick={this.setNodeRedeem}>赎回手续费配置</a>
                    <a className="superNode-listPage-wrapper-tab" onClick={this.setNodeRefereeRate}>推荐分红奖励配置</a>
                    <a className="superNode-listPage-wrapper-tab" onClick={this.setNodeTaxRate}>交税比例配置</a>
                </div>
                <div style={{height: '30px'}}></div>
                {
                    this.props.buildList({
                        fields,
                        pageCode: 630045,
                        noSelect: !isSelect,
                        searchParams: {
                            type: type
                        },
                        buttons: [{
                            code: 'incomeRecord',
                            name: '修改',
                            handler: (selectedRowKeys, selectedRows) => {
                                    const {type} = this.state;
                                    if(type === 'node_rate') {
                                        this.props.history.push(`/superNode/setting/nodeRateEdit?v=2&code=1`);
                                    }else if(type === 'node_plan') {
                                        if (!selectedRowKeys.length) {
                                            showWarnMsg('请选择记录');
                                        } else if (selectedRowKeys.length > 1) {
                                            showWarnMsg('请选择一条记录');
                                        } else {
                                            this.props.history.push('/superNode/setting/edit?code=' + selectedRows[0].id + '&ctype=' + selectedRows[0].ckey + '&tp=' + type);
                                        }
                                    }else if(type === 'node_redeem') {
                                        if (!selectedRowKeys.length) {
                                            showWarnMsg('请选择记录');
                                        } else if (selectedRowKeys.length > 1) {
                                            showWarnMsg('请选择一条记录');
                                        } else {
                                            this.props.history.push('/superNode/setting/edit?code=' + selectedRows[0].id + '&ctype=' + selectedRows[0].ckey + '&tp=' + type);
                                        }
                                    }else if(type === 'node_referee_rate') {
                                        if (!selectedRowKeys.length) {
                                            showWarnMsg('请选择记录');
                                        } else if (selectedRowKeys.length > 1) {
                                            showWarnMsg('请选择一条记录');
                                        } else {
                                            this.props.history.push('/superNode/setting/edit?code=' + selectedRows[0].id + '&ctype=' + selectedRows[0].ckey + '&tp=' + type);
                                        }
                                    }else if(type === 'node_tax_rate') {
                                        if (!selectedRowKeys.length) {
                                            showWarnMsg('请选择记录');
                                        } else if (selectedRowKeys.length > 1) {
                                            showWarnMsg('请选择一条记录');
                                        } else {
                                            this.props.history.push('/superNode/setting/edit?code=' + selectedRows[0].id + '&ctype=' + selectedRows[0].ckey + '&tp=' + type);
                                        }
                                    }
                            }
                        }, {
                            code: 'manualStart',
                            name: '手动启动',
                            handler: (selectedRowKeys, selectedRows) => {
                                fetch(610600).then(data => {
                                    showSucMsg('操作成功!');
                                });
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default Setting;
