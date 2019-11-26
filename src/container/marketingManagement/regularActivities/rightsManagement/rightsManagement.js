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
} from '@redux/marketingManagement/regularActivities/rightsManagement';
import {Modal, Input, message, Form, Select} from 'antd';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import fetch from 'common/js/fetch';

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
        ...state.marketRightsManagement,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsManagement extends React.Component {
    state = {
        ...this.state,
        visible: false,
        codeList: []
    };
    isHandleOk = true;
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { approveResult, approveNote } = values;
                    fetch('670001', {
                        codeList: this.state.codeList,
                        approveResult,
                        approveNote: approveNote || ''
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
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            title: '币种',
            field: 'symbol',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            search: true
        }, {
            title: '权益总量',
            field: 'totalAmount'
        }, {
            title: '已释放数量',
            field: 'singleAmount'
        }, {
            title: '权益说明',
            field: 'note'
        }, {
            title: '规则说明',
            field: 'rule'
        }, {
            title: '状态',
            field: 'status',
            search: true
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '670015',
                    singleSelect: false,
                    btnEvent: {
                        edit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                            }
                        },
                        batchReview: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
                                this.setState({
                                    visible: true,
                                    codeList: selectedRowKeys
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
                        >
                            <Option key="1" value="1">通过</Option>
                            <Option key="0" value="0">不通过</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="审核说明">
                        {getFieldDecorator('approveNote')(<TextArea placeholder="请输入手机号"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default RightsManagement;
