import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/waitList/postRequest-addedit';
import fetch from 'common/js/fetch';
import { getQueryString, showWarnMsg, showSucMsg, formatDate, getUserName } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import XLSX from 'xlsx';
import { Button } from 'antd';
import { downLoad } from 'api/downLoad';

function makeCols(refstr) {
  var o = [];
  var range = XLSX.utils.decode_range(refstr);
  for (var i = 0; i <= range.e.c; ++i) {
    o.push({ name: XLSX.utils.encode_col(i), key: i });
  }
  return o;
}

@DetailWrapper(
  state => state.waitListPostReauestAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)

class PostRequestAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.fankui = getQueryString('status', this.props.location.search) === '2';
    this.handleExport = this.handleExport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: [],
      cols: []
    };
  };
  handleExport() {
    downLoad().then((data) => {
      let payroll1 = [
        ['项目信息'],
        ['项目编号', data[1].projectCode],
        ['扣款账户', data[1].bankCard.bankName],
        ['代付工资信息'],
        ['序号', '工资条编号', '真实姓名', '开户行', '卡号', '应发金额', '已发金额', '发放时间']
      ];
      let payroll2 = data.map((d, i) => {
        return [i + 1, d.code, d.bankCard.staffName, d.bankCard.bankName, d.bankCard.bankcardNumber, d.shouldAmount, '', ''];
      });
      payroll1 = payroll1.concat(payroll2);
      const ws = XLSX.utils.aoa_to_sheet(payroll1);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'sheetjs.xlsx');
    }, () => { });
  }
  handleChange(files) {
    // files = files.target.files;
    // if (!files || !files.length) {
    //   return;
    // }
    let file = files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      data.forEach((d, i) => {
        if (i > 4) {
          d[7] = formatDate(d[7]);
        }
      });
      this.setState({ data: data, cols: makeCols(ws['!ref']) });
      this.props.setPageData({
        ...this.props.pageData,
        payList: [{
          uid: file.uid,
          name: file.name,
          status: 'done'
        }]
      });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }
  render() {
    const fields = [{
      field: 'code',
      hidden: true
    }, {
      title: '请求时间',
      field: 'sendDatetime',
      readonly: true,
      type: 'datetime'
    }, {
      title: '标题',
      field: 'title',
      formatter: (v, d) => {
        return v + '工资';
      },
      readonly: true
    }, {
      title: '项目名称',
      field: 'projectName',
      readonly: true
    }, {
      title: '代发账户户名',
      field: 'bankName',
      readonly: true
    }, {
      title: '代发账户账号',
      field: 'bankcardNumber',
      readonly: true
    }, {
      title: '代发工资条下载',
      field: 'download1',
      type: 'download',
      handler: this.handleExport
    }, {
      title: '下载次数',
      field: 'download',
      readonly: true
    }, {
      title: 'title',
      field: 'title1',
      hidden: !this.fankui,
      _keys: ['title'],
      readonly: true,
      formatter: (v, d) => {
        return v + '工资反馈';
      }
    }, {
      title: '工资上传反馈',
      hidden: !this.fankui,
      field: 'payList',
      type: 'import',
      handler: (file, fileList) => {
        console.log(file, fileList);
        this.handleChange(fileList);
      }
    }];
    let buttons = [{
      title: '返回',
      handler: () => this.props.history.goBack()
    }];
    if (this.fankui) {
      buttons.unshift({
        type: 'primary',
        title: '提交反馈',
        check: true,
        handler: (param) => {
          console.log(this);
          if (!this.props.pageData['payList'] || !this.props.pageData['payList'].length) {
            showWarnMsg('请填写已发金额,发放时间！');
            return;
          }
          let payList = [];
          this.state.data.forEach((d, i) => {
            if (i > 4 && d.length) {
              payList.push({
                bankcardNumber: d[4],
                latePayDatetime: formatDate(d[7]),
                payAmount: d[6],
                code: d[1]
              });
            }
          });
          param.payList = payList;
          param.handler = getUserName();
          this.props.doFetching();
          fetch(631432, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        }
      });
    }
    return (
      <div>
        {this.props.buildDetail({
          fields,
          code: this.code,
          detailCode: 631437,
          buttons: buttons
        })}
      </div>
    );
  }
}

export default PostRequestAddedit;
