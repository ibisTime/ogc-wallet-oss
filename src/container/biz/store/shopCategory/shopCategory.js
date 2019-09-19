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
} from '@redux/biz/store/shopCategory';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, showSucMsg, moneyFormat } from 'common/js/util';
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
    ...state.storeShopCategory,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ShopCategory extends React.Component {
    state = {
        ...this.state,
        visible: false,
        code: ''
    };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hasMsg = message.loading('');
                const { orderNo01 } = values;
                fetch('808003', {
                    orderNo: orderNo01,
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
  render() {
    const fields = [{
        field: 'name',
        title: '名称',
        search: true
    }, {
        field: 'pic',
        title: '图片',
        type: 'img'
    }, {
        field: 'orderNo',
        title: '顺序'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'mall_category_status'
    }];
    const {getFieldDecorator} = this.props.form;
    return <div>
        {
            this.props.buildList({
                fields,
                pageCode: 808005,
                deleteCode: '808001',
                btnEvent: {
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
                                    fetch(808004, {code: selectedRowKeys[0]}).then(() => {
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
            </Form>
        </Modal>
    </div>;
  }
}

export default ShopCategory;
