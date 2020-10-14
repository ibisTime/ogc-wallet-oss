import React from 'react';
import {Modal, Input, message, Form} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/business/purchase/purchase';
import {listWrapper} from 'common/js/build-list';
import {formatDate, showWarnMsg, showSucMsg, moneyFormat, moneyParse} from 'common/js/util';
import fetch from 'common/js/fetch';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};
const SYSTEM_COIN = window.SYSTEM_COIN;

@listWrapper(
    state => ({
        ...state.purchasePurchase,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Purchase extends React.Component {
    amountRef = null;
    state = {
        ...this.state,
        visible: false,
        settVisible: false,
        upCode: ''
    };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hasMsg = message.loading('');
                const { orderNo } = values;
                fetch('650302', {
                    orderNo,
                    location: 1,
                    code: this.state.upCode
                }).then(() => {
                    hasMsg();
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
    handleSettOk = () => {
        const amount = this.amountRef.state.value;
        if(!amount) {
            message.warning('请填写结算金额');
            return false;
        }
        const hasMsg = message.loading('');
        fetch('650310', {
            amount: moneyParse(amount, '', SYSTEM_COIN),
            purchaseProductNo: this.state.purchaseProductNo
        }).then(() => {
            hasMsg();
            message.success('操作成功', 1.5);
            this.props.getPageData();
            this.setState({
                settVisible: false
            });
            this.amountRef.state.value = null;
        }, hasMsg).catch(hasMsg);
    };
    handleSettCancel = () => {
        this.setState({
            settVisible: false
        });
    };
    render() {
        const fields = [{
            field: 'code',
            title: '标的编号'
        }, {
            field: 'type',
            title: '申购类型',
            type: 'select',
            key: 'purchase_product_type',
            search: true
        }, {
            field: 'symbol',
            title: '币种名称',
            listCode: '802013',
            type: 'select',
            keyName: 'symbol',
            valueName: 'symbol',
            noVisible: true,
            search: true
        }, {
            field: 'symbol01',
            title: '币种名称',
            render(v, d) {
                return d && d.symbol;
            }
        }, {
            field: 'totalAmount',
            title: '申购总数量'
        }, {
            field: 'singleAmount',
            title: '每份数量'
        }, {
            field: 'totalQuantity',
            title: '总份数'
        }, {
            field: 'price',
            title: '币单价（USDT）'
        }, {
            field: 'singlePrice',
            title: '每份价格(USDT)'
        }, {
            field: 'singleAmount',
            title: '每份申购数量'
        }, {
            field: 'personPayQuantityMax',
            title: '单人申购上限'
        }, {
            field: 'startDatetime',
            title: ' 期限 ',
            render(v, d) {
                return v && `${formatDate(v, 'yyyy-MM-dd hh')}点至 ${formatDate(d.endDatetime, 'yyyy-MM-dd hh')}点`;
            }
        }, {
            field: 'productStatus',
            title: '申购状态',
            key: 'purchase_product_status',
            type: 'select',
            search: true
        }, {
            field: 'showStatus',
            title: '展示状态',
            key: 'purchase_product_show_status',
            type: 'select',
            search: true
        }, {
            field: 'orderNo',
            title: '展示次序'
        }, {
            field: 'remainAmount',
            title: '剩余数量'
        }];
        const {getFieldDecorator, setFieldsValue} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '650304',
                    btnEvent: {
                        edit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRows[0].showStatus === '1') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                this.props.history.push(`/purchase/purchase/addedit?code=${selectedRowKeys[0]}`);
                            }
                        },
                        up: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRows[0].showStatus === '1') {
                                showWarnMsg('该状态下不能进行该操作');
                            } else {
                                this.setState({
                                    upCode: selectedRowKeys[0],
                                    visible: true
                                });
                                setFieldsValue({
                                    orderNo: ''
                                });
                            }
                        },
                        down: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRows[0].showStatus !== '1') {
                                showWarnMsg('该状态下不能执行该操作');
                            } else {
                                Modal.confirm({
                                    title: '下架',
                                    okText: '确定',
                                    cancelText: '取消',
                                    onOk: () => {
                                        this.props.doFetching();
                                        fetch(650303, {
                                            code: selectedRowKeys[0]
                                        }).then(() => {
                                            this.props.cancelFetching();
                                            showSucMsg('操作成功');
                                            this.props.getPageData();
                                        }).catch(this.props.cancelFetching);
                                    }
                                });
                            }
                        },
                        settlement: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
                                this.setState({
                                    purchaseProductNo: selectedRowKeys[0],
                                    settVisible: true
                                });
                            }
                        },
                        // 申购记录查询
                        findRecord: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
                                this.props.history.push(`/purchase/purchaseRecordTwo?purchaseProductCode=${selectedRowKeys[0]}&type=prs`);
                            }
                        },
                        // 结算记录查询
                        settlementRecord: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
                                this.props.history.push(`/purchase/settlementRecord?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }
                })
            }
            <Modal
                width={600}
                title="申购上架"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="序号">
                        {getFieldDecorator('orderNo', {
                            rules: [
                                {
                                    required: true,
                                    message: ' '
                                }
                            ]
                        })(<Input placeholder="请输入序号"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default Purchase;
