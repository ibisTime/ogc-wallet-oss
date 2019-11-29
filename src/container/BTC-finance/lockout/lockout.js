import React from 'react';
import {Modal, Input, message, Form, Select} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/BTC-finance/lockout/lockout';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg,
    getCoinType
} from 'common/js/util';
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
        ...state.BTCFinanceLockout,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Lockout extends React.Component {
    state = {
        ...this.state,
        visible: false,
        seleObj: {}
    };
    isHandleOk = true;
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { amountM, applyNote } = values;
                    fetch('806040', {
                        type: '2',
                        userId: this.state.seleObj.userId,
                        currency: this.state.seleObj.currency,
                        amount: amountM,
                        applyNote: applyNote || ''
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
    componentDidMount() {
        sessionStorage.removeItem('USER_NAME');
    }
    render() {
        const fields = [{
            field: 'userId',
            title: '针对用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            title: '针对用户',
            field: 'userName',
            render(v, d) {
                return d && d.nickname + '-' + d.loginName;
            }
        }, {
            title: '币种',
            field: 'currency',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            search: true,
            noVisible: true
        }, {
            title: '币种',
            field: 'currency1',
            render(v, d) {
                return d && d.currency;
            }
        }, {
            title: '锁仓总额',
            field: 'lockAmount'
        }, {
            title: '锁仓次数',
            field: 'lockCount'
        }, {
            title: '已解锁数量',
            field: 'releaseAmount'
        }, {
            title: '解锁次数',
            field: 'releaseCount'
        }, {
            title: '未解锁数量',
            field: 'remainAmount'
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'accountNumber',
                    pageCode: '806048',
                    btnEvent: {
                        lockUp: () => {
                            this.props.history.push(`/BTC-finance/lockout/addedit`);
                        },
                        unlock: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.setState({
                                    visible: true,
                                    seleObj: {
                                        userId: selectedRows[0].userId,
                                        currency: selectedRows[0].currency
                                    }
                                });
                            }
                        },
                        lockupRecord: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                sessionStorage.setItem('USER_NAME', selectedRows[0].nickname + '-' + selectedRows[0].loginName);
                                this.props.history.push(`/BTC-finance/lockUp?userId=${selectedRows[0].userId}&currency=${selectedRows[0].currency}`);
                            }
                        },
                        unlockRecord: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                sessionStorage.setItem('USER_NAME', selectedRows[0].nickname + '-' + selectedRows[0].loginName);
                                this.props.history.push(`/BTC-finance/lockRelease?userId=${selectedRows[0].userId}&currency=${selectedRows[0].currency}`);
                            }
                        }
                    }
                })
            }
            <Modal
                width={600}
                title="解锁"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="金额">
                        {getFieldDecorator('amountM', {
                            rules: [
                                {
                                    required: true,
                                    message: ' '
                                }
                            ]
                        })(<Input placeholder="请输入金额" type="number"/>)}
                    </Form.Item>
                    <Form.Item label="申请说明">
                        {getFieldDecorator('applyNote')(<TextArea placeholder="请输入审核说明"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default Lockout;
