import React from 'react';
import { Form, message, Button, Input } from 'antd';
import DetailUtil from 'common/js/build-detail';
import creatHistory from 'history/createBrowserHistory';
import { setFrequency } from '../../../../api/tradMessage';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

const history = creatHistory();

@Form.create()
class TradMessageStartTimeSet extends DetailUtil {
    constructor(props) {
        super(props);
        this.id = getQueryString('id', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.symbolOut = getQueryString('symbolOut', this.props.location.search);
        this.symbolIn = getQueryString('symbolIn', this.props.location.search);
        if(getQueryString('dailyLimit', this.props.location.search) === undefined || getQueryString('dailyLimit', this.props.location.search) === 'undefined') {
            this.dailyLimit = '0';
        }else {
            this.dailyLimit = getQueryString('dailyLimit', this.props.location.search);
        }
    }
    toBack = () => {
        history.goBack();
    }
    setFrequency = () => {
        setFrequency(this.id, this.dailyLimit).then(data => {
            if(data.isSuccess) {
                message.success('修改成功');
                setTimeout(() => {
                    history.goBack();
                }, 2000);
            }
        });
        console.log(this.dailyLimit);
    }
    frequencyValue = () => {
        this.dailyLimit = event.target.value;
    }
    render() {
        return (
            <div style={{paddingLeft: '120px', paddingTop: '40px'}}>
                <div>
                    <span>兑出币种：</span>
                    <strong>{this.symbolOut}</strong>
                </div>
                <div style={{marginTop: '20px'}}>
                    <span>兑入币种：</span>
                    <strong>{this.symbolIn}</strong>
                </div>
                <div style={{marginTop: '20px'}}>
                    <span>闪兑次数：</span>
                    <Input defaultValue={this.dailyLimit} onChange={this.frequencyValue} style={{width: '200px'}} placeholder="请输入闪兑次数" />
                </div>
                <div style={{marginTop: '40px'}}>
                    <Button type="primary" onClick={this.setFrequency}>提交</Button>
                    <Button onClick={this.toBack} style={{marginLeft: '90px'}}>返回</Button>
                </div>
            </div>
        );
    }
}

export default TradMessageStartTimeSet;
