import React from 'react';
import {Modal, Form, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/starLucky/starJackpot';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString,
    getCoinList
} from 'common/js/util';
import fetch from 'common/js/fetch';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18}
    }
};

@listWrapper(
    state => ({
        ...state.starLuckyStarJackpot,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarJackpot extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            ...this.state,
            visible: false,
            poolId: ''
        };
    }
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {adjustCount} = values;
                this.props.doFetching();
                fetch(610660, {
                    adjustCount,
                    poolId: this.state.poolId
                }).then(() => {
                    showSucMsg('操作成功');
                    this.props.cancelFetching();
                    this.props.getPageData();
                    this.setState({
                        visible: false
                    });
                }).catch(this.props.cancelFetching);
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
            field: 'symbol',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            search: true
        }, {
            field: 'count',
            title: '余额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'remainCount',
            title: '遗留总额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'totalAdjustCount',
            title: '调整总额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'countIn',
            title: '进池总额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'countOut',
            title: '出池总额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }];
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'id',
                        pageCode: '610661',
                        searchParams: {
                            type: 'star'
                        },
                        buttons: [{
                            code: 'amountOf',
                            name: '调额'
                        }, {
                            code: 'recordInto',
                            name: '进池记录'
                        }, {
                            code: 'recordOut',
                            name: '出池记录'
                        }, {
                            code: 'legacyRecords',
                            name: '遗留记录'
                        }, {
                            code: 'amountRecorded',
                            name: '调额记录'
                        }],
                        btnEvent: {
                            recordInto: (selectedRowKeys) => { // 进池
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/starLucky/starRecordRecord`);
                                }
                            },
                            recordOut: (selectedRowKeys) => { // 出池
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/starLucky/starRecordRecord`);
                                }
                            },
                            legacyRecords: (selectedRowKeys, selectedRows) => { // 遗留记录
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/starLucky/starLegacyRecords?poolId=${selectedRowKeys[0]}`);
                                }
                            },
                            amountOf: (selectedRowKeys) => { // 调额
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.setState({
                                        poolId: selectedRowKeys[0],
                                        visible: true
                                    });
                                }
                            },
                            amountRecorded: (selectedRowKeys) => { // 调额记录
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/starLucky/starJackpotRecord?poolId=${selectedRowKeys[0]}`);
                                }
                            }
                        }
                    })
                }
                <Modal
                    title="调额"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form onSubmit={this.handleOk}>
                        <Form.Item {...formItemLayout} label="调额数额">
                            {
                                getFieldDecorator('adjustCount', {
                                    rules: [{
                                        required: true,
                                        message: ''
                                    }]
                                })(<Input placeholder="请输入调额数额" type="number"/>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default StarJackpot;