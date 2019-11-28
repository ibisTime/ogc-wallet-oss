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
} from '@redux/marketingManagement/marketingDesign/totalPool';
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
        ...state.marketInvitedTotalPool,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TotalPool extends React.Component {
    constructor(props) {
        super(props);
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
                    this.props.form.resetFields();
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
            search: true,
            noVisible: true
        }, {
            title: '币种',
            field: 'currency1',
            render(v, d) {
                return d && d.symbol;
            }
        }, {
            field: 'type',
            title: '营销活动',
            type: 'select',
            key: 'pool_market_type',
            search: true
        }, {
            field: 'count',
            title: '余额',
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
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'id',
                        pageCode: '610661',
                        searchParams: {
                            typeList: ['REGIST', 'INVITE', 'CHARGE', 'DROP']
                        },
                        btnEvent: {
                            intoPool: (selectedRowKeys) => { // 进池
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/marketingDesign/recordRecord?poolId=${selectedRowKeys[0]}&direction=1`);
                                }
                            },
                            poolRecord: (selectedRowKeys) => { // 出池
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/marketingDesign/recordRecord?poolId=${selectedRowKeys[0]}&direction=0`);
                                }
                            },
                            dailyReport: (selectedRowKeys, selectedRows) => { // 日报表
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/marketingDesign/poolDailyReport?currency=${selectedRows[0].symbol}`);
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
                                    this.props.history.push(`/marketingDesign/jackpotRecord?poolId=${selectedRowKeys[0]}`);
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

export default TotalPool;