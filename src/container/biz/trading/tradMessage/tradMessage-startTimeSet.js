import React from 'react';
import { Form, message, TimePicker, Button } from 'antd';
import DetailUtil from 'common/js/build-detail';
import creatHistory from 'history/createBrowserHistory';
import moment from 'moment';
import { setStartTimeAndEndTime } from '../../../../api/tradMessage';
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
    if(getQueryString('dailyStartTime', this.props.location.search) === 'undefined' || getQueryString('dailyEndTime', this.props.location.search) === 'undefined') {
      this.dailyStart = '00:00:00';
      this.dailyEnd = '00:00:00';
    }else {
      this.dailyStart = getQueryString('dailyStartTime', this.props.location.search);
      this.dailyEnd = getQueryString('dailyEndTime', this.props.location.search);
      this.dailyStartTime = getQueryString('dailyStartTime', this.props.location.search);
      this.dailyEndTime = getQueryString('dailyEndTime', this.props.location.search);
    }
  }
  startTime = (time, timeString) => {
    this.dailyStartTime = timeString;
  }
  endTime = (timeT, timeString) => {
    this.dailyEndTime = timeString;
  }
  toBack = () => {
    history.goBack();
  }
  setTime = () => {
    setStartTimeAndEndTime(this.id, this.dailyStartTime, this.dailyEndTime).then(data => {
      if(data.isSuccess) {
        message.success('保存成功');
        setTimeout(() => {
          history.goBack();
        }, 2000);
      }
    });
  }
  render() {
    // const fields = [{
    //   field: 'dailyStartTime',
    //   type: 'time',
    //   title: '开发时间'
    // }, {
    //   field: 'daileEndTime',
    //   type: 'time',
    //   title: '截止时间'
    // }];
    // return this.buildDetail({
    //   fields,
    //   id: this.id,
    //   editCode: '802904',
    //   beforeSubmit: (params) => {
    //     return params;
    //   }
    // });
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
            <span>每日开放时间：</span>
            <TimePicker defaultValue={moment(this.dailyStart, 'HH:mm:ss')} onChange={this.startTime} />
          </div>
          <div style={{marginTop: '20px'}}>
            <span>每日截止时间：</span>
            <TimePicker defaultValue={moment(this.dailyEnd, 'HH:mm:ss')} onChange={this.endTime} />
          </div>
          <div style={{marginTop: '40px'}}>
            <Button onClick={this.setTime} type="primary">提交</Button>
            <Button onClick={this.toBack} style={{marginLeft: '90px'}}>返回</Button>
          </div>
        </div>
    );
  }
}

export default TradMessageStartTimeSet;
