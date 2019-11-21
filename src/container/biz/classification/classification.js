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
} from '@redux/biz/classification/classification';
import {listWrapper} from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
      ...state.bizClassification,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Classification extends React.Component {
    render() {
        const fields = [{
            field: 'orderNo',
            title: '展示顺序'
        }, {
            field: 'name',
            title: '名称',
            search: true
        }, {
            field: 'status',
            title: '状态',
            data: [{
                key: '1',
                value: '显示'
            }, {
                key: '0',
                value: '不显示'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select',
            search: true
        }, {
            field: 'creatorName',
            title: '创建人'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '629003',
            deleteCode: '629001'
        });
    }
}

export default Classification;
