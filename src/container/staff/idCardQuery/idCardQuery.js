import React from 'react';
import { Timeline, Button, Card, Input, Divider, List, Avatar, Table } from 'antd';
import fetch from 'common/js/fetch';
import { getQueryString, showSucMsg, showWarnMsg, formatDate, getUserKind, getUserId, formatImg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserDetail, query, query1 } from 'api/user';

class AllStaffAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCodeList: '',
      data: ''
    };
  }
  componentDidMount() {
    if (getUserKind() === 'S' || getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    };
  }
  clickQuery() {
    if (getUserKind() === 'S' || getUserKind() === 'O') {
      if (this.state.projectCodeList) {
        let idCard = document.getElementById('idCard').value;
        console.log(idCard);
        if (!idCard) {
          showWarnMsg('请输入身份证号码！');
          return;
        }
        query(idCard, this.state.projectCodeList).then(data => {
          console.log(data);
          this.setState({ data: data });
        });
      }
    }
    if (getUserKind() === 'P') {
      let idCard = document.getElementById('idCard').value;
      if (!idCard) {
        showWarnMsg('请输入身份证号码！');
        return;
      }
      query1(idCard).then(data => {
        console.log(data);
        this.setState({ data: data });
      });
    }
  };
  render() {
    if (this.state.data) {
      var dataD = [
        '姓名: ' + this.state.data.name,
        '性别: ' + this.state.data.sex,
        '民族: ' + this.state.data.idNation,
        '籍贯: ' + this.state.data.idAddress,
        '生日: ' + formatDate(this.state.data.birthday),
        '签发机关: ' + this.state.data.idPolice,
        '联系方式: ' + this.state.data.mobile,
        '证件有效时间: ' + formatDate(this.state.data.idStartDate) + '——' + formatDate(this.state.data.idEndDate)
      ];
      var dataP = [
        formatImg(this.state.data.pic1),
        formatImg(this.state.data.pic2),
        formatImg(this.state.data.pic3),
        formatImg(this.state.data.idPic)
      ];
      var columns = [{
        title: '员工姓名',
        dataIndex: 'staffName'
      }, {
        title: '所属月份',
        dataIndex: 'month'
      }, {
        title: '应发工资',
        dataIndex: 'shouldAmount'
      }, {
        title: '迟到天数',
        dataIndex: 'delayDays'
      }, {
        title: '早退天数',
        dataIndex: 'earlyDays'
      }, {
        title: '请假天数',
        dataIndex: 'leavingDays'
      }, {
        title: '税费',
        dataIndex: 'tax'
      }, {
        title: '扣款金额',
        dataIndex: 'cutAmount'
      }, {
        title: '扣款说明',
        dataIndex: 'cutNote'
      }, {
        title: '实际工资',
        dataIndex: 'factAmount'
      }, {
        title: '发放金额',
        dataIndex: 'payAmount'
      }, {
        title: '最后一次发放时间',
        dataIndex: 'payDatetime'
      }, {
        title: '状态',
        dataIndex: 'status'
      }, {
        title: '备注',
        dataIndex: 'remark'
      }];
      var dataTab = [];
      for (let l = 0; l < this.state.data.salaryList.length; l++) {
        dataTab[l] = {
          key: l,
          staffName: this.state.data.salaryList[l].staffName,
          month: this.state.data.salaryList[l].month,
          shouldAmount: this.state.data.salaryList[l].shouldAmount / 1000,
          delayDays: this.state.data.salaryList[l].delayDays,
          earlyDays: this.state.data.salaryList[l].earlyDays,
          leavingDays: this.state.data.salaryList[l].leavingDays,
          tax: this.state.data.salaryList[l].tax,
          cutAmount: this.state.data.salaryList[l].cutAmount / 1000,
          cutNote: this.state.data.salaryList[l].cutNote,
          factAmount: this.state.data.salaryList[l].factAmount / 1000,
          payAmount: this.state.data.salaryList[l].payAmount / 1000,
          payDatetime: this.state.data.salaryList[l].payDatetime,
          status: this.state.data.salaryList[l].status,
          remark: this.state.data.salaryList[l].remark
        };
      };
      var columnsDown = [{
        title: '项目名称',
        dataIndex: 'projectName'
      }, {
        title: '员工姓名',
        dataIndex: 'staffName'
      }, {
        title: '入职时间',
        dataIndex: 'joinDatetime'
      }, {
        title: '离职时间',
        dataIndex: 'leavingDays'
      }, {
        title: '职位',
        dataIndex: 'position'
      }, {
        title: '累积请假天数',
        dataIndex: 'totalLeavingDays'
      }, {
        title: '迟到/每小时扣款金额',
        dataIndex: 'cutAmount'
      }, {
        title: '状态',
        dataIndex: 'status'
      }, {
        title: '更新时间',
        dataIndex: 'updateDatetime'
      }];
      var dataDownTab = [];
      var employList = this.state.data.employList;
      for (let l = 0; l < employList.length; l++) {
        dataDownTab[l] = {
          key: l,
          projectName: (employList[l] && employList[l].projectName) || '',
          staffName: this.state.data.name,
          joinDatetime: (employList[l] && employList[l].joinDatetime) || '',
          leavingDays: (employList[l] && employList[l].leavingDays) || '',
          position: (employList[l] && employList[l].position) || '',
          totalLeavingDays: (employList[l] && employList[l].totalLeavingDays) || '',
          cutAmount: (employList[l] && employList[l].cutAmount / 1000) || '',
          status: (employList[l] && employList[l].status) || '',
          updateDatetime: (employList[l] && employList[l].updateDatetime) || ''
        };
      };
    }
    return (
      <div>
        <div>
          <Input id='idCard' placeholder="身份证号码" style={{ width: 300, marginRight: 20 }} />
          <Button onClick={this.clickQuery.bind(this)} type="primary" ghost style={{ marginRight: 10 }}>查询</Button>
        </div>
        <Divider orientation="left">人员信息</Divider>
        <div style={{ marginBottom: 50 }}>
          <List
            bordered
            style={{ width: 400 }}
            dataSource={dataD}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
          <List
            bordered
            style={{ width: 400, marginDown: 20 }}
            dataSource={dataP}
            renderItem={item => (<Avatar src={item} style={{ width: 100, height: 100, margin: 20, borderColor: 'block' }} />)}
          />
        </div>
        <Divider orientation="left">工资条信息</Divider>
        <div style={{ marginBottom: 50 }}>
          <Table columns={columns} dataSource={dataTab} bordered />
        </div>
        <Divider orientation="left">目前所在项目信息信息</Divider>
        <div>
          <Table columns={columnsDown} dataSource={dataDownTab} bordered />
        </div>
      </div>
    );
  }
}

export default AllStaffAddEdit;
