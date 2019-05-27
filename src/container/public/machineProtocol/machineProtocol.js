import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/public/machineProtocol';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
  state => ({
      ...state.publicMachineProtocol,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class MachineProtocol extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630045',
            searchParams: {
                type: 'machine_service_user_protocol'
            }
        });
    }
}

export default MachineProtocol;
