import React from 'react';
import {Modal, Input, message, Select, Tooltip, Icon, Form} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/trading/sdRecord/sdRecord';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import fetch from 'common/js/fetch';
import {findUserList} from '../../../api/statisticalAnalysis';

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
let timeout;
let currentValue;
function fetchUser(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    function fake() {
        const datas = [];
        findUserList(1, 15, value).then(data => {
            data.list.forEach(r => {
                datas.push({
                    value: r.mobile,
                    text: `${r.nickname}-${r.mobile}`,
                    userId: r.userId
                });
            });
            callback(datas);
        });
    }
    timeout = setTimeout(fake, 300);
}

@listWrapper(
    state => ({
        ...state.tradingSdRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SdRecord extends React.Component {
    isHandleOk = true;
    state = {
        ...this.state,
        visible: false,
        datas: [],
        carList: [],
        userIdVal: '',
        symbol: '',
        amount: ''
    };
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { userId01, carProductCode, count01 } = values;
                    fetch('802921', {
                        exchangeSymbolPairId: carProductCode.split('|')[0],
                        userId: userId01,
                        countTotal: count01
                    }).then(() => {
                        this.isHandleOk = true;
                        hasMsg();
                        message.success('操作成功', 1.5);
                        this.props.getPageData();
                        this.props.form.resetFields();
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
    handleSearch = value => {
        if (value) {
            fetchUser(value, data => this.setState({ datas: data }));
        } else {
            this.setState({ datas: [] });
        }
    };
    handleChange = value => {
        this.props.form.setFieldsValue({
            userId01: value
        });
        this.getAccountBalance();
    };
    handleChange2 = value => {
        this.props.form.setFieldsValue({
            carProductCode: value
        });
        this.getAccountBalance();
    };
    componentDidMount() {
        fetch('802910', {start: 1, limit: 20}).then(data => {
            this.setState({
                carList: data.list
            });
        });
    }
    getAccountBalance = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { userId01, carProductCode } = values;
                fetch(802301, {userId: userId01, currency: carProductCode.split('|')[1]}).then(data => {
                    this.setState({
                        amount: moneyFormat(parseFloat(data.accountList[0].amount - data.accountList[0].frozenAmount).toFixed(8), '', carProductCode.split('|')[1]),
                        symbol: carProductCode.split('|')[1]
                    });
                });
            }
        });
    }
    render() {
        const fields = [{
            field: 'nickname',
            title: '昵称',
            render(v, d) {
                return d.userInfo ? `${d.userInfo.nickname}${'(' + d.userInfo.loginName}` : ')';
            }
        }, {
            field: 'symbolOut',
            title: '兑出币种',
            search: true
        }, {
            field: 'symbolIn',
            title: '兑入币种',
            search: true
        }, {
            field: 'countOutTotal',
            title: '总兑出数量',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolOut);
            }
        }, {
            field: 'countOut',
            title: '实际兑出数量',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolOut);
            }
        }, {
            field: 'countIn',
            title: '兑入数量',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolIn);
            }
        }, {
            field: 'valueCnyOut',
            title: '兑出币种行情价格'
        }, {
            field: 'valueCnyIn',
            title: '兑入币种行情价格'
        }, {
            field: 'fee',
            title: '手续费',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolOut);
            }
        }, {
            field: 'feeRate',
            title: '手续费率(%)'
        }, {
            field: 'operatorType',
            title: '操作人类型',
            type: 'select',
            key: 'exchange_operator_type',
            search: true
        }];
        const {datas, userIdVal, carList, visible, symbol, amount} = this.state;
        const {getFieldDecorator} = this.props.form;
        const options = datas.map(d => <Option key={d.userId}>{d.text}</Option>);
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        pageCode: 802930,
                        buttons: [{
                            code: 'flashExchange',
                            name: '闪兑',
                            handler: (selectedRowKeys, selectedRows) => {
                                fetchUser('', data => this.setState({ datas: data, visible: true }));
                            }
                        }, {
                            code: 'detail',
                            name: '详情'
                        }, {
                            code: 'export',
                            name: '导出'
                        }]
                    })
                }
                <Modal
                    width={600}
                    title="闪兑"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} onSubmit={this.handleOk}>
                        <Form.Item label="用户">
                            {getFieldDecorator('userId01', {
                                rules: [
                                    {
                                        message: ' '
                                    }
                                ]
                            })(<Select
                                showSearch
                                placeholder='请选择'
                                style={{width: '100%'}}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.handleSearch}
                                onChange={this.handleChange}
                                notFoundContent={null}
                            >
                                {options}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="交易对">
                            {getFieldDecorator('carProductCode', {
                                rules: [
                                    {
                                        message: ' '
                                    }
                                ]
                            })(<Select
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                onChange={this.handleChange2}
                            >
                                {
                                    Array.isArray(carList) && carList.map(item => (
                                        <Option key={`${item.id}|${item.symbolOut}`}>{item.symbolOut}-{item.symbolIn}</Option>
                                    ))
                                }
                            </Select>)}
                        </Form.Item>
                        <Form {...formItemLayout} onSubmit={this.handleOk}>
                            <Form.Item label="兑出数量">
                                {getFieldDecorator('count01', {
                                    rules: [
                                        {
                                            message: ' '
                                        }
                                    ]
                                })(<Input placeholder="请输入数量"/>)}
                            </Form.Item>
                            <p style={{paddingLeft: '40px'}}>{symbol}余额:{amount}</p>
                        </Form>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default SdRecord;
