import React from 'react';
import {Modal, Upload, Button, Icon} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/card/secretKey';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    moneyFormatSubtract,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    getUserId,
    showSucMsg
} from 'common/js/util';
import { readXls } from 'common/js/xlsx-util';
import fetch from 'common/js/fetch';

let currency = '';
@listWrapper(
    state => ({
        ...state.CardSecretKey,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SecretKey extends React.Component {
    state = {
        ...this.state,
        visible: false,
        data: []
    };
    componentDidMount() {
        let clearParams = document.getElementById('clearParams');
        clearParams.addEventListener('click', () => {
            currency = '';
        });
    }
    handleChange = (file) => {
        readXls(file).then(XLSXData => {
            for (let i = XLSXData.length; i > 0;) {
                if (XLSXData[--i].length) {
                    break;
                } else {
                    XLSXData.splice(i, 1);
                }
            }
            let data = [];
            delete XLSXData[0];
            XLSXData.forEach((item, i) => {
                data.push(item[2]);
            });
            this.setState({
                data: data
            });
        }).catch(msg => showWarnMsg(msg));
    }
    // 确认导入
    handleImprot = () => {
        this.props.form.validateFieldsAndScroll((err) => {
            if (err) {
                return;
            }
            let param = {};
            param.publicKeyList = this.state.data;
            fetch(610700, param).then(() => {
                showSucMsg('导入成功');
                this.setState({
                    visible: false
                });
                this.props.getPageData();
            }).catch(this.props.cancelFetching);
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false
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
        const fields = [{
            field: 'publicKey',
            title: '公钥',
            search: true
        }, {
            field: 'status',
            title: '状态',
            search: true,
            type: 'select',
            key: 'card_secret_status'
        }, {
            field: 'creatorName',
            title: '导入人'
        }, {
            field: 'createDatetime',
            title: '导入时间',
            type: 'datetime'
        }, {
            field: 'cancelUserName',
            title: '作废人'
        }, {
            field: 'cancelDatetime',
            title: '作废时间',
            type: 'datetime'
        }];
        return <div className="superNode-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '610703',
                    buttons: [{
                        code: 'import',
                        name: '导入'
                    }, {
                        code: 'invalid',
                        name: '作废'
                    }],
                    btnEvent: {
                        import: () => {
                            this.setState({
                                visible: true
                            });
                        },
                        invalid: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                Modal.confirm({
                                    okText: '作废',
                                    cancelText: '取消',
                                    content: `确定作废？`,
                                    onOk: () => {
                                        this.props.doFetching();
                                        this.props.doFetching();
                                        fetch(610702, {
                                            id: selectedRowKeys[0]
                                        }).then(() => {
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
                title='导入'
                width={500}
                visible={this.state.visible}
                onOk={this.handleImprot}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Upload {...props}>
                    <Button>
                        <Icon type="upload"/>选择文件
                    </Button>
                </Upload>
            </Modal>
        </div>;
    }
}

export default SecretKey;
