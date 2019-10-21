import React from 'react';
import {Row, Col, Input, Button, message, Select} from 'antd';
import TreeComponent from 'component/cTree/TreeComponent';
import {
    showSucMsg,
    showWarnMsg,
    findDsct,
    mtDate,
    dateFormat
} from 'common/js/util';

import {teamQueryList, findUserList, groupUserInfo} from '../../api/statisticalAnalysis';

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
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
                    value: r.userId,
                    text: r.loginName
                });
            });
            callback(datas);
        });
    }
    timeout = setTimeout(fake, 300);
}

class teamQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: null,
            treeDataProps: '',
            treeKey: '',
            isInitTree: false,
            data: [],
            value: undefined,
            teamUserInfo: {},
            isShowInfo: false
        };
    }
    handleSearch = value => {
        if (value) {
            fetch(value, data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
    };
    findUserInfo = () => {
        const {treeKey, value} = this.state;
        this.setState({
            isShowInfo: true
        });
        if(!treeKey) {
            if(value) {
                groupUserInfo(value).then(data => {
                    this.setState({
                        teamUserInfo: data
                    });
                });
                this.setState({
                    treeDataProps: ''
                });
                const key = value;
                const hasMsg = message.loading('');
                teamQueryList(key).then(data => {
                    if(JSON.stringify(data) !== '{}') {
                        const treeDataProps = data.map((item, index) => {
                            let obj = {
                                title: `${item.loginName},下级${item.refereeCount ? item.refereeCount : 0}人`,
                                key: item.userId
                            };
                            if(+item.refereeCount > 0) {
                                obj.children = [{title: '', key: index}];
                            }
                            return obj;
                        });
                        this.setState({
                            treeDataProps
                        });
                        hasMsg();
                    }
                    // else {
                    //     showWarnMsg('该账号暂无关联推荐人');
                    // }
                });
            }else{
                showWarnMsg('用户账户不能为空!');
            }
        }else {
            const key = treeKey;
            const {treeDataProps} = this.state;
            const hasMsg = message.loading('');
            teamQueryList(key).then(data => {
                const treeData = Array.isArray(data) && data.map((item, index) => {
                    let obj = {
                        title: `${item.loginName},下级${item.refereeCount ? item.refereeCount : 0}人`,
                        key: item.userId
                    };
                    if(+item.refereeCount > 0) {
                        obj.children = [{title: '', key: item.userId + index}];
                    }
                    return obj;
                });
                if(treeData && treeData.length) {
                    this.setState({
                        treeDataProps: findKey(key, treeDataProps, treeData)
                    });
                }
                hasMsg();
            });
        }
        function findKey(key, data, treeData) {
            if(Array.isArray(data)) {
                for(let i = 0; i < data.length; i++) {
                    if(data[i].key === key) {
                        data[i].children = treeData;
                    }else if(data[i].children) {
                        findKey(key, data[i].children, treeData);
                    }
                }
                return data;
            }
        }
    };
    treeClickFn = (keys, type) => {
        if(type === 'onSelect') {
            if(keys[0] && this.state.treeKey !== keys[0]) {
                this.setState({
                    treeKey: keys[0]
                }, () => {
                    this.findUserInfo();
                });
            }
        }
        if(type === 'onExpand') {
            let len = keys.length - 1;
            if(keys[len] && this.state.treeKey !== keys[len]) {
                this.setState({
                    treeKey: keys[len]
                }, () => {
                    this.findUserInfo();
                });
            }
        }
    };
    render() {
        const { treeDataProps, isInitTree, teamUserInfo, value, isShowInfo } = this.state;
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <strong>用户账户：</strong>
                        <Select
                            showSearch
                            value={this.state.value}
                            placeholder={this.props.placeholder}
                            style={{width: '220px'}}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearch}
                            onChange={this.handleChange}
                            notFoundContent={null}
                        >
                            {options}
                        </Select>
                        <Button style={{marginLeft: '20px'}} onClick={() => {
                            this.setState({
                                treeKey: '',
                                isInitTree: !isInitTree
                            }, () => {
                                this.findUserInfo();
                            });
                        }} type="primary">确认</Button>
                    </Col>
                    <Col span={20} style={{marginTop: '40px'}}>
                        <strong style={{marginLeft: '60px'}}>{ isShowInfo ? teamUserInfo.loginName + '，下级' + (teamUserInfo.refereeCount ? teamUserInfo.refereeCount : 0) + '人' : ''}</strong>
                    </Col>
                    <Col span={20} style={{marginTop: '20px', marginLeft: '100px', marginBottom: '60px', overflow: 'hidden'}}>
                        <TreeComponent treeDataProps={treeDataProps} treeClickFn={this.treeClickFn} isInitTree={isInitTree}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default teamQuery;
