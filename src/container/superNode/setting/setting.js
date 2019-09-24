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
import {showWarnMsg, dateTimeFormat, moneyFormat, formatMoney, getQueryString} from 'common/js/util';
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
        this.state = {
            type: 'node_rate',
            isSelect: false,
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
    // 修改
    sendEdit = (selectedRowKeys, selectedRows) => {
        const {type} = this.state;
        if(type === 'node_rate') {
            this.props.history.push(`/superNode/setting/nodeRateEdit?v=2&code=1`);
        }else if(type === 'node_plan') {
            console.log('node_plan', selectedRows);
            fetch('630045', {type: 'node_plan'}).then(data => {
                console.log('node_plan', data);
            });
        }else if(type === 'node_redeem') {
            fetch('630045', {type: 'node_redeem'}).then(data => {
                console.log('node_redeem', data);
            });
        }else if(type === 'node_referee_rate') {
            fetch('630045', {type: 'node_referee_rate'}).then(data => {
                console.log('node_referee_rate', data);
            });
        }else if(type === 'node_tax_rate') {
            fetch('630045', {type: 'node_referee_rate'}).then(data => {
                console.log('node_referee_rate', data);
            });
        }
    }
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        const {type, isSelect} = this.state;
        return (
            <div className="superNode-listPage-wrapper">
                <div className="superNode-listPage-wrapper-tab-box">
                    <span className="superNode-listPage-wrapper-tab" onClick={this.setNodeRate}>分红比例配置</span>
                    <span className="superNode-listPage-wrapper-tab" onClick={this.setNodePlan}>节点周期配置</span>
                    <span className="superNode-listPage-wrapper-tab" onClick={this.setNodeRedeem}>赎回手续费配置</span>
                    <span className="superNode-listPage-wrapper-tab" onClick={this.setNodeRefereeRate}>推荐分红奖励配置</span>
                    <span className="superNode-listPage-wrapper-tab" onClick={this.setNodeTaxRate}>交税比例配置</span>
                </div>
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
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    console.log('selectedRows', selectedRows);
                                    const {type} = this.state;
                                    if(type === 'node_rate') {
                                        this.props.history.push(`/superNode/setting/nodeRateEdit?v=2&code=1`);
                                    }else if(type === 'node_plan') {
                                        this.props.history.push('/superNode/setting/edit?code=' + selectedRowKeys[0] + '&ctype=' + selectedRows[0].ckey);
                                    }else if(type === 'node_redeem') {
                                        fetch('630045', {type: 'node_redeem'}).then(data => {
                                            console.log('node_redeem', data);
                                        });
                                    }else if(type === 'node_referee_rate') {
                                        fetch('630045', {type: 'node_referee_rate'}).then(data => {
                                            console.log('node_referee_rate', data);
                                        });
                                    }else if(type === 'node_tax_rate') {
                                        fetch('630045', {type: 'node_referee_rate'}).then(data => {
                                            console.log('node_referee_rate', data);
                                        });
                                    }
                                }
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default Setting;
