import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/staff/allStaff';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getUserKind, getUserId, formatDate } from 'common/js/util';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.staffAllStaff,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class AllStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCode: null,
      searchParams: null
    };
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    };
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    };
  }
  render() {
    const fields = [{
      field: 'name',
      title: '姓名'
    }, {
      field: 'sex',
      title: '性别'
    }, {
      field: 'idNation',
      title: '民族'
    }, {
      field: 'birthdays',
      title: '生日',
      type: 'datetime',
      formatter: (v, d) => {
        return formatDate(d.birthday);
      }
    }, {
      field: 'idNo',
      title: '证件号'
    }, {
      field: 'keyword',
      title: '关键字查询',
      placeholder: '名字/证件号',
      hidden: true,
      search: true
    }];
    const btnEvent = {
      error: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/error?staffCode=${selectedRowKeys[0]}`);
        }
      },
      history: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/history?staffCode=${selectedRowKeys[0]}`);
        }
      },
      detailAdd: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/detailadd?staffCode=${selectedRowKeys[0]}`);
        }
      },
      addWorkers: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/entry?code=${selectedRowKeys[0]}`);
        }
      },
      weekday: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/weekday?code=${selectedRowKeys[0]}`);
        }
      },
      quit: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          console.log(selectedRows);
          this.props.history.push(`/staff/allStaff/quit?code=${selectedRowKeys[0]}`);
        }
      }
    };
    if (getUserKind() === 'O') {
      return this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          updater: '',
          kind: 'O'
        },
        pageCode: 631415
      });
    } else {
      return this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          updater: ''
        },
        pageCode: 631415
      });
    }
  }
}

export default AllStaff;
