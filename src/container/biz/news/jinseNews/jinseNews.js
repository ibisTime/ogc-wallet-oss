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
} from '@redux/biz/news/jinseNews';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { getDictList } from 'api/dict';

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
        ...state.bizJinseNews,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class JinseNews extends React.Component {
    state = {
        ...this.state,
        visible: false,
        codeList: [],
        typeList: [],
        languageList: []
    };
    isHandleOk = true;
    handleOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { typeNew, language } = values;
                    let obj = {
                        updater: getUserName(),
                        idList: this.state.codeList,
                        type: typeNew,
                        language
                    };
                    fetch('628100', obj).then(() => {
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
    componentDidMount() {
        fetch('628007', {status: '1'}).then(data => {
            if(Array.isArray(data)) {
                const list = data.map(item => ({
                    code: item.code,
                    name: item.name
                }));
                this.setState({
                    typeList: list
                });
            }
        });
        getDictList({parentKey: 'language'}).then(data => {
            let arr = [];
            if(Array.isArray(data)) {
                data.map(item => {
                   arr.push({
                       code: item.dkey,
                       name: item.dvalue
                   });
                });
                this.setState({
                    languageList: arr
                });
            }
        });
    }
    render() {
        const fields = [{
            title: '标题',
            field: 'title',
            search: true
        }, {
            title: '作者',
            field: 'auther'
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
        const {typeList, languageList} = this.state;
        return <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: 628105,
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
                title="挑选资讯"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                    <Form.Item label="挑选资讯">
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
                            {
                                typeList.map(item => (
                                    <Option key={item.code} value={item.code}>{item.name}</Option>
                                ))
                            }
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="语言">
                        {getFieldDecorator('language', {
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
                            {
                                languageList.map(item => (
                                    <Option key={item.code} value={item.code}>{item.name}</Option>
                                ))
                            }
                        </Select>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default JinseNews;
