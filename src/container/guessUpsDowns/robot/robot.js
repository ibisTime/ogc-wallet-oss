import React from 'react';
import {Modal, Form, message, Select, Input} from 'antd';
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
import {showWarnMsg, dateTimeFormat, moneyFormat, getCoinList, showSucMsg, moneyParse} from 'common/js/util';
import fetch from 'common/js/fetch';

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
    }
};

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
    state = {
        ...this.state,
        visible: false,
        upCode: '',
        symbol: ''
    };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hasMsg = message.loading('');
                const { direction, amount } = values;
                fetch('620025', {
                    direction,
                    amount: moneyParse(amount, '', this.state.symbol),
                    code: this.state.upCode
                }).then(() => {
                    hasMsg();
                    this.props.form.resetFields();
                    message.success('操作成功', 1.5);
                    this.props.getPageData();
                    this.setState({
                        visible: false
                    });
                }, hasMsg).catch(hasMsg);
            }
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    // 近期流水查询
    ledgerQuery = (selectedRowKeys) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/guessUpsDowns/robot-recent?code=${selectedRowKeys[0]}`);
        }
    };
    // 历史流水查询
    ledgerQueryHistory = (selectedRowKeys) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/guessUpsDowns/robot-accountHistory?code=${selectedRowKeys[0]}`);
        }
    };
    render() {
        const fields = [{
            field: 'name',
            title: '机器人'
        }, {
            field: 'symbol',
            title: '针对币种',
            type: 'select',
            key: 'guess_coin',
            search: true
        }, {
            field: 'balanceAmount',
            title: '账户余额',
            render(v, d) {
                return v && moneyFormat(v, '4', d.symbol);
            }
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
        const {getFieldDecorator} = this.props.form;
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
                            code: 'robotTransfer',
                            name: '机器人转账',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.setState({
                                        visible: true,
                                        upCode: selectedRowKeys[0],
                                        symbol: selectedRows[0].symbol
                                    });
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
                        }, {
                            code: 'ledgerQuery',
                            name: '近期流水查询',
                            handler: (selectedRowKeys, selectedRows) => {
                                this.ledgerQuery(selectedRowKeys, selectedRows);
                            }
                        }, {
                            code: 'ledgerQueryHistory',
                            name: '历史流水查询',
                            handler: (selectedRowKeys, selectedRows) => {
                                this.ledgerQueryHistory(selectedRowKeys, selectedRows);
                            }
                        }]
                    })
                }
                <Modal
                    width={600}
                    title="机器人转账"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} onSubmit={this.handleOk}>
                        <Form.Item label="方向">
                            {getFieldDecorator('direction', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(
                                <Select placeholder="请选择">
                                    <Option key="1" value="1">加钱</Option>
                                    <Option key="0" value="0">减钱</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="转账金额">
                            {getFieldDecorator('amount', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(
                                <Input placeholder="请输入转账金额"/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Robot;
