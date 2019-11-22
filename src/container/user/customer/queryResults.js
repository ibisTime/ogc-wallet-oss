
import React from 'react';
import {Row, Col, Input, Button, message, Select, DatePicker, Table} from 'antd';
import {
    showWarnMsg
} from 'common/js/util';
import {teamQueryList, findUserList, groupUserInfo} from 'api/user';
import Fetch from 'common/js/fetch';
import './result.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

let timeout;
let currentValue;

function fetchUser(value, callback) {
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
                    value: r.mobile,
                    text: r.mobile,
                    userId: r.userId
                });
            });
            callback(datas);
        });
    }
    timeout = setTimeout(fake, 300);
}

const columns = [
    {
        title: '业务类型',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity'
    },
    {
        title: '金额',
        dataIndex: 'amountList',
        key: 'amountList',
        render(v) {
            return Array.isArray(v) && v.map((item, index) => (
                <span
                    key={`${item.symbol}_${item.amount}_${index}`}
                    style={{marginRight: '10px'}}
                >
                    {item.amount}({item.symbol})
                </span>
            ));
        }
    }
];

class queryResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            dataSource: [],
            value: '',
            dateStart: '',
            dateEnd: ''
        };
        this.levelRef = null;
    }
    handleSearch = value => {
        if (value) {
            fetchUser(value, data => this.setState({ datas: data }));
        } else {
            this.setState({ datas: [] });
        }
    };
    handleChange = value => {
        this.setState({ value });
    };
    handLevelRef = ele => {
        this.levelRef = ele;
    };
    onDateStartChange = (date, dateString) => {
        const dateStart = dateString;
        this.setState({
            dateStart
        });
    };
    onDateEndChange = (date, dateString) => {
        const dateEnd = dateString;
        this.setState({
            dateEnd
        });
    };
    submitQuery = () => {
        const {value, dateEnd, dateStart} = this.state;
        const level = this.levelRef.state.value;
        if(!value) {
            message.warning('请选择用户');
            return;
        }
        if(!level) {
            message.warning('请输入层数');
            return false;
        }
        const hasMsg = message.loading('');
        Fetch('805916', {
            userId: value,
            level,
            dataEnd: dateEnd,
            dateStart
        }).then(data => {
            hasMsg();
            this.setState({
                dataSource: data
            });
        }).catch(hasMsg);
    };
    resetQuery = () => {
        const clearIcon = document.querySelector('.ant-calendar-picker-clear');
        clearIcon.click();
        this.setState({
            value: ''
        });
        this.levelRef.state.value = '';
    };
    render() {
        const { datas, dataSource } = this.state;
        const options = datas.map(d => <Option key={d.userId}>{d.text}</Option>);
        return(
            <div>
                <Row>
                    <Col span={8}>
                        <strong>用户(必填)：</strong>
                        <Select
                            showSearch
                            value={this.state.value}
                            placeholder='请输入关键字搜索'
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
                    </Col>
                    <Col span={8}>
                        <strong>层数(必填)：</strong>
                        <Input style={{width: '220px'}} placeholder="请输入层数" ref={this.handLevelRef}/>
                    </Col>
                    <Col span={8}>
                        <strong>开始时间：</strong>
                        <DatePicker
                            style={{width: '220px'}}
                            onChange={this.onDateStartChange}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Col span={8}>
                        <strong>结束时间：</strong>
                        <DatePicker
                            style={{width: '220px'}}
                            onChange={this.onDateEndChange}
                        />
                    </Col>
                    <Col span={4}>
                        <Button onClick={this.submitQuery} type="primary">确认</Button>
                        <Button style={{marginLeft: '10px'}} onClick={this.resetQuery}>重置</Button>
                    </Col>
                </Row>
                <Row style={{display: dataSource.length > 0 ? 'block' : 'none'}}>
                    <Col span={24} style={{marginTop: '20px', overflow: 'hidden'}}>
                        <Table dataSource={dataSource} columns={columns}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default queryResults;
