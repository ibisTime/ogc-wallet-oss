import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/waitList/alreadyQuest-addedit';
import { getQueryString, showSucMsg, formatDate, showWarnMsg, moneyFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { Button, Card } from 'antd';
import { downLoad, detailDate, downNum } from 'api/downLoad';
import XLSX from 'xlsx';

@DetailWrapper(
  state => state.waitListAlreadyQuestAddedit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)

class AlreadyQuestAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.handleExport = this.handleExport.bind(this);
    this.handleExport1 = this.handleExport1.bind(this);
    this.state = {
      data: [],
      cols: [],
      bankcardNumber: '',
      handleDatetime: '',
      bankName: '',
      download: '',
      projectName: '',
      sendDatetime: '',
      backDownload: '',
      title: ''
    };
  };
  componentDidMount() {
    detailDate(this.code).then((data) => {
      console.log(data);
      this.setState({
        bankcardNumber: data.bankcardNumber,
        handleDatetime: data.handleDatetime,
        bankName: data.bankName,
        projectName: data.projectName,
        sendDatetime: data.sendDatetime,
        download: data.download,
        backDownload: data.backDownload,
        title: data.title
      });
    });
  }
  downNum(flag) {
    let { backDownload, download } = this.state;
    if (flag) {
      backDownload += 1;
    } else {
      download += 1;
    }
    downNum(this.code, backDownload, download).then((data) => {
      this.setState({
        download: data.download,
        backDownload: data.backDownload
      });
    });
  }

  goBack() {
    this.props.history.go(-1);
  }
  handleExport1() {
    this.downNum(true);
    downLoad(this.code).then((data) => {
      let payroll1 = [
        ['项目信息'],
        ['项目编号', data[0].projectCode],
        ['扣款账户', data[0].companyCard.bankName],
        ['代付工资信息'],
        ['序号', '工资条编号', '真实姓名', '开户行', '卡号', '应发金额', '已发金额', '发放时间']
      ];
      let payroll2 = data.map((d, i) => {
        return [i + 1, d.code, d.companyCard.staffName, d.companyCard.bankName, d.companyCard.bankcardNumber, moneyFormat(d.factAmount), moneyFormat(d.payAmount), formatDate(d.latePayDatetime)];
      });
      payroll1 = payroll1.concat(payroll2);
      const ws = XLSX.utils.aoa_to_sheet(payroll1);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'sheetjs.xlsx');
    }, () => { });
  }
  handleExport() {
    this.downNum();
    downLoad(this.code).then((data) => {
      console.log(data[0]);
      let payroll1 = [
        ['项目信息'],
        ['项目编号', data[0].projectCode],
        ['扣款账户', data[0].companyCard.bankName],
        ['代付工资信息'],
        ['序号', '工资条编号', '真实姓名', '开户行', '卡号', '应发金额', '已发金额', '发放时间']
      ];
      let payroll2 = data.map((d, i) => {
        return [i + 1, d.code, d.companyCard.staffName, d.companyCard.bankName, d.companyCard.bankcardNumber, moneyFormat(d.factAmount), '', ''];
      });
      payroll1 = payroll1.concat(payroll2);
      const ws = XLSX.utils.aoa_to_sheet(payroll1);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'sheetjs.xlsx');
    }, () => { });
  }
  render() {
    return (
      <div>
        <Card title={this.state.title + '工资'} style={{ width: 500 }}>
          <p>请求时间：{formatDate(this.state.sendDatetime)}</p>
          <p>代发账户户名：{this.state.bankName}</p>
          <p>代发账户账号：{this.state.bankcardNumber}</p>
          <Button onClick={this.handleExport}>点击下载</Button>
          <p>下载次数{this.state.download}</p>
        </Card>
        <Card title={this.state.title + '工资反馈'} style={{ width: 500, marginTop: 20 }}>
          <p>反馈时间：{formatDate(this.state.handleDatetime)}</p>
          <Button onClick={this.handleExport1}>点击下载</Button>
          <p>下载次数{this.state.backDownload}</p>
        </Card>
        <Button onClick={this.goBack.bind(this)} style={{ marginTop: 20 }}>返回</Button>
      </div>
    );
  }
}

export default AlreadyQuestAddedit;
