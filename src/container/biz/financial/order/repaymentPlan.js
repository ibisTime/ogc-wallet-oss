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
} from '@redux/biz/financial/repaymentPlan';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getQueryString,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';
let symbol = getQueryString('symbol');
@listWrapper(
    state => ({
        ...state.bizRepaymentPlan,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RepaymentPlan extends React.Component {
    constructor(props) {
        super(props);
        this.productCode = getQueryString('productCode');
        this.status = getQueryString('status');
        this.type = getQueryString('type');
        this.buttons = [{
          name: '返回',
          code: 'back',
          handler: () => {
            this.props.history.go(-1);
          },
          check: true
        }];
        if(!this.type) {
          this.buttons = [{
            name: '还款',
            handler: (rowKey) => {
              if (!rowKey.length) {
                showWarnMsg('请选择记录');
              } else if (rowKey.length > 1) {
                showWarnMsg('请选择一条记录');
              } else {
                let param = {};
                param.code = rowKey[0];
                param.repayUser = getUserName();
                Modal.confirm({
                  okText: '确认',
                  cancelText: '取消',
                  content: `是否还款?`,
                  onOk: () => {
                    this.props.doFetching();
                    fetch(625504, param).then(() => {
                      showSucMsg('操作成功');
                      this.props.getPageData();
                    }).catch(() => {
                      this.props.cancelFetching();
                    });
                  }
                });
              }
            },
            check: true
          }, {
            name: '返回',
            code: 'back',
            handler: () => {
              this.props.history.go(-1);
            },
            check: true
          }];
        }
    }
    render() {
        const fields = [{
            title: '应还本金',
            field: 'principalTotal',
            render(v, data) {
                return v ? moneyFormat(v.toString(), '', symbol) : '-';
            }
        }, {
            title: '应还利息',
            field: 'interestTotal',
            render(v, data) {
                return v ? moneyFormat(v.toString(), '', symbol) : '-';
            }
        }, {
            title: '应还本息',
            field: 'amountTotal',
            render(v, data) {
                return v ? moneyFormat(v.toString(), '', symbol) : '-';
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'repay_plan_status',
            search: true
        }, {
            title: '已还本金',
            field: 'principalYet',
            render(v, data) {
                return v ? moneyFormat(v.toString(), '', symbol) : '-';
            }
        }, {
            title: '已还利息',
            field: 'interestYet',
            render(v, data) {
                return v ? moneyFormat(v.toString(), '', symbol) : '-';
            }
        }, {
            title: '已还本息',
            field: 'amountYet',
            render(v, data) {
                return v ? moneyFormat(v.toString(), '', symbol) : '-';
            }
        }, {
            title: '还款时间',
            field: 'repayDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625540',
            searchParams: {
                productCode: this.productCode,
                status: '1'
            },
            buttons: this.buttons
        });
    }
}

export default RepaymentPlan;