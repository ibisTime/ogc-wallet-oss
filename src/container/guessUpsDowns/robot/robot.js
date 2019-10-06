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
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

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
            field: 'planName',
            title: '机器人'
        }, {
            field: 'batch1',
            title: '针对币种',
            render: (v, data) => {
                return data.batch;
            }
        }, {
            field: 'batch',
            title: '账户余额',
            type: 'select',
            pageCode: '610601',
            keyName: 'batch',
            valueName: '{{batch.DATA}}',
            searchName: 'batch',
            search: true
        }, {
            field: 'status1',
            title: '条件赔率',
            type: 'select',
            key: 'snode_plan_status'
        }, {
            field: 'divideCycle',
            title: '下注赔率'
        }, {
            field: 'startDate',
            title: '输赢设置',
            type: 'datetime'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'snode_plan_status'
        }, {
            field: 'endDate',
            title: '启用时间',
            type: 'datetime'
        }, {
            field: 'endDate1',
            title: '作废时间',
            type: 'datetime'
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610601,
                        buttons: [{
                            code: 'add',
                            name: '新增',
                            handler: () => {
                                this.props.history.push(`/guessUpsDowns/robot/addedit`);
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
                                    const txt = '';
                                    Modal.confirm({
                                        okText: '确认',
                                        cancelText: '取消',
                                        content: txt,
                                        onOk: () => {
                                            // this.props.doFetching();
                                            // showSucMsg('操作成功');
                                            // this.props.cancelFetching();
                                            // this.props.getPageData();
                                        }
                                    });
                                }
                            }
                        }, {
                            code: 'accountWater',
                            name: '账户流水',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/robot-account?userId=U20191001004429012299690`);
                                }
                            }
                        }, {
                            code: 'bettingRecord',
                            name: '投注查询',
                            handler: (selectedRowKeys, selectedRows) => {
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