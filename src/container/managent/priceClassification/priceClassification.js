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
} from '@redux/managent/priceClassification';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
  state => ({
      ...state.managentPriceClassification,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class PriceClassification extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630035',
            searchParams: {
                type: 'dopen_app_category'
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/priceClassification/priceClassification/addedit?code=${selectedRowKeys[0]}&ckey=${selectedRows[0].ckey}`);
                    }
                }
            }
        });
    }
}

export default PriceClassification;
