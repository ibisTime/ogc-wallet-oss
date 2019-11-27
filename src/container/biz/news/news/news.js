import React from 'react';
import {Modal, Input, message, Form, Select, DatePicker} from 'antd';
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
} from '@redux/biz/news/news';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
moment.locale('zh-cn');

const {Option} = Select;
const { TextArea } = Input;
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
        ...state.bizNews,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class News extends React.Component {
    state = {
        ...this.state,
        visible: false,
        checkCode: '',
        isResult: false
    };
    isHandleOk = true;
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { approveResult, showDatetime01, isTop01, remark } = values;
                    let obj = {
                        updater: getUserId(),
                        code: this.state.checkCode
                    };
                    if(approveResult === '1') {
                        obj = {
                            ...obj,
                            approveResult,
                            showDatetime: moment(showDatetime01).format('YYYY-MM-DD HH:mm:ss'),
                            isTop: isTop01
                        };
                    }else {
                        obj = {
                            ...obj,
                            approveResult,
                            remark
                        };
                    }
                    fetch('628192', obj).then(() => {
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
    approveChange = (v) => {
        if(v === '1') {
            this.setState({
                isResult: true
            });
            this.props.form.resetFields(['showDatetime01', 'isTop01']);
        }else {
            this.setState({
                isResult: false
            });
            this.props.form.resetFields(['remark']);
        }
    };
    // onOkPicker = (v) => {
    //     console.log(v);
    // };
    render() {
        const fields = [{
            title: '标题',
            field: 'title',
            search: true
        }, {
            title: '来源',
            field: 'source',
            search: true
        }, {
            title: '作者',
            field: 'auther'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'news_status',
            search: true
        }, {
            title: '发布时间',
            field: 'showDatetime',
            type: 'datetime'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime',
            rangedate: ['startDateStart', 'endDateEnd'],
            search: true
        }, {
            title: '是否置顶',
            field: 'isTop',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }];
        const {getFieldDecorator} = this.props.form;
        const {isResult} = this.state;
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: 628195,
                    btnEvent: {
                        edit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status === '1') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                this.props.history.push(`/news/news/addedit?code=${selectedRowKeys[0]}`);
                            }
                        },
                        audit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '0') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                this.setState({
                                    visible: true,
                                    checkCode: selectedRowKeys[0]
                                });
                                this.props.form.setFieldsValue({
                                    isTop01: '1'
                                });
                            }
                        },
                        down: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '1') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                Modal.confirm({
                                    okText: '确认',
                                    cancelText: '取消',
                                    content: `确定下架？`,
                                    onOk: () => {
                                        this.props.doFetching();
                                        return fetch(628193, {
                                            code: selectedRowKeys[0],
                                            updater: getUserId()
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
                        setIsTop: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                const msg = selectedRows[0].isTop === '0' ? '确定置顶？' : '确定取消置顶？';
                                Modal.confirm({
                                    okText: '确认',
                                    cancelText: '取消',
                                    content: msg,
                                    onOk: () => {
                                        this.props.doFetching();
                                        return fetch(628199, {
                                            code: selectedRowKeys[0],
                                            updater: getUserId()
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
                })
            }
            <Modal
                width={600}
                title="审核"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="审核结果">
                        {getFieldDecorator('approveResult', {
                            rules: [
                                {
                                    required: true,
                                    message: ' '
                                }
                            ]
                        })(<Select
                            style={{ width: '100%' }}
                            placeholder="请选择"
                            onChange={this.approveChange}
                        >
                            <Option key="1" value="1">通过</Option>
                            <Option key="0" value="0">不通过</Option>
                        </Select>)}
                    </Form.Item>
                    {
                        isResult ? <div>
                            <Form.Item label="展示时间">
                                {getFieldDecorator('showDatetime01', {
                                    rules: [
                                        {
                                            required: true,
                                            message: ' '
                                        }
                                    ]
                                })(<DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="请选择时间"
                                />)}
                            </Form.Item>
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
                                    <Option key="1" value="1">是</Option>
                                    <Option key="0" value="0">否</Option>
                                </Select>)}
                            </Form.Item>
                        </div> : <Form.Item label="审核说明">
                            {getFieldDecorator('remark')(<TextArea placeholder="请输入审核说明"/>)}
                        </Form.Item>
                    }
                </Form>
            </Modal>
        </div>;
    }
}

export default News;