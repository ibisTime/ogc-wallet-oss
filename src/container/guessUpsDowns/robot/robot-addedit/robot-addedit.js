import React from 'react';
import { Form } from 'antd';
import { getQueryString, getCoinList } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class RobotAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '机器人名称',
            required: true
        }, {
            field: 'symbol',
            title: '针对币种',
            type: 'select',
            key: 'guess_coin',
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
            editCode: 620021
        });
    }
}

export default RobotAddedit;
