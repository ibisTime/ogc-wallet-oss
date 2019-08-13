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
                    treeDataProps: treeDataProps.map(item => {
                        if(item.key === key) {
                            item.children = treeData;
                        }
                        return item;
                    })
                });
                hasMsg();
            });
        }
    };
    treeClickFn = (keys) => {
        this.setState({
            treeKey: keys[0]
        }, () => {
            if(keys[0] && this.state.treeKey !== keys[0]) {
                this.findUserInfo();
            }
        });
    };
    render() {
        const { treeDataProps } = this.state;
        console.log('treeDataProps', treeDataProps);
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
                        <TreeComponent treeDataProps={treeDataProps} treeClickFn={this.treeClickFn}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default teamQuery;
