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
} from '@redux/parkingSpace/vehicleManagement/userVehicle';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';
import {findUserList} from 'api/user';
import fetch from 'common/js/fetch';

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
        ...state.parkingSpaceUserVehicle,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserVehicle extends React.Component {
    isHandleOk = true;
    state = {
        ...this.state,
        visible: false,
        datas: [],
        carList: [],
        userIdVal: ''
    };
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { userId01, carProductCode } = values;
                    fetch('200056', {
                        carProductCode,
                        userId: userId01
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
    };
    componentDidMount() {
        fetch('200007').then(data => {
            this.setState({
                carList: data
            });
        });
    }
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render(v, d) {
                return v && d.user ? `${d.user.nickname}-${d.user.loginName}` : '-';
            }
        }, {
            field: 'source',
            title: '来源',
            key: 'car_source',
            type: 'select',
            search: true
        }, {
            field: 'symbolPrice',
            title: '标价币种'
        }, {
            field: 'symbolIncome',
            title: '收益币种'
        }, {
            field: 'name',
            title: '产品名称'
        }, {
            field: 'pic',
            title: '产品图片',
            type: 'img'
        }, {
            field: 'level',
            title: '车辆等级',
            search: true,
            render(v) {
                return `${v}级`;
            }
        }, {
            field: 'status',
            title: '车辆状态',
            key: 'car_status',
            type: 'select'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        const {datas, userIdVal, carList, visible} = this.state;
        const {getFieldDecorator} = this.props.form;
        const options = datas.map(d => <Option key={d.userId}>{d.text}</Option>);
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: 200043,
                    btnEvent: {
                        ktOption: () => {
                            fetchUser('', data => this.setState({ datas: data, visible: true }));
                        }
                    }
                })
            }
            <Modal
                width={600}
                title="空投"
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
                                    required: true,
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
                    <Form.Item label="车产品">
                        {getFieldDecorator('carProductCode', {
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
                                Array.isArray(carList) && carList.map(item => (
                                    <Option key={item.code}>{item.name}</Option>
                                ))
                            }
                        </Select>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default UserVehicle;
