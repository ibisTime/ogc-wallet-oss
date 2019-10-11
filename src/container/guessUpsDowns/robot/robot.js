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
} from '@redux/guessUpsDowns/robot';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getCoinList, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsRobot,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Robot extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '机器人',
            search: true
        }, {
            field: 'symbol',
            title: '针对币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            search: true
        }, {
            field: 'balanceAmount',
            title: '账户余额'
        }, {
            field: 'conditionsRate',
            title: '条件赔率'
        }, {
            field: 'betRate',
            title: '下注赔率'
        }, {
            field: 'betResult',
            title: '下注输赢',
            type: 'select',
            data: [{
                key: '1',
                value: '赢'
            }, {
                key: '0',
                value: '输'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'betting_robot_status',
            search: true
        }, {
            field: 'updateName',
            title: '更新人'
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            type: 'datetime'
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 620023,
                        buttons: [{
                            code: 'add',
                            name: '新增',
                            handler: () => {
                                this.props.history.push(`/guessUpsDowns/robot/addedit`);
                            }
                        }, {
                            code: 'edit',
                            name: '修改',
                            handler: (selectedRowKeys) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/robot/addedit?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }, {
                            code: 'stopOrNo',
                            name: '启用/作废',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    const txt = selectedRows[0].status === '1' ? '作废' : '启用';
                                    Modal.confirm({
                                        okText: '确认',
                                        cancelText: '取消',
                                        content: txt,
                                        onOk: () => {
                                            this.props.doFetching();
                                            fetch('620022', {
                                                code: selectedRowKeys[0]
                                            }).then(() => {
                                                showSucMsg('操作成功');
                                                this.props.cancelFetching();
                                                this.props.getPageData();
                                            });
                                        }
                                    });
                                }
                            }
                        }, {
                            code: 'accountWater',
                            name: '账户流水',
                            handler: (selectedRowKeys) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/robot-account?userId=${selectedRowKeys[0]}`);
                                }
                            }
                        }, {
                            code: 'bettingRecord',
                            name: '投注查询',
                            handler: (selectedRowKeys) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene-record?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default Robot;