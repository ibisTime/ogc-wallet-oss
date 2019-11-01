import React from 'react';
import {Modal, message, Select, Form, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/managent/industry';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

const {Option} = Select;
const {TextArea} = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
    }
};

@listWrapper(
    state => ({
        ...state.ManagentIndustry,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Industry extends React.Component {
    state = {
      ...this.state,
        isTop: '',
        selectedCode: '',
        visible: false,
        auditCode: ''
    };
    isHandleOk = true;
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { result, remark } = values;
                    fetch('628203', {
                        result,
                        remark,
                        code: this.state.auditCode
                    }).then(() => {
                        hasMsg();
                        this.isHandleOk = true;
                        message.success('操作成功', 1.5);
                        this.props.form.resetFields();
                        this.props.getPageData();
                        this.setState({
                            visible: false
                        });
                    }).catch(() => {
                        this.isHandleOk = true;
                        hasMsg();
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
    confirmModal = (obj, params) => {
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: obj.content,
            onOk: () => {
                this.props.doFetching();
                return fetch(obj.code, params).then(() => {
                    this.props.getPageData();
                    showSucMsg('操作成功');
                }).catch(() => {
                    this.props.cancelFetching();
                });
            }
        });
    };
    render() {
        const fields = [{
            field: 'informerNickname',
            title: '举报人',
            search: true
        }, {
            field: 'kind',
            title: '举报人的用户类型',
            type: 'select',
            data: [{
                key: 'C',
                value: 'c端用户'
            }, {
                key: 'P',
                value: 'p平台用户'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'keyWord',
            title: '关键字',
            search: true,
            noVisible: true
        }, {
            field: 'titleZh',
            title: '中文标题'
        }, {
            field: 'titleEn',
            title: '英文标题'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'industry_type',
            search: true
        }, {
            field: 'reportId',
            title: '被举报人id'
        }, {
            field: 'occurrenceTime',
            title: '发生时间',
            type: 'datetime',
            rangedate: ['occurrenceTimeStart', 'occurrenceTimeEnd'],
            search: true
        }, {
            field: 'origin',
            title: '来源',
            type: 'select',
            key: 'industry_origin',
            search: true
        }, {
            field: 'isAnonymous',
            title: '是否匿名',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'isHot',
            title: '是否热门',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'industry_status',
            search: true
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '628211',
                    btnEvent: {
                        setTop: (selectedRowKeys, selectedRows) => { // 置顶
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '1' && selectedRows[0].status !== '2') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                this.confirmModal({
                                    content: '是否置顶',
                                    code: 628206
                                }, {
                                    code: selectedRowKeys[0]
                                });
                            }
                        },
                        setHot: (selectedRowKeys, selectedRows) => { // 热门
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '1' && selectedRows[0].status !== '2') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                this.confirmModal({
                                    content: '是否设置热门',
                                    code: 628205
                                }, {
                                    code: selectedRowKeys[0]
                                });
                            }
                        },
                        upDown: (selectedRowKeys, selectedRows) => { // 上 下架
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '1' && selectedRows[0].status !== '2') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                const tit = selectedRows[0].status === '1' ? '下架' : '上架';
                                this.confirmModal({
                                    content: `是否${tit}`,
                                    code: 628204
                                }, {
                                    code: selectedRowKeys[0]
                                });
                            }
                        },
                        audit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '0') {
                                showWarnMsg('该状态不能进行修改操作');
                            } else {
                                this.setState({
                                    visible: true,
                                    auditCode: selectedRowKeys[0]
                                });
                            }
                        }
                    }
                })
            }
            <Modal
                width={600}
                title="开设账号"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="审核结果">
                        {getFieldDecorator('result', {
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
                            <Option key='1'>通过</Option>
                            <Option key='0'>不通过</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="备注">
                        {getFieldDecorator('remark', {})(<TextArea name="备注" placeholder="请填写备注"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default Industry;
