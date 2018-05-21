import React from 'react';
import fetch from 'common/js/fetch';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/staff/allStaff-addeditAdd';
import { getQueryString, showSucMsg, getUserKind, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode, buquanxinxi } from 'api/project';
import { getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.staffAllStaffAddEditAdd,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class AllStaffAddEditAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('staffCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    };
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        console.log(data.companyCode);
        this.setState({ companyCode: data.companyCode });
      });
    };
  }
  render() {
    const fields = [{
      field: 'name',
      title: '姓名',
      required: true,
      readonly: true,
      hidden: true
    }, {
      field: 'sex',
      title: '性别',
      required: true,
      readonly: true,
      hidden: true
    }, {
      field: 'mobile',
      title: '联系方式',
      search: true,
      required: true
    }, {
      field: 'contacts',
      title: '紧急联系人',
      required: true
    }, {
      field: 'contactsMobile',
      title: '紧急联系人联系方式',
      required: true
    }, {
      field: 'bankcardNumber',
      title: '银行卡号',
      search: true,
      required: true
    }, {
      field: 'bankCode',
      title: '开户行',
      listCode: '631116',
      keyName: 'bankCode',
      valueName: 'bankName',
      type: 'select',
      _keys: ['companyCard', 'subbranch'],
      search: true,
      required: true
    }, {
      field: 'subbranch',
      title: '开户支行',
      search: true,
      required: true
    }, {
      field: 'idAddress',
      title: '身份证地址',
      required: true,
      readonly: true,
      hidden: true
    }, {
      field: 'idNo',
      title: '证件号',
      required: true,
      listCode: '631416',
      readonly: true,
      hidden: true
    }, {
      field: 'idNation',
      title: '民族',
      readonly: true,
      hidden: true
    }, {
      field: 'pict1',
      title: '免冠照片',
      type: 'img',
      single: true
    }, {
      field: 'pict2',
      title: '手持身份张照片',
      type: 'img',
      single: true
    }, {
      field: 'pict3',
      title: '身份证正反面照片+签名',
      type: 'img',
      single: true
    }, {
      field: 'idPolice',
      title: '签发机关',
      readonly: true,
      hidden: true
    }, {
      field: 'isStartDate',
      title: '证件有效开始时间',
      hidden: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631417,
      buttons: [{
        title: '保存',
        check: true,
        handler: (param) => {
          console.log(param);
          getBankNameByCode(param.bankName).then(data => {
            param.bankCode = data[0].bankCode;
            param.bankName = data[0].bankName;
            param.updater = getUserId();
            this.props.doFetching();
            fetch(631413, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          });
        }
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default AllStaffAddEditAdd;
