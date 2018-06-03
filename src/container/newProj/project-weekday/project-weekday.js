import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-weekday';
import { getQueryString, getUserKind, getUserId } from 'common/js/util';
import { getUserDetail } from 'api/user';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.newProjProjectWeekday,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectWeekday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(getUserId()).then((data) => {
      console.log(data);
      this.setState({ companyCode: data.companyCode });
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
      title: '开始时间',
      field: 'startDatetime',
      required: true,
      type: 'datetime'
    }, {
      title: '结束时间',
      field: 'endDatetime',
      required: true,
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      addCode: 631461
    });
  }
}

export default ProjectWeekday;
