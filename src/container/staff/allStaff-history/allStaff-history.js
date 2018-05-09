import React from 'react';
import cookies from 'browser-cookies';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/staff/allStaff-history';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString } from 'common/js/util';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.staffAllStaffHistory,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class AllStaffHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    if(cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({'companyCode': data.companyCode, 'updater': ''});
      });
    }
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.staffCode = getQueryString('staffCode', this.props.location.search, 'updater': '');
    }
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'projectCode',
      title: '项目编号'
    }, {
      field: 'projectName',
      title: '项目名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: ''
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date'
    }, {
      field: 'leavingDatetime',
      title: '离职时间',
      type: 'date'
    }, {
      field: 'name',
      title: '姓名',
      formatter: (v, data) => {
        return data.staff ? data.staff.name : '';
      }
    }, {
      field: 'mobile',
      title: '手机号',
      formatter: (v, data) => {
        return data.staff ? data.staff.mobile : '';
      }
    }, {
      field: 'idType',
      title: '证件类型',
      formatter: (v, data) => {
        return data.staff ? data.staff.idType : '';
      },
      key: 'id_type'
    }, {
      field: 'idNo',
      title: '姓名',
      formatter: (v, data) => {
        return data.staff ? data.staff.idNo : '';
      }
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    const fieldso = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'projectCode',
      title: '项目编号'
    }, {
      field: 'projectName',
      title: '项目名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        companyCode: this.state.companyCode,
        kind: 'O'
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date'
    }, {
      field: 'leavingDatetime',
      title: '离职时间',
      type: 'date'
    }, {
      field: 'name',
      title: '姓名',
      formatter: (v, data) => {
        return data.staff ? data.staff.name : '';
      }
    }, {
      field: 'mobile',
      title: '手机号',
      formatter: (v, data) => {
        return data.staff ? data.staff.mobile : '';
      }
    }, {
      field: 'idType',
      title: '证件类型',
      formatter: (v, data) => {
        return data.staff ? data.staff.idType : '';
      },
      key: 'id_type'
    }, {
      field: 'idNo',
      title: '姓名',
      formatter: (v, data) => {
        return data.staff ? data.staff.idNo : '';
      }
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    if(cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fieldso,
        searchParams: {
          staffCode: this.staffCode,
          comapanyCode: this.state.companyCode
        },
        buttons: [],
        pageCode: 631465
      }) : null;
    }else {
      return this.props.buildList({
        fields,
        searchParams: { staffCode: this.staffCode },
        buttons: [],
        pageCode: 631465
      });
    }
  }
}

export default AllStaffHistory;
