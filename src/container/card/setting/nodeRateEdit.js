import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class nodeRateEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.tabType = getQueryString('tp');
        sessionStorage.setItem('tabType', this.tabType);
        this.state = {
            nodeRateArr: []
        };
    }
    componentDidMount() {
        // 分红比例配置修改
        fetch('630045', {type: 'node_rate', start: 1, limit: 20}).then(data => {
            // ckey: "1", cvalue: "0.5"
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push(data.list[i].cvalue);
            }
            this.setState({
                nodeRateArr: arr
            });
        });
    }

    render() {
        const {nodeRateArr} = this.state;
        const fields = [{
            field: 'rate1',
            title: '节点第一名比例',
            value: parseFloat(nodeRateArr[0]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate2',
            title: '节点第二名比例',
            value: parseFloat(nodeRateArr[1]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate3',
            title: '节点第三名比例',
            value: parseFloat(nodeRateArr[2]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate4',
            title: '节点第四名比例',
            value: parseFloat(nodeRateArr[3]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate5',
            title: '节点第五名比例',
            value: parseFloat(nodeRateArr[4]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate6',
            title: '节点第六名比例',
            value: parseFloat(nodeRateArr[5]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate7',
            title: '节点第七名比例',
            value: parseFloat(nodeRateArr[6]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate8',
            title: '节点第八名比例',
            value: parseFloat(nodeRateArr[7]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate9',
            title: '节点第九名比例',
            value: parseFloat(nodeRateArr[8]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }, {
            field: 'rate10',
            title: '节点第十名比例',
            value: parseFloat(nodeRateArr[9]),
            onChange: (v) => {
                return parseFloat(v);
            }
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            editCode: '610605',
            addCode: '610605'
        });
    }
}

export default nodeRateEdit;
