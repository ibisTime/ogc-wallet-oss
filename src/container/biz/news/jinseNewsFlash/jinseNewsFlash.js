import React from 'react';
import {Modal, message, Form, Select} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/news/jinseNewsFlash';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

const {Option} = Select;
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
        ...state.bizJinseNewsFlash,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class JinseNewsFlash extends React.Component {
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
                    const { typeNew } = values;
                    let obj = {
                        updater: getUserName(),
                        idList: this.state.codeList,
                        type: typeNew
                    };
                    fetch('628010', obj).then(() => {
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
            field: 'content',
            title: '标题',
            render(v) {
                if(v) {
                    const f = v.indexOf('】');
                    const l = v.indexOf('【');
                    if(f !== -1 && l !== -1) {
                        return v.substring(l + 1, f);
                    }else {
                        if(v.length > 15) {
                            return v.substring(0, 15) + '...';
                        }else {
                            return v;
                        }
                    }
                }
            }
        }, {
            title: '抓取时间',
            field: 'crawlDatetime',
            type: 'datetime',
            search: true,
            rangedate: ['crawlDateStart', 'crawlDateEnd']
        }, {
            title: '挑选次数',
            field: 'pickCount'
        }, {
            title: '挑选人',
            field: 'pickUser'
        }, {
            title: '挑选时间',
            field: 'pickDatetime',
            type: 'datetime'
        }];
        const {getFieldDecorator} = this.props.form;
        return <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: 628015,
                    singleSelect: false,
                    btnEvent: {
                        choose: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
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
                title="挑选快讯"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="挑选快讯">
                        {getFieldDecorator('typeNew', {
                            rules: [
                                {
                                    required: true,
                                    message: ' '
                                }
                            ]
                        })(<Select
                            style={{ width: '100%' }}
                            placeholder="请选择"
                            onChange={this.approveChange}
                        >
                            <Option key='1' value='1'>热门</Option>
                            <Option key='0' value='0'>普通</Option>
                        </Select>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default JinseNewsFlash;
