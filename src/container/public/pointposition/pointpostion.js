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
} from '@redux/public/pointpostion';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName,
    dateTimeFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.publicPointPostion,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class publicPointPostion extends React.Component {
    state = {
        levelData: []
    };
    componentDidMount() {
        fetch(805105, {
            start: 1,
            limit: 10
        }).then(data => {
            this.setState({
                levelData: data.commitUserInfo
            });
        });
    }
    render() {
        const fields = [{
            title: '提交人昵称',
            field: 'commitUser',
            render: (v, d) => {
                return d.commitUserInfo ? d.commitUserInfo.nickname : '';
            },
            search: true
        }, {
            title: '提交人手机号',
            field: 'commitUserMobile',
            render: (v, d) => {
              return d.commitUserInfo ? d.commitUserInfo.mobile : '';
            },
            search: true
        }, {
            title: '所在端',
            field: 'deviceSystem',
            search: true
        }, {
            title: '严重等级',
            search: true,
            type: 'select',
            key: 'bug_level',
            field: 'level',
           render: (v, d) => {
               let levelData = this.state.levelData;
               console.log(levelData);
               return levelData;
           }
        }, {
            title: '状态',
            type: 'select',
            field: 'status',
            data: [{
                key: '0',
                value: '待确认'
            }, {
                key: '1',
                value: '已确认待奖励'
            }, {
                key: '2',
                value: '复现不成功'
            }, {
                key: '3',
                value: '已奖励'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '更新时间',
            field: 'commitDatetime',
            rangedate: ['commitDatetimeStart', 'commitDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: '805105',
            beforeSubmit: (data) => {
                return data;
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是可以支付的状态');
                    } else {
                        this.props.history.push(`/public/pointpostion/addedit?code=${selectedRows[0].code}&v=1`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/public/pointpostion/addedit?code=${selectedRows[0].code}&v=1&isAdd=1`);
                    }
                },
                zf: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是可以支付的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定支付？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(805100, {
                                    code: selectedRows[0].code,
                                    reappear: selectedRows[0].reappear,
                               deviceSystem: selectedRows[0].deviceSystem,
                                description: selectedRows[0].description,
                                commitUser: selectedRows[0].commitUser,
                                    updater: getUserName()
                                }).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default publicPointPostion;
