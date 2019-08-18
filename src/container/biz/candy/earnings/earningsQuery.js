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
} from '@redux/candy/earnings/earningsQuery';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import {Button} from 'antd';

@listWrapper(
  state => ({
      ...state.earningsQuery,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class EarningsQuery extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [{
            code: 'toDay',
            name: '今日记录',
            check: false,
            handler: () => {
                this.props.history.push(`/earnings/earningsQuery`);
            }
        }, {
            code: 'toHistory',
            name: '历史记录',
            check: false,
            handler: () => {
                this.props.history.push(`/historyEarnings/historyEarningsQuery`);
            }
        }, {
            code: 'toInfo',
            name: '详情',
            handler: (e) => {
                this.props.history.push(`/earnings/earningsQuery/addedit?v=1&code=${e[0]}`);
            }
        }, {
            code: 'export',
            name: '导出',
            check: false
        }];
    }
    // 近期流水查询
    ledgerQuery = (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/user/customer/ledgerQuery?code=${selectedRowKeys[0]}`);
        }
    }

    // 历史流水查询
    ledgerQueryHistory = (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/user/customer/ledgerQueryHistory?code=${selectedRowKeys[0]}`);
        }
    }
    state = {
        visible: false,
        code: '',
        xyCount: null,
        pageCodeTdOrHy: 610443,
        isTdOrHy: true
    };
    showToday = () => {
        this.setState({
            pageCodeTdOrHy: 610443,
            isTdOrHy: true
        }, () => {
            this.props.getPageData();
        });
    }
    showHistory = () => {
        this.setState({
            pageCodeTdOrHy: 610445,
            isTdOrHy: false
        }, () => {
            this.props.getPageData();
        });
    }
    render() {
        const fields = [{
            field: 'buyUserId',
            title: '购买人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return `${data.buyUserRealName}-${data.buyUserMobile}`;
            },
            required: true
        }, {
            field: 'userId',
            title: '收益人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return `${data.benefitUserRealName}-${data.benefitUserMobile}`;
            },
            required: true
        }, {
            field: 'type',
            title: '收益类型',
            type: 'select',
            key: 'candy_income_type ',
            search: true
        }, {
            field: 'income',
            title: '收益金额',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol) + data.symbol;
            }
        }, {
            field: 'status',
            title: '状态',
            render: () => '已结算'
        }, {
            field: 'incomeTime',
            title: '收益时间',
            type: 'datetime',
            search: true
        }];
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      rowKey: 'id',
                      pageCode: this.state.pageCodeTdOrHy,
                      buttons: this.buttons
                  })
              }
          </div>
        );
    }
}

export default EarningsQuery;
