import React from 'react';
import {Modal, message, Select, DatePicker, Form} from 'antd';
import moment from 'moment';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/managent/alerts';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

@listWrapper(
    state => ({
        ...state.Alerts,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Alerts extends React.Component {
    state = {
      ...this.state,
        isTop: '',
        selectedCode: '',
        visible: false
    };
    isHandleOk = true;
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { showDatetime01, isTop01 } = values;
                    fetch(628092, {
                        code: this.state.selectedCode,
                        isTop: isTop01,
                        showDatetime: moment(showDatetime01).format('YYYY-MM-DD HH:mm:ss'),
                        type: '0',
                        updater: getUserName()
                    }).then(() => {
                        hasMsg();
                        this.props.getPageData();
                        showSucMsg('操作成功');
                        this.setState({
                            visible: false
                        });
                    }).catch(() => {
                        hasMsg();
                        this.props.cancelFetching();
                        this.setState({
                            visible: false
                        });
                    });
                }else {
                    this.isHandleOk = true;
                }
            });
        }
    };
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    render() {
        const fields = [{
            field: 'content',
            title: '标题',
            render(v) {
                if(v) {
                    const f = v.indexOf('】');
                    const l = v.indexOf('【');
                    if(f !== -1 && l !== -1) {
                        return v.substring(l + 1, f);
                    }else {
                        if(v.length > 15) {
                            return v.substring(0, 15) + '...';
                        }else {
                            return v;
                        }
                    }
                }
            }
        }, {
            title: '来源',
            field: 'source',
            type: 'select',
            key: 'flash_source',
            search: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            type: 'select',
            search: true,
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            search: true,
            key: 'flash_status'
        }, {
            field: 'showDatetime',
            title: '发布时间',
            type: 'datetime',
            rangedate: ['showDatetimeStart', 'showDatetimeEnd'],
            search: true
        }, {
            field: 'updater',
            title: '最近修改人'
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            type: 'datetime'
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'code',
                    pageCode: '628095',
                    searchParams: {
                        type: '0'
                    },
                    btnEvent: {
                        changeTop: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '1') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                fetch(628098, {
                                    code: selectedRowKeys[0]
                                }).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        },
                        up: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status === '1') {
                                showWarnMsg('已经是上架的状态');
                            } else {
                                this.setState({
                                    visible: true,
                                    selectedCode: selectedRowKeys[0]
                                });
                            }
                        },
                        down: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '1') {
                                showWarnMsg('该状态不能进行该操作');
                            } else {
                                Modal.confirm({
                                    okText: '确认',
                                    cancelText: '取消',
                                    content: `确定下架？`,
                                    onOk: () => {
                                        this.props.doFetching();
                                        return fetch(628093, {
                                            code: selectedRowKeys[0],
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
                        },
                        edit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status === '1') {
                                showWarnMsg('该状态不能进行修改操作');
                            } else {
                                this.props.history.push(`/news/newsFlash/addedit?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }
                })
            }
            <Modal
                width={600}
                title="批量审核"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="是否置顶">
                        {getFieldDecorator('isTop01', {
                            rules: [
                                {
                                    required: true,
                                    message: ' '
                                }
                            ]
                        })(<Select
                            style={{ width: '100%' }}
                            placeholder="请选择"
                        >
                            <Option value={1}>是</Option>
                            <Option value={0}>否</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="发布时间">
                        {
                            getFieldDecorator('showDatetime01', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(
                                <DatePicker
                                    showTime placeholder="请选择"
                                />
                            )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default Alerts;
