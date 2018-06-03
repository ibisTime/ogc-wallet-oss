import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-quit';
import { getQueryString, getUserKind, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getUserDetail } from 'api/user';
@DetailWrapper(
  state => state.newProjProjectQuit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectQuit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCodeList: ''
    };
    this.code = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(getUserId()).then((data) => {
      console.log(data);
      this.setState({ projectCodeList: data.projectCodeList });
    });
  };
  render() {
    const fields = [{
      title: '项目名称',
      field: 'projectCode',
      listCode: '631466',
      params: {
        staffCode: this.code,
        projectCodeList: this.state.projectCodeList,
        statusList: [0, 1]
      },
      keyName: 'projectCode',
      valueName: 'projectName',
      search: true,
      type: 'select',
      required: true

    }, {
      field: 'staffCode',
      value: this.code,
      hidden: true
    }, {
      title: '离职时间',
      field: 'leavingDatetime',
      required: true,
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.state.projectCodeList ? this.props.buildDetail({
      fields,
      addCode: 631462
    }) : null;
  }
}

export default ProjectQuit;
