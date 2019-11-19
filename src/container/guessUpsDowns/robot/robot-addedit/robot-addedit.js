import React from 'react';
import { Form } from 'antd';
import { getQueryString, getCoinList } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class RobotAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            symbol: ''
        };
    }
    componentDidMount() {
        fetch('630048', {type: 'guess_symbol'}).then(data => {
            this.setState({
                symbol: data.guess_symbol
            });
        });
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '针对币种',
            readonly: true,
            value: this.state.symbol
        }, {
            field: 'name',
            title: '机器人名称',
            required: true
        }, {
            field: 'conditionsRate',
            title: '条件赔率',
            required: true
        }, {
            field: 'betRate',
            title: '下注赔率',
            required: true
        }, {
            field: 'betResult',
            title: '下注输赢',
            type: 'select',
            data: [{
                key: '1',
                value: '赢'
            }, {
                key: '0',
                value: '输'
            }],
            keyName: 'key',
            valueName: 'value'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 620024,
            addCode: 620020,
            editCode: 620021,
            beforeSubmit: (params) => {
                params.symbol = this.state.symbol;
                return params;
            }
        });
    }
}

export default RobotAddedit;
