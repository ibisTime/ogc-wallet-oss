import React from 'react';
import moment from 'moment';
import locale from 'common/js/lib/date-locale';
import 'moment/locale/zh-cn';
import {Modal, Form, message, DatePicker, LocaleProvider} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/guessUpsDowns/scene';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, showSucMsg, getCoinList} from 'common/js/util';
import fetch from 'common/js/fetch';

moment.locale('zh-cn');

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

@listWrapper(
    state => ({
        ...state.GuessUpsDownsScene,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Scene extends React.Component {
    state = {
        ...this.state,
        visible: false,
        upCode: ''
    };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hasMsg = message.loading('');
                const { enableDatetime01 } = values;
                fetch('620003', {
                    enableDatetime: moment(enableDatetime01).format('YYYY-MM-DD HH:mm'),
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
    render() {
        const fields = [{
            field: 'name',
            title: '名称'
        }, {
            field: 'symbol',
            title: '币种',
            type: 'select',
            key: 'guess_coin',
            search: true,
            noVisible: true
        }, {
            field: 'symbol01',
            title: '币种',
            render(v, d) {
                return d && d.symbol;
            }
        }, {
            field: 'recycleMins',
            title: '周期（分）'
        }, {
            field: 'bettingMins',
            title: '投注期（分）'
        }, {
            field: 'closeMins',
            title: '封闭期（分）'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'reward_term_status',
            search: true
        }, {
            field: 'enableDatetime',
            title: '启用时间',
            type: 'datetime'
        }, {
            field: 'nextStartDatetime',
            title: '下期开始时间',
            type: 'datetime'
        }];
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 620005,
                        buttons: [{
                            code: 'add',
                            name: '新增',
                            handler: () => {
                                this.props.history.push(`/guessUpsDowns/scene/addedit`);
                            }
                        }, {
                            code: 'edit',
                            name: '修改',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene/addedit?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }, {
                            code: 'enable',
                            name: '启用',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else if (selectedRows[0].status === '1') {
                                    showWarnMsg('该状态下不能进行该操作');
                                } else {
                                    this.setState({
                                        visible: true,
                                        upCode: selectedRowKeys[0]
                                    });
                                }
                            }
                        }, {
                            code: 'stop',
                            name: '停用',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else if (selectedRows[0].status !== '1') {
                                    showWarnMsg('该状态下不能进行该操作');
                                } else {
                                    Modal.confirm({
                                        okText: '确认',
                                        cancelText: '取消',
                                        content: '停用',
                                        onOk: () => {
                                            this.props.doFetching();
                                            fetch('620004', {
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
                            code: 'scene',
                            name: '现有场次',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene-page?code=${selectedRows[0].code}`);
                                }
                            }
                        }, {
                            code: 'previewEvents',
                            name: '预览场次',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else if(selectedRows[0].status !== '1') {
                                    showWarnMsg('该状态下不能进行该操作');
                                }else {
                                    this.props.history.push(`/guessUpsDowns/scene-preview?code=${selectedRows[0].code}`);
                                }
                            }
                        }, {
                            code: 'detail',
                            name: '详情',
                            handler: (selectedRowKeys) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene/addedit?v=1&code=${selectedRowKeys[0]}`);
                                }
                            }
                        }]
                    })
                }
                <Modal
                    width={600}
                    title="启用"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} onSubmit={this.handleOk}>
                        <Form.Item label="启用时间">
                            {getFieldDecorator('enableDatetime01', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(
                                <DatePicker
                                    showTime
                                    placeholder="请选择启用时间"
                                    format='YYYY-MM-DD HH:mm'
                                    locale={locale}
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Scene;