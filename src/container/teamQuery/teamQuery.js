import React from 'react';
import {Row, Col, Input, Button, message} from 'antd';
import TreeComponent from 'component/cTree/TreeComponent';
import {
    showSucMsg,
    showWarnMsg,
    findDsct,
    mtDate,
    dateFormat
} from 'common/js/util';

import {teamQueryList} from '../../api/statisticalAnalysis';

class teamQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: null,
            treeDataProps: '',
            treeKey: ''
        };
    }
    findUserInfo = () => {
        const {userAccount, treeKey} = this.state;
        if(!treeKey) {
            if(userAccount.state.value) {
                const key = userAccount.state.value;
                const hasMsg = message.loading('');
                teamQueryList(key).then(data => {
                    const treeDataProps = data.map((item, index) => {
                        let obj = {
                            title: `${item.loginName}---投注${item.jejuAmount}JEJU,下级${item.refereeCount}人`,
                            key: item.loginName
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
                });
            }else{
                showWarnMsg('用户账户不能为空!');
            }
        }else {
            const key = treeKey;
            const {treeDataProps} = this.state;
            console.log(isChildren(treeDataProps, key));
            if(isChildren(treeDataProps, key)) {
                const hasMsg = message.loading('');
                teamQueryList(key).then(data => {
                    const treeData = data.map((item, index) => {
                        let obj = {
                            title: `${item.loginName}---投注${item.jejuAmount}JEJU,下级${item.refereeCount}人`,
                            key: item.loginName
                        };
                        if(+item.refereeCount > 0) {
                            obj.children = [{title: '', key: item.loginName + index}];
                        }
                        return obj;
                    });
                    this.setState({
                        treeDataProps: findKey(key, treeDataProps, treeData)
                    });
                    hasMsg();
                });
            };
        }
        function isChildren(data, key) {
            if(Array.isArray(data)) {
                for(let i = 0; i < data.length; i++) {
                    if(data[i].key === key && (data[i].children && !data[i].children[0].title)) {
                        return true;
                    }
                    if(data[i].key !== key && data[i].children) {
                        isChildren(data[i].children, key);
                    }
                    if(data[i].key === key && !data[i].children) {
                        return false;
                    }
                }
            }
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
        const { treeDataProps } = this.state;
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <strong>用户账户：</strong>
                        <Input placeholder="请输入用户账户" ref={(target) => { this.state.userAccount = target; }} style={{ width: '20%' }}/>
                        <Button style={{marginLeft: '20px'}} onClick={() => {
                            this.setState({
                                treeKey: ''
                            }, () => {
                                this.findUserInfo();
                            });
                        }} type="primary">确认</Button>
                    </Col>
                    <Col span={24} style={{marginTop: '30px', marginLeft: '100px', marginBottom: '60px', overflow: 'hidden'}}>
                        <TreeComponent treeDataProps={treeDataProps} treeClickFn={this.treeClickFn} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default teamQuery;
