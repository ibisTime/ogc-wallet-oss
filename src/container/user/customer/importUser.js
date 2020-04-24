import React from 'react';
import { showSucMsg, tempString, moneyFormat, getUserId } from 'common/js/util';
import XLSX from 'xlsx';
import { Form, Select, Upload, Button, Icon, Table, message } from 'antd';
import fetch from 'common/js/fetch';
import { tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;

@Form.create()
class ImportUser extends React.Component {
    constructor(props) {
        super(props);
        let cols = [{
            title: '用户邮箱',
            dataIndex: 'email'
        }, {
            title: '推荐用户邮箱',
            dataIndex: 'emailReferee'
        }];
        this.state = {
            data: [],
            cols: cols,
            fileList: []
        };
    }

    handleChange = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            let XLSXData = XLSX.utils.sheet_to_json(ws, {header: 1});
            let data = [];
            delete XLSXData[0];
            XLSXData.forEach((item, i) => {
                if (item.length) {
                    data.push({
                        code: i,
                        email: item[0],
                        emailReferee: item[1]
                    });
                }
            });
            this.setState({data: data});
        };
        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    }

    // 确认导入
    handleImprot = () => {
        this.props.form.validateFieldsAndScroll((err) => {
            if (err) {
                return;
            }
            const {data} = this.state;
            if(data.length === 0) {
                return message.warning('导入的文件内容为空');
            }
            const hasMsg = message.loading('', 10);
            fetch(805047, {
                dataList: data
            }).then(() => {
                hasMsg();
                showSucMsg('导入成功');
                setTimeout(() => {
                    this.props.history.go(-1);
                }, 1000);
            }).catch(hasMsg);
        });
    };

    render() {
        const _this = this;
        const props = {
            name: 'file',
            headers: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    _this.setState({ fileList: [info.file] });
                }
                if (info.file.status === 'done') {
                } else if (info.file.status === 'error') {
                }
                if(info.fileList.length < 1) {
                    _this.setState({
                        fileList: null
                    });
                }
            },
            beforeUpload(file) {
                if (!file) {
                    return false;
                }
                _this.handleChange(file);
                return false;
            },
            fileList: _this.state.fileList
        };

        return (
            <Form>
                <FormItem label='矿机订单导入模版'>
                    <div className="readonly-text"><a href="/yhdr.xlsx" download="用户邮箱导入模版.xlsx">下载</a></div>
                </FormItem>
                <FormItem label='用户邮箱信息'>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/>选择文件
                        </Button>
                    </Upload>
                </FormItem>
                <div className="table-wrapper">
                    <Table
                        bordered
                        rowKey={record => record['code']}
                        dataSource={this.state.data}
                        columns={this.state.cols}
                        loading={this.props.fetching}
                    />
                </div>
                <FormItem style={{marginTop: 30}} {...tailFormItemLayout}>
                    <Button type="primary" key="importBtn" onClick={this.handleImprot}>确认导入</Button>
                    <Button type="primary" key="backBtn" style={{marginLeft: 30}} onClick={() => {
                        this.props.history.go(-1);
                    }}>返回</Button>
                </FormItem>
            </Form>
        );
    }
}

export default ImportUser;
