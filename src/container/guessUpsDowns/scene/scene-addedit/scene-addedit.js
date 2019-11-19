import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyParse, getCoinList } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class SceneAddedit extends DetailUtil {
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
            field: 'name',
            title: '名称',
            hidden: !this.view
        }, {
            field: 'symbol',
            title: '币种',
            value: this.state.symbol,
            readonly: true
        }, {
            field: 'recycleMins',
            title: '周期分钟数',
            number: true,
            required: true,
            tipEle: {
                id: 'recycleMins',
                style: {
                    color: '#f5222d'
                },
                content: '投注期+封闭期分钟数不能超过周期分钟数'
            }
        }, {
            field: 'bettingMins',
            title: '投注期分钟数',
            number: true,
            required: true
        }, {
            field: 'closeMins',
            title: '封闭期分钟数',
            number: true,
            required: true
        }, {
            field: 'singleCountMin',
            title: '单次最小投注数量',
            number: true,
            required: true
        }, {
            field: 'singleCountMax',
            title: '单次最大投注数量',
            number: true,
            required: true
        }, {
            field: 'betsStep',
            title: '投注步长',
            number: true,
            required: true
        }, {
            field: 'personMaxCount',
            title: '单人最大投注量',
            number: true,
            required: true
        }, {
            field: 'description',
            title: '场次描述',
            required: true,
            type: 'textarea',
            normalArea: true
        }, {
            field: 'enableDatetime',
            title: '启用时间',
            hidden: !this.view,
            type: 'datetime'
        }, {
            field: 'nextStartDatetime',
            title: '下期开始时间',
            hidden: !this.view,
            type: 'datetime'
        }, {
            field: 'status',
            title: '状态',
            hidden: !this.view,
            type: 'select',
            key: 'reward_term_status'
        }, {
            field: 'updateName',
            title: '更新人',
            hidden: !this.view
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            hidden: !this.view,
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 620006,
            addCode: 620001,
            editCode: 620002,
            beforeSubmit: (params) => {
                params.symbol = this.state.symbol;
                return params;
            }
        });
    }
}

export default SceneAddedit;
