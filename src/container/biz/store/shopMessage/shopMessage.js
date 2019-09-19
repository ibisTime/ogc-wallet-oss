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
} from '@redux/biz/store/shopMessage';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, showSucMsg, moneyFormat, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
import {getDictList} from 'api/dict';

const {Option} = Select;

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
    ...state.storeShopMessage,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ShopMessage extends React.Component {
    productLocation = [];
    state = {
        ...this.state,
        visible: false,
        code: '',
        minPrice: sessionStorage.getItem('minPrice') || '',
        maxPrice: sessionStorage.getItem('maxPrice') || ''
    };
    machineStart = (target) => {
        this.setState({
            minPrice: target.target.value
        });
        sessionStorage.setItem('minPrice', target.target.value);
    };
    machineEnd = (target) => {
        this.setState({
            maxPrice: target.target.value
        });
        sessionStorage.setItem('maxPrice', target.target.value);
    };
    machineReset = () => {
        this.setState({
            minPrice: '',
            maxPrice: ''
        });
    };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hasMsg = message.loading('');
                const { orderNo01, location01 } = values;
                fetch('808013', {
                    orderNo: orderNo01,
                    location: location01,
                    boughtCount: '0',
                    updater: getUserId(),
                    code: this.state.code
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
    componentDidMount() {
        getDictList({
            parentKey: 'product_location'
        }).then(data => {
            this.productLocation = data;
        });
    }
  render() {
    const fields = [{
        field: 'name',
        title: '商品名称',
        search: true
    }, {
        field: 'type',
        title: '所属类别',
        search: true,
        type: 'select',
        listCode: '808007',
        keyName: 'code',
        valueName: 'name',
        params: {
            status: '1'
        }
    // }, {
    //     field: 'price',
    //     title: '价格',
    //     search: true,
    //     type: 'interval',
    //     intervalParams: {
    //         start: this.machineStart,
    //         end: this.machineEnd,
    //         reset: this.machineReset
    //     },
    //     startEnd: ['minPrice', 'maxPrice']
    }, {
        field: 'specsName1',
        title: '规格1'
    }, {
        field: 'specsName2',
        title: '规格2'
    }, {
        field: 'orderNo',
        title: '顺序'
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: 'product_location',
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'mall_product_status',
        search: true
    }];
    const {getFieldDecorator} = this.props.form;
    return <div>
        {
            this.props.buildList({
                fields,
                pageCode: 808025,
                btnEvent: {
                    edit: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else if (selectedRows[0].status === '3') {
                            showWarnMsg('该状态下不能进行该操作');
                        } else {
                            this.props.history.push(`/store/shopMessage/addedit?code=${selectedRowKeys[0]}`);
                        }
                    },
                    up: (selectedRowKeys) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            this.setState({
                                code: selectedRowKeys[0],
                                visible: true
                            });
                        }
                    },
                    down: (selectedRowKeys) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定下架？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    fetch(808014, {code: selectedRowKeys[0], updater: getUserId()}).then(() => {
                                        showSucMsg('操作成功');
                                        this.props.cancelFetching();
                                        setTimeout(() => {
                                            this.props.getPageData();
                                        }, 1000);
                                    }).catch(this.props.cancelFetching);
                                }
                            });
                        }
                    }
                },
                beforeSearch: (params) => {
                    const {minPrice, maxPrice} = this.state;
                    if (minPrice) {
                        params.machineOrderNumStart = minPrice;
                        sessionStorage.setItem('minPrice', minPrice);
                    }
                    if (maxPrice) {
                        params.maxPrice = maxPrice;
                        sessionStorage.setItem('maxPrice', maxPrice);
                    }
                    return params;
                }
            })
        }
        <Modal
            title='上架'
            width={600}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
        >
            <Form {...formItemLayout} onSubmit={this.handleOk}>
                <Form.Item label="顺序">
                    {getFieldDecorator('orderNo01', {
                        rules: [
                            {
                                required: true,
                                message: ' '
                            }
                        ]
                    })(<Input placeholder="请输入顺序"/>)}
                </Form.Item>
                <Form.Item label="位置">
                    {getFieldDecorator('location01', {
                        rules: [
                            {
                                required: true,
                                message: ' '
                            }
                        ]
                    })(<Select>
                        {
                            this.productLocation.map((item) => (
                                <Option key={item.dkey}>{item.dvalue}</Option>
                            ))
                        }
                    </Select>)}
                </Form.Item>
            </Form>
        </Modal>
    </div>;
  }
}

export default ShopMessage;
