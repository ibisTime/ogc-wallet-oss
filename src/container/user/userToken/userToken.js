import React from 'react';
import {Modal, message, Select, Input, Form} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/user/userToken/userToken';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, showSucMsg} from 'common/js/util';
import {activateUser, setQ, cancelNode} from 'api/user';
import fetch from 'common/js/fetch';

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
        ...state.userUserToken,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserToken extends React.Component {
    isRefereesFirst = true;
    state = {
        ...this.state,
        visible: false,
        userData: [],
        levelList: []
    };
    changeUserFilterOption = (input) => {
        if(this.isRefereesFirst) {
            this.isRefereesFirst = false;
            fetch(805120, {
                start: 1,
                limit: 10,
                kind: 'C',
                keyword: input
            }).then(data => {
                let userData = [];
                data.list.forEach(item => {
                    userData.push({
                        userId: item.userId,
                        nickname: item.nickname,
                        mobile: item.loginName
                    });
                });
                this.setState({
                    userData
                }, () => {
                    this.isRefereesFirst = true;
                });
            });
        }
        return false;
    };
    componentDidMount() {
        fetch('625815').then(data => {
            const levelList = data.map(item => ({
                code: item.code,
                level: item.level,
                name: `L${item.level}-${item.name}`
            }));
            this.setState({
                levelList
            });
        });
        this.changeUserFilterOption();
    }
    formFn = (code, params, visible) => {
        const hasMsg = message.loading('');
        fetch(code, params).then(() => {
            hasMsg();
            this.props.form.resetFields();
            message.success('操作成功', 1.5);
            this.props.getPageData();
            this.setState({
                [visible]: false
            });
        }, hasMsg).catch(hasMsg);
    };
    changeUserHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { userId01, level01, count } = values;
                console.log(values);
                this.formFn(625820, {
                    keyConfigCode: level01,
                    userId: userId01,
                    count: parseInt(count)
                }, 'visible');
            }
        });
    };
    changeUserHandleCancel = () => {
        this.setState({
            visible: false
        });
    };
    render() {
        const fields = [{
            title: '用户',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return data.userName;
            }
        }, {
            field: 'keyConfigCode',
            title: '令牌等级',
            type: 'select',
            listCode: '625815',
            keyName: 'code',
            valueName: 'L{{level.DATA}}-{{name.DATA}}',
            search: true
        }, {
            field: 'transferCount',
            title: '流转次数'
        }, {
            field: 'createrName',
            title: '发放人'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        const {visible, userData, levelList} = this.state;
        const options = userData.map(item => <Option key={item.userId}>{item.nickname}-{item.mobile}</Option>);
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        pageCode: '625822',
                        singleSelect: false,
                        btnEvent: {
                            // 发放令牌
                            opToken: () => {
                                this.setState({
                                    visible: true
                                });
                            },
                            clearToken: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else {
                                    Modal.confirm({
                                        okText: '确认',
                                        cancelText: '取消',
                                        content: `确定销毁该令牌？`,
                                        onOk: () => {
                                            console.log(selectedRowKeys);
                                            this.props.doFetching();
                                            return fetch(625821, {
                                                codeList: selectedRowKeys
                                            }).then(() => {
                                                this.props.getPageData();
                                                showSucMsg('操作成功');
                                            }).catch(() => {
                                                this.props.cancelFetching();
                                            });
                                        }
                                    });
                                }
                            },
                            toRecord: (selectedRowKeys, selectedRows) => {
                                if(selectedRowKeys[0]) {
                                    this.props.history.push(`/user/tokenRecord?keyCode=${selectedRows[0].code}`);
                                }else {
                                    this.props.history.push('/user/tokenRecord');
                                }
                            }
                        }
                    })
                }
                <Modal
                    title='发放令牌'
                    width={600}
                    visible={visible}
                    onOk={this.changeUserHandleOk}
                    onCancel={this.changeUserHandleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form {...formItemLayout} onSubmit={this.changeUserHandleOk}>
                        <Form.Item label="用户">
                            {getFieldDecorator('userId01', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(<Select
                                placeholder="请选择用户"
                                showSearch
                                filterOption={false}
                                onSearch={this.changeUserFilterOption}
                            >
                                {
                                    options
                                }
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="选择等级">
                            {getFieldDecorator('level01', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(<Select
                                style={{ width: '100%' }}
                                placeholder="请选择"
                            >
                                {
                                    Array.isArray(levelList) && levelList.map(item => (
                                        <Option key={item.code}>{item.name}</Option>
                                    ))
                                }
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="数量">
                            {getFieldDecorator('count', {
                                rules: [
                                    {
                                        required: true,
                                        message: ' '
                                    }
                                ]
                            })(<Input
                                style={{ width: '100%' }}
                                placeholder="请输入数量"
                            />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default UserToken;
