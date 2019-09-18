import React from 'react';
import {Modal, Transfer, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/rightsInterests/levelMessage/levelMessage';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.rightsInterestsLevelMessage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsLevelMessage extends React.Component {
    state = {
        ...this.state,
        visible: false,
        gradeCode: '',
        mockData: [],
        targetKeys: []
    };
    handleOk = () => {
        const hasMsg = message.loading('');
        const {targetKeys, gradeCode} = this.state;
        fetch('805409', {
            gradeCode,
            rightCodeList: targetKeys
        }).then(() => {
            hasMsg();
            showSucMsg('操作成功');
            this.props.getPageData();
            this.setState({
                visible: false
            });
        }).catch(hasMsg);
    };
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        fetch(805429, {
            gradeCode: this.state.gradeCode
        }).then(data => {
            data.forEach(item => {
                const data = {
                    key: item.code,
                    title: item.name,
                    description: item.name,
                    chosen: item.assignFlag
                };
                if (data.chosen) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            });
            this.setState({ mockData, targetKeys });
        });
    };
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };
    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };
    render() {
        const fields = [{
            title: '名称',
            field: 'name'
        }, {
            title: '持币数量',
            field: 'scopeStart',
            render(v, d) {
                return v && `${d.scopeStart}~${d.scopeEnd}`;
            }
        }];
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: 805403,
                    btnEvent: {
                        interestsDistribution: (selectedRowKeys) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.setState({
                                    visible: true,
                                    gradeCode: selectedRowKeys[0]
                                }, () => {
                                    this.getMock();
                                });
                            }
                        }
                    }
                })
            }
            <Modal
                title='权益分配'
                width={1000}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <div>
                    <Transfer
                        titles={['未分配', '已分配']}
                        listStyle={{width: '450px', height: '350px'}}
                        dataSource={this.state.mockData}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        onSearch={this.handleSearch}
                        render={item => item.title}
                        locale={{ itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容' }}
                    />
                </div>
            </Modal>
        </div>;
    }
}

export default RightsInterestsLevelMessage;
