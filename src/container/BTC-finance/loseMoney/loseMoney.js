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
} from '@redux/BTC-finance/loseMoney/loseMoney';
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
        ...state.BTCFinanceLoseMoney,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class LoseMoney extends React.Component {
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
                    fetch('806031', {
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
                return d.userInfo && d.userInfo.nickname + '-' + d.userInfo.loginName;
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
            title: '减币数量',
            field: 'amount'
        }, {
            title: '状态',
            field: 'status',
            key: 'account_adjust_status',
            type: 'select'
        }, {
            title: '申请人',
            field: 'applyUserName'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '申请说明',
            field: 'applyNote'
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '806035',
                    singleSelect: false,
                    searchParams: {
                        type: '0'
                    },
                    btnEvent: {
                        loseMoney: () => {
                            this.props.history.push(`/BTC-finance/loseMoney/addedit`);
                        },
                        batchReview: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
                                const isOk = selectedRows.filter(item => item.status !== '0').length > 0;
                                if(isOk) {
                                    showWarnMsg('存在不可审核订单，请重新选择');
                                    return;
                                }
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
                title="批量审核"
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
                        {getFieldDecorator('approveNote')(<TextArea placeholder="请输入审核说明"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default LoseMoney;
