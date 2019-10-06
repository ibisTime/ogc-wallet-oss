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
} from '@redux/guessUpsDowns/scene';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsScene,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Scene extends React.Component {
    render() {
        const fields = [{
            field: 'planName',
            title: '期数'
        }, {
            field: 'batch1',
            title: '币种',
            render: (v, data) => {
                return data.batch;
            },
            search: true
        }, {
            field: 'batch',
            title: '状态',
            type: 'select',
            pageCode: '610601',
            keyName: 'batch',
            valueName: '{{batch.DATA}}',
            searchName: 'batch',
            search: true,
            noVisible: true
        }, {
            field: 'status',
            title: '周期（分）',
            type: 'select',
            key: 'snode_plan_status'
        }, {
            field: 'divideCycle',
            title: '投注期（分）'
        }, {
            field: 'startDate',
            title: '封闭期（分）',
            type: 'datetime'
        }, {
            field: 'endDate',
            title: '启用时间',
            type: 'datetime'
        }, {
            field: 'stepAmount',
            title: '停用时间',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
            }
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610601,
                        buttons: [{
                            code: 'scene',
                            name: '场次',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene-page?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }, {
                            code: 'add',
                            name: '新增',
                            handler: () => {
                                this.props.history.push(`/guessUpsDowns/scene/addedit`);
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
                                    this.props.history.push(`/guessUpsDowns/scene/addedit`);
                                }
                            }
                        }, {
                            code: 'stopOrNo',
                            name: '启用/停用',
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
                            code: 'previewEvents',
                            name: '预览场次',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene-preview`);
                                }
                            }
                        }, {
                            code: 'detail',
                            name: '详情',
                            handler: (selectedRowKeys) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene/addedit?v=1`);
                                }
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default Scene;