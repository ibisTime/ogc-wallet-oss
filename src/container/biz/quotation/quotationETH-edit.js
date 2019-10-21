import React from 'react';
import { Form, message, Button, Input } from 'antd';
import DetailUtil from 'common/js/build-detail';
import creatHistory from 'history/createBrowserHistory';
import { setCoinTypeMaket } from '../../../api/tradMessage';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

const history = creatHistory();

@Form.create()
class quotationETHEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.id = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
        this.referCurrency = getQueryString('referCurrency', this.props.location.search);
        this.price = getQueryString('lastPrice', this.props.location.search);
    }
    toBack = () => {
        history.goBack();
    }
    setCoinTypeMaket = () => {
        setCoinTypeMaket(this.id, this.price).then(data => {
            if(data.isSuccess) {
                message.success('修改成功');
                setTimeout(() => {
                    history.goBack();
                }, 2000);
            }
        });
        console.log(this.dailyLimit);
    }
    coinMaketValue = () => {
        this.price = event.target.value;
    }
    render() {
        return (
            <div style={{paddingLeft: '120px', paddingTop: '40px'}}>
                <div>
                    <span>币种：</span>
                    <strong>{this.symbol}</strong>
                </div>
                <div style={{marginTop: '20px'}}>
                    <span>计价币种：</span>
                    <strong>{this.referCurrency}</strong>
                </div>
                <div style={{marginTop: '20px'}}>
                    <span>汇率：</span>
                    <Input defaultValue={this.price} onChange={this.coinMaketValue} style={{width: '200px'}} placeholder="请输入闪兑次数" />
                </div>
                <div style={{marginTop: '40px'}}>
                    <Button type="primary" onClick={this.setCoinTypeMaket}>提交</Button>
                    <Button onClick={this.toBack} style={{marginLeft: '90px'}}>返回</Button>
                </div>
            </div>
        );
    }
}

export default quotationETHEdit;
