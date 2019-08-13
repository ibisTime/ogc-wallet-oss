import React from 'react';
import {Row, Col, Input, Button} from 'antd';
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
            userAccount: ''
        };
    }
    findUserInfo = () => {
        if(this.state.userAccount.state.value) {
            teamQueryList(this.state.userAccount.state.value).then(data => {
                console.log('loginName', data);
            });
        }else{
            showWarnMsg('用户账户不能为空!');
        }
    }
    render() {
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <strong>用户账户：</strong>
                        <Input placeholder="请输入用户账户" ref={(target) => { this.state.userAccount = target; }} style={{ width: '20%' }}/>
                        <Button style={{marginLeft: '20px'}} onClick={this.findUserInfo} type="primary">确认</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default teamQuery;
