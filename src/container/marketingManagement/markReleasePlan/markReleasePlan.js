import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/marketingManagement/markReleasePlan/markReleasePlan';
import {Modal, message, Form, DatePicker} from 'antd';
import moment from 'moment';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat, getQueryString, showSucMsg } from 'common/js/util';
import { Link } from 'react-router-dom';
import fetch from 'common/js/fetch';

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
        ...state.marketMarkReleasePlan,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class MarkReleasePlan extends React.Component {
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
                    const { releaseDatetime01 } = values;
                    fetch(670021, {
                        codeList: this.state.codeList,
                        releaseDatetime: moment(releaseDatetime01).format('YYYY-MM-DD')
                    }).then(() => {
                        hasMsg();
                        this.props.getPageData();
                        this.props.form.resetFields();
                        this.isHandleOk = true;
                        showSucMsg('操作成功');
                        this.setState({
                            visible: false
                        });
                    }).catch(() => {
                        hasMsg();
                        this.isHandleOk = true;
                        this.props.form.resetFields();
                        this.props.cancelFetching();
                        this.setState({
                            visible: false
                        });
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
            title: '用户',
            field: 'userName',
            render(v, d) {
                return d && d.user ? `${d.user.loginName}` : '-';
            }
        }, {
            title: '币种',
            field: 'currency1',
            render(v, d) {
                return d && d.currency;
            }
        }, {
            title: '数量',
            field: 'amount'
        }, {
            title: '发放时间',
            field: 'releaseDatetime',
            type: 'date',
            search: true,
            rangedate: ['releaseDatetimeStart', 'releaseDatetimeEnd']
        }, {
            title: '发放说明',
            field: 'note',
            render(v, d) {
                return d.rights && d.rights.note;
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'right_plan_status',
            search: true
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: '670025',
                    singleSelect: false,
                    buttons: [{
                        code: 'updateDate',
                        name: '修改发放时间',
                        handler: (selectedRowKeys, rows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
                                const isVis = rows.filter(item => item.status === '1').length > 0;
                                if(isVis) {
                                    showWarnMsg('存在不可修改发放时间订单，请重新选择');
                                    return;
                                }
                                this.setState({
                                    codeList: selectedRowKeys,
                                    visible: true
                                });
                            }
                        }
                    }, {
                        code: 'export',
                        name: '导出'
                    }]
                })
            }
            <Modal
                width={600}
                title="批量修改发放时间"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="发放时间">
                        {
                            getFieldDecorator('releaseDatetime01', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(
                                <DatePicker/>
                            )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default MarkReleasePlan;
