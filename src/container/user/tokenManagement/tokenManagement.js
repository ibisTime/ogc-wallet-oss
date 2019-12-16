import React from 'react';
import {Modal, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/user/tokenManagement/tokenManagement';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, showSucMsg} from 'common/js/util';
import {activateUser, setQ, cancelNode} from 'api/user';

@listWrapper(
  state => ({
      ...state.userTokenManagement,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class TokenManagement extends React.Component {
    render() {
        const fields = [{
            field: 'level',
            title: '用户等级',
            search: true,
            type: 'select',
            listCode: '625815',
            keyName: 'level',
            valueName: 'L{{level.DATA}}-{{name.DATA}}',
            render(v, d) {
                return v && `L${v}-${d.name}`;
            }
        }, {
            field: 'nameList',
            title: 'DAPP门票'
        }, {
            field: 'weights',
            title: '超级节点权重',
            search: true
        }, {
            field: 'updater',
            title: '更新人'
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            type: 'datetime'
        }];
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      pageCode: '625813'
                  })
              }
          </div>
        );
    }
}

export default TokenManagement;
