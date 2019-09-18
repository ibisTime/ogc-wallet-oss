import React from 'react';
import {Modal, message, Form, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/rightsInterests/bonusPools/bonusPools';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';

const formItemLayout = {
    labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 }
    }
};

@listWrapper(
    state => ({
        ...state.rightsInterestsBonusPools,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsBonusPools extends React.Component {
    state = {
        ...this.state,
        visible: false,
        poolId: ''
    };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hasMsg = message.loading('');
                const { count01 } = values;
                fetch('500020', {
                    count: count01,
                    poolId: this.state.poolId
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
    render() {
        const fields = [{
            title: '币种',
            field: 'symbol'
        }, {
            title: '可用数量',
            field: 'count',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            title: '累计入总量',
            field: 'countIn',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            title: '累计出总量',
            field: 'countOut',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: 500003,
                    btnEvent: {
                        adjust: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.setState({
                                    visible: true,
                                    poolId: selectedRowKeys[0]
                                });
                            }
                        },
                        outIn: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/bonusPools/bonusPoolsRules?code=${selectedRowKeys[0]}`);
                            }
                        }
                    }
                })
            }
            <Modal
                title='手动调整分红池'
                width={600}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="数量">
                        {getFieldDecorator('count01', {
                            rules: [
                                {
                                    required: true,
                                    message: ' '
                                }
                            ]
                        })(<Input placeholder="请输入数量"/>)}
                    </Form.Item>
                    <p style={{color: 'red', marginTop: '10px', paddingLeft: '40px'}}>正数表示加，负数表示减，不能是0</p>
                </Form>
            </Modal>
        </div>;
    }
}

export default RightsInterestsBonusPools;
